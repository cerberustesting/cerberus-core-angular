import { Component, OnInit, Input, TemplateRef, ContentChild, ViewChild, Output, EventEmitter as EventEmitterAngularCore } from '@angular/core';
import { Column } from '../model/front/column.model';
import { FilterService } from 'src/app/core/services/api/filter.service';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { DatatableFilterTmpDirective, DatatableMassActionTmpDirective, DatatableEndLineActionDirective } from './directives/datatable.directive';
import { Observable } from 'rxjs';
import { FiltersComponent } from './filters/filters.component';
import { UserService } from 'src/app/core/services/api/user.service';
import { User } from '../model/back/user/user.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-datatable-page',
  templateUrl: './datatable-page.component.html',
  styleUrls: ['./datatable-page.component.scss']
})
export class DatatablePageComponent implements OnInit {
  @Input() pageSort: any;
  @Input() columns: Array<Column>;
  @Input() userSystems: Array<string>;
  @Input() massAction: boolean;
  @Input() servlet: string;
  @Input() selection: boolean;
  @Input() selectedRows: Array<any>;
  @Input() refreshResults: Observable<void>;
  @Input() preferencesTableName: string;
  @Output() hasPermissions = new EventEmitterAngularCore<boolean>();

  @ContentChild(DatatableFilterTmpDirective, { read: TemplateRef, static: true }) filterTemplate: TemplateRef<any>;
  @ContentChild(DatatableMassActionTmpDirective, { read: TemplateRef, static: true }) massActionTemplate: TemplateRef<any>;
  @ContentChild(DatatableEndLineActionDirective, { read: TemplateRef, static: true }) endLineActionTemplate: TemplateRef<any>;

  // reference to the child filters component
  @ViewChild(FiltersComponent, { static: false }) private filtersComponent: FiltersComponent;

  private cache: any = {}; // number of displayed rows
  rows: Array<any> = []; // rows to display
  private globalSearch: string; // value in global search field
  page: { // the default page informations
    number: number, // page number
    size: number, // number of rows on screen
    sort: any, // sort informations (column and direction)
    totalCount: number // total of element in the database
  };

  /** user object */
  public user: User;

  /** user preferences for table columns, filters and search */
  public userHasPreferencesSetted: boolean;

  /** default Columns preferences */
  public defaultColumns: Array<Column>;

  constructor(
    private filterService: FilterService,
    private invariantsService: InvariantsService,
    private testCaseService: TestcaseService,
    private userService: UserService) {
    this.user = null;
  }

  ngOnInit() {

    this.page = {
      number: 1,
      size: 0,
      sort: this.pageSort,
      totalCount: 0
    };

    // copy columns as default, to access on reset preferences
    this.defaultColumns = JSON.parse(JSON.stringify(this.columns));

    this.userService.observableUser.subscribe(rep => {
      this.cache = {};
      this.user = rep;
      this.rows = [];
      this.page.number = 0;
      this.search();

      if(!this.user || !this.preferencesTableName){
        return;
      }
      
      this.loadUserPreferences();

    });

    if (this.refreshResults) {
      this.refreshResults.subscribe(() => this.applyFilters());
    }

    // subscribe to the refresh datatable content event
    this.filterService.refreshContentEvent.subscribe(rep => {
      // refresh the table content when the event is fired (from any component)
      this.applyFilters();
    });
  }
  
  loadUserPreferences() {

    this.userHasPreferencesSetted = false;

    let userPreferences = this.user.userPreferences[this.preferencesTableName];    
    if(!userPreferences){      
      return;
    }

    // keep columns api field name and defaults
    for (let index = 0; index < userPreferences.columns.length; index++) {

      const element = userPreferences.columns[index];
      const defaultColumnIndex = this.defaultColumns.findIndex(object => {
        return object.contentName === element.contentName;
      });

      if(defaultColumnIndex == -1){
        continue;
      } 

      // need a reorder
      if(element.contentName != this.columns[index].contentName){
        this.columns[index] = this.defaultColumns[defaultColumnIndex];
        this.userHasPreferencesSetted = true;
      }

      this.hasPreferencesOnColumn(element, this.columns[index]);

      this.columns[index].contentName = element.contentName;
      this.columns[index].sSearch = element.sSearch;
      this.columns[index].active = element.active;
      this.columns[index].filterDisplayed = element.filterDisplayed;
    }

    this.hasPreferencesOnSortOrSearch(userPreferences);

    this.page.sort = userPreferences.order;    
    this.search(userPreferences.search);
  }

  /**
   * verify if user has set up preferences for column search, visibility or filter display
   * @param userColumn column from user preferences json
   * @param column current column from this.columns array
   */
  private hasPreferencesOnColumn(userColumn: Column, column: Column) {
    if (userColumn.sSearch && userColumn.sSearch.length > 0) {
      this.userHasPreferencesSetted = true;
      return;
    }
    if ((column.active != userColumn.active) || (column.filterDisplayed != userColumn.filterDisplayed)) {
      this.userHasPreferencesSetted = true;
    }
  }

  /**
   * verify if user has set up preferences for column order or for global search
   * @param userPreferences user preferences json
   */
  private hasPreferencesOnSortOrSearch(userPreferences: any) {

    if(userPreferences.search != ""){
      this.userHasPreferencesSetted = true;
      return;
    }

    let order = userPreferences.order;
    if(!order){
      return;
    }
    
    if(order[0] && (order[0].prop != this.pageSort[0].prop || order[0].dir != this.pageSort[0].dir)){
      this.userHasPreferencesSetted = true;
    }
  }

  /**
   * update user preferences when he changes something on datatable
   * @param type order, column or other type of change
   * @param value value of the change
   */
  updateUserPreferences(type?: string, value?: any) {
        
    if(this.user.userPreferences == ""){
      this.user.userPreferences = {};
    }

    if(!this.user.userPreferences[this.preferencesTableName]){      
      this.user.userPreferences[this.preferencesTableName] = {
        order: [{ dir: 'asc', prop: '' }],
        search: "",
        columns: []
      };
    }
    
    let userPreferences = this.user.userPreferences[this.preferencesTableName];
    userPreferences.search = this.globalSearch;
    userPreferences.order = this.page.sort;
    userPreferences.columns = [];

    if(type && type == "order" && value){

      let activeColumns = this.columns.filter(a => a.active);

      if(activeColumns.length > 0){

        const newColumnIndex = this.defaultColumns.findIndex(object => {
          return object.contentName === activeColumns[value.newValue].contentName;
        });
        const prevColumnIndex = this.defaultColumns.findIndex(object => {
          return object.contentName === activeColumns[value.prevValue].contentName;
        });

        this.columns[newColumnIndex] = activeColumns[value.prevValue];
        this.columns[prevColumnIndex] = activeColumns[value.newValue];
      }      
    }

    // only store the needed columns
    for (let index = 0; index < this.columns.length; index++) {
      const element = this.columns[index];      
      userPreferences.columns.push({
        "contentName": element.contentName,
        "sSearch": element.sSearch,
        "active": element.active,
        "filterDisplayed": element.filterDisplayed
      })
    }

    this.userService.updateUserPreferences();
    this.userHasPreferencesSetted = true;

  }

  /** return the first row of the displayed result in the datatable */
  getFirstRow(): any {
    return this.rows[0];
  }

  /** open the filters modal (in the child component) */ 
  openFiltersModal() {
    this.filtersComponent.openFiltersModal();
  }

  /**
   * search
   * * get rows corresponding to filters and page infomations
   * @param globalSearch content of the gloabl search field (default: '')
   */
  search(globalSearch?: string): void {
    // override the quick search value if one is passed
    this.globalSearch = (globalSearch) ? globalSearch : '';
    if (this.servlet && !this.cache[this.page.number] && this.page.size > 0) {
      this.cache[this.page.number] = true;
      this.filterService.getContentForTable(this.servlet, this.filterService.generateQueryStringParameters(this.columns, this.page, this.globalSearch, this.userSystems),
        (list: Array<any>, length: number, hasPermissions: boolean) => {
          this.page.totalCount = length;
          const start = this.page.number * this.page.size;
          const rows = [...this.rows];
          rows.splice(start, 0, ...list);
          // update the table content
          // this command is triggering the table update
          this.rows = rows;
          console.log('datatable updated');
          // this.rows = [...this.rows];     
          this.hasPermissions.emit(hasPermissions);
        });
    }
  }

  /**
   * pageUpdate
   * * to call when a new page is selected or scrolled
   * @param newPage new page number
   */
  pageUpdate(newPage: number): void { // When selecting a new page
    this.page.number = newPage;
    this.search(this.globalSearch);
  }

  /**
   * applyFilters
   * * update rows with new filters
   * * reset rows, cache, page number and scroll
   * @param globalSearch content of global search field
   */
  applyFilters(sort?: any): void {
    const a = document.getElementsByClassName('datatable-body')[0];
    a.scroll(0, 0);
    a.scrollBy(0, 0); // scroll to the table top
    this.cache = {};
    this.rows = [];
    this.page.number = 0;
    this.search(this.globalSearch);
    this.updateUserPreferences(); // this is being called right on loading too
  }

  /**
   * reorder event
   * @param globalSearch content of global search field
   */
  onReorder(order?: any): void {
    this.updateUserPreferences("order", order);
  }

  /**
   * update the value of the quick search term (nullable)
   * @param term value to update to
   */
  updateGlobalSearch(term: string): void {
    this.globalSearch = term;
    this.applyFilters();
  }

  /**
   * reset all configurations based on user preferences
   */
  resetPreferences(): void {
    this.columns = JSON.parse(JSON.stringify(this.defaultColumns));
    this.page.sort = this.pageSort;
    this.updateGlobalSearch("");    
    this.userHasPreferencesSetted = false;
  }

  /**
   * reset all configurations based on user preferences
   */
   onColumnChange(): void {
    this.updateUserPreferences();
  }

}
