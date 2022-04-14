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

    let userPreferences = this.user.userPreferences[this.preferencesTableName];
    if(!userPreferences){      
      return
    }
    
    for (let index = 0; index < userPreferences.columns.length; index++) {
      const element = userPreferences.columns[index+1];
      if(this.columns[index] && element){

        if(this.columns[index].active != element.visible || element.search.search != ""){
          this.userHasPreferencesSetted = true;
        }

        this.columns[index].active = element.visible;
        this.columns[index].sSearch = [element.search.search];
        this.columns[index].filterDisplayed = (element.search.search !="");        
      }
    }
    //console.log(userPreferences.ColReorder)
    //console.log(this.columns)
    userPreferences.ColReorder.shift();// the first is the actions
    for (let index = 0; index < userPreferences.ColReorder.length; index++) {
      const element = userPreferences.ColReorder[index]-1;
      //console.log(index)
      //console.log(element)
      if(index != element){
        this.columns = this.switchOrder(index, element, this.columns);
      }      
    }
    
    if(userPreferences.search && userPreferences.search.search && userPreferences.search.search != "" ){
      this.globalSearch = userPreferences.search.search;
      this.userHasPreferencesSetted = true;
    }
    if(userPreferences.order && userPreferences.order.length > 0 && this.pageSort.length > 0 && this.pageSort[0].prop != userPreferences.order[0][0]){
      this.page.sort = [{ dir: userPreferences.order[0][1], prop: this.columns[(userPreferences.order[0][0]-1)].contentName }];
      this.userHasPreferencesSetted = true;
    }
  }

  updateUserPreferences(parameter: string, values: any) {

    let userPreferences = this.user.userPreferences[this.preferencesTableName];
    if(!userPreferences || !parameter){      
      return
    }
    
    switch (parameter) {
      case "columns":
        for (let index = 0; index < userPreferences.columns.length; index++) {
          const element = userPreferences.columns[index+1];
          if(this.columns[index] && element){
            element.visible = this.columns[index].active;
            element.search.search = this.columns[index].sSearch.toString(); 
          }
        }
        break;
      case "sort":
        // this.page.sort = [{ dir: userPreferences.order[0][1], prop: this.columns[(userPreferences.order[0][0]-1)].contentName }];
        let colIndex = this.columns.findIndex(object => {
          return object.contentName === this.page.sort[0]["prop"];
        });
        userPreferences["order"] = [[colIndex+1,this.page.sort[0]["dir"]]];

        break;
      case "order":
        console.log(userPreferences["ColReorder"])
        console.log(values.prevValue)
        console.log(values.newValue)
        userPreferences["ColReorder"][values.prevValue+1] = values.newValue+1; // +1 because of actions
        userPreferences["ColReorder"][values.newValue+1] = values.prevValue+1; // +1 because of actions
        
        if(userPreferences["ColReorder"].length == this.columns){
          userPreferences["ColReorder"].unshift(0);
        }
        console.log(userPreferences["ColReorder"])

        userPreferences["order"] = [[this.page.sort[0]["prop"]+1,this.page.sort[0]["dir"]]];
        break;
      case "search":
        userPreferences["search"]["search"] = this.globalSearch;
        break;    
      default:
        break;
    }
    
    console.log(userPreferences);
    console.log(this.user.userPreferences);
    this.userService.updateUserPreferences();

  }

  switchOrder(from: number, to: number, arr: any) {
    const newArr = [...arr];

    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);

    return newArr;
  }

  /** return the first row of the displayed result in the datatable */
  getFirstRow(): any {
    return this.rows[0];
  }

  // open the filters modal (in the child component)
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
    console.log(sort);
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
    this.columns = this.defaultColumns;    
    this.userHasPreferencesSetted = false;
    this.page.sort = this.pageSort;
  }

}
