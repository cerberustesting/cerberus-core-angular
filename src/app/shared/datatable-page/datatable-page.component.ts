import { Component, OnInit, Input, TemplateRef, ContentChild, ViewChild } from '@angular/core';
import { Column } from '../model/front/column.model';
import { FilterService } from 'src/app/core/services/api/filter.service';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { DatatableFilterTmpDirective, DatatableMassActionTmpDirective, DatatableEndLineActionDirective } from './directives/datatable.directive';
import { Observable } from 'rxjs';
import { FiltersComponent } from './filters/filters.component';
import { UserService } from 'src/app/core/services/api/user.service';
import { User } from '../model/back/user/user.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';

@Component({
  selector: 'app-datatable-page',
  templateUrl: './datatable-page.component.html',
  styleUrls: ['./datatable-page.component.scss']
})
export class DatatablePageComponent implements OnInit {
  @Input() pageSort: any;
  @Input() columns: Array<Column>;
  @Input() massAction: boolean;
  @Input() servlet: string;
  @Input() selection: boolean;
  @Input() selectedRows: Array<any>;
  @Input() refreshResults: Observable<void>;

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

    this.userService.observableUser.subscribe(rep => {
      this.cache = {};
      this.user = rep;
      this.rows = [];
      this.page.number = 0;
      this.search();
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
    this.globalSearch = (globalSearch) ? globalSearch : '';
    if (this.servlet && !this.cache[this.page.number] && this.page.size > 0) {
      this.cache[this.page.number] = true;
      this.filterService.getContentForTable(this.servlet, this.filterService.generateQueryStringParameters(this.columns, this.page, this.globalSearch),
        (list: Array<any>, length: number) => {
          this.page.totalCount = length;
          const start = this.page.number * this.page.size;
          const rows = [...this.rows];
          rows.splice(start, 0, ...list);
          // update the table content
          // this command is triggering the table update
          this.rows = rows;
          // this.rows = [...this.rows];
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
    this.search();
  }

  /**
   * applyFilters
   * * update rows with new filters
   * * reset rows, cache, page number and scroll
   * @param globalSearch content of global search field
   */
  applyFilters(globalSearch?: string): void {
    const a = document.getElementsByClassName('datatable-body')[0];
    a.scroll(0, 0);
    a.scrollBy(0, 0); // scroll to the table top
    this.cache = {};
    this.rows = [];
    this.page.number = 0;
    this.search(globalSearch);
  }

}
