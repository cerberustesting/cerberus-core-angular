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
  cache: number = -1;

  rows: Array<any>;
  globalSearch: string


  constructor(private testService: TestService, private filterService: FilterService, private invariantsService: InvariantsService) { }

  ngOnInit() {
    // this.search();    
    this.invariantsService.observableSystemsSelected.subscribe(rep => {
      this.cache = -1;
      this.rows = [];
      this.page.number = 0;
      this.search();
    })
  }

  search(globalSearch?: string) {




    if (this.servlet) {
      this.globalSearch = (globalSearch) ? globalSearch : '';
      const a = this.page.number;
      const delta = a - this.cache;
      const countWanted = delta * this.page.size;
      

      // for (let i = this.cache; i < a; ++i) {
      if (countWanted>0) {
        
        this.page.number = this.cache+1;
        console.log('page ', this.page);
        this.testService.getFromRequest(this.servlet, this.filterService.generateQueryStringParameters(this.columns, this.page, this.globalSearch, countWanted), (list: Array<any>, length: number) => {
          if (this.rows) {
            const rows = [...this.rows];
            rows.splice(this.page.number * this.page.size, 0, ...list)
            this.rows = rows;
          } else {
            this.rows = list;
          }
  
          this.page.totalCount = length;
        });
        this.cache = a;
        this.page.number = a;      
      }
      
      
      
    }
  }

  pageUpdate(newPage) { //When selecting a new page    
    this.page.number = newPage;
    this.search();

  }
  applyFilters(globalSearch?: string) {
    this.cache = -1;
    this.rows = [];
    this.page.number = 0;
    this.search(globalSearch);
  }


}
