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

  rows: Array<any>;
  globalSearch: string


  constructor(private testService: TestService, private filterService: FilterService, private invariantsService: InvariantsService) { }

  ngOnInit() {
    this.search();    
  }

  search(globalSearch?: string) {
    if (this.servlet) {
      this.globalSearch = (globalSearch)? globalSearch : ''; 
      this.columns.filter(a => a.contentName==="system")[0].sSearch = this.columns.filter(a => a.contentName==="system")[0].sSearch.concat(this.invariantsService.systemsSelected);
      let systemArray = this.columns.filter(a => a.contentName==="system")[0].sSearch;
      this.columns.filter(a => a.contentName==="system")[0].sSearch = systemArray.filter((a,i) => systemArray.indexOf(a)===i);
      this.testService.getFromRequest(this.servlet, this.filterService.generateQueryStringParameters(this.columns, this.page, this.globalSearch), (list, length) => {
        this.rows = list;
        this.page.totalCount = length;
      });
    }
  }

  pageUpdate(newPage) { //When selecting a new page    
    this.page.number = newPage;
    this.search();
  }

}
