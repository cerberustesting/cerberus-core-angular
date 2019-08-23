import { AfterContentInit, Component, OnInit, Input, Output, TemplateRef, ContentChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Column } from '../model/column.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { DatatableFilterTmpDirective, DatatableMassActionTmpDirective, DatatableEndLineAction } from './directives/datatable.directive';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';

@Component({
  selector: 'app-datatable-page',
  templateUrl: './datatable-page.component.html',
  styleUrls: ['./datatable-page.component.scss'],
})
export class DatatablePageComponent implements OnInit {

  @Input() page: {
    number: number,
    size: number,
    sort: any,
    totalCount: number
  };
  @Input() columns: Array<Column>;
  @Input() massAction: boolean;
  @Input() servlet: string;
  @Input() selection: boolean;
  @Input() selectedRows: Array<any>;
  @Input() refreshResults: Observable<void>;
  

  @ContentChild(DatatableFilterTmpDirective, { read: TemplateRef, static: true }) filterTemplate: TemplateRef<any>;
  @ContentChild(DatatableMassActionTmpDirective, { read: TemplateRef, static: true }) massActionTemplate: TemplateRef<any>;
  @ContentChild(DatatableEndLineAction, { read: TemplateRef, static: true }) endLineActionTemplate: TemplateRef<any>;
  

  cache: any = {}; //number of displayed rows

  rows: Array<any> = [];
  globalSearch: string


  constructor(
    private testService: TestService, 
    private filterService: FilterService, 
    private invariantsService: InvariantsService,
    private NotificationService: NotificationService) { }

  ngOnInit() {
    this.invariantsService.observableSystemsSelected.subscribe(rep => {
      console.log('systemList change')
      this.cache = {};
      this.rows = [];
      this.page.number = 0;
      this.search();
    });
    if(this.refreshResults) this.refreshResults.subscribe(() => this.applyFilters())
    
  }
  

  /**
   * search
   * * get rows corresponding to filters and page infomations
   * @param globalSearch content of the gloabl search field (default: '')
   */
  search(globalSearch?: string): void {
    this.globalSearch = (globalSearch) ? globalSearch : '';
    
    if (this.servlet && !this.cache[this.page.number] && this.page.size>0) {
      // console.log("Search : \n page number : " + this.page.number + '\n page size : ' + this.page.size);
      // console.log("cache :", this.cache);
    this.cache[this.page.number] = true;
      this.testService.getFromRequest(this.servlet, this.filterService.generateQueryStringParameters(this.columns, this.page, this.globalSearch), 
        (list: Array<any>, length: number) => {
          this.page.totalCount = length;

          const start = this.page.number * this.page.size;
          const rows = [...this.rows];

          rows.splice(start, 0, ...list);

          this.rows = rows;

          
        });
    }
  }

  /**
   * pageUpdate
   * * to call when a new page is selected or scrolled
   * @param newPage new page number
   */
  pageUpdate(newPage: number): void { //When selecting a new page    
    this.page.number = newPage;
    this.search();
  }

  /**
   * applyFilters
   * * update rows with new filters
   * * reset cache, rows, page number and scroll
   * @param globalSearch content of global search field
   */
  applyFilters(globalSearch?: string): void {
    let a = document.getElementsByClassName("datatable-body")[0];
    a.scroll(0,0);
    a.scrollBy(0,0); // scroll to the table top
    this.cache = {};
    this.rows =  [];
    this.page.number = 0;
    this.search(globalSearch);
  }


}
