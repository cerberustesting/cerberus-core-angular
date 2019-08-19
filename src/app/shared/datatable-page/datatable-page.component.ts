import { Component, OnInit, Input, Output } from '@angular/core';
import { Column } from '../model/column.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';


@Component({
  selector: 'app-datatable-page',
  templateUrl: './datatable-page.component.html',
  styleUrls: ['./datatable-page.component.scss']
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
  @Input() name?: string = 'none';
  cache: number = -1; //number of displayed rows

  rows: Array<any>;
  globalSearch: string


  constructor(
    private testService: TestService, 
    private filterService: FilterService, 
    private invariantsService: InvariantsService) { }

  ngOnInit() {
    this.invariantsService.observableSystemsSelected.subscribe(rep => {
      this.cache = -1;
      this.rows = null;
      this.page.number = 0;
      this.search();
    })
  }

  /**
   * search
   * * get rows corresponding to filters and page infomations
   * @param globalSearch content of the gloabl search field (default: '')
   */
  search(globalSearch?: string): void {
    // if a servlet as been specified
    if (this.servlet) {
      this.globalSearch = (globalSearch) ? globalSearch : '';
      const currentPageNumber = this.page.number;
      const delta = currentPageNumber - this.cache;
      const countWanted = delta * this.page.size;

      if (countWanted>0) {
        
        this.page.number = this.cache+1;
        this.testService.getFromRequest(this.servlet, this.filterService.generateQueryStringParameters(this.columns, this.page, this.globalSearch, countWanted), (list: Array<any>, length: number) => {
          if (this.rows || this.rows == []) {
            const rows = [...this.rows];
            rows.splice(this.page.number * this.page.size, 0, ...list)
            this.rows = rows;
          } else {
            this.rows = list;
          }
  
          this.page.totalCount = length;
        });
        this.cache = currentPageNumber;
        this.page.number = currentPageNumber;      
      }
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
    this.cache = -1;
    this.rows = null;
    this.page.number = 0;
    this.search(globalSearch);
  }


}
