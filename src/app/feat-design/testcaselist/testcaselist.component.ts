import { Component, OnInit } from '@angular/core';
import { TestService } from '../../core/services/crud/test.service';
import { ITestCaseHeader } from '../../shared/model/testcase.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { Column } from 'src/app/shared/model/column.model';
import { LabelfilteringPipe } from 'src/app/shared/pipes/labelfiltering.pipe';
import { Filter } from 'src/app/shared/model/filter.model';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';
import { ColumnsData } from './columns-data';




@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {

  rows = [];
  columns: Array<Column> = ColumnsData;

  page = {
    size: 10, //maximum element per page
    number: 1, //number of current page
    sort: [{dir: "asc", prop : "testcase"}], //sort item
    totalCount: 0 //total count of element in database
  };

  selectedTest = '';
  // searchTerm =  { $or: [{ testCase: '' }, { status: '' }, { application: '' }, { description: '' }, { system: '' }] };

  filterTest: any;
  testcasesList: Array<ITestCaseHeader>;
  filterList: Array<Filter> = [];
  userPreferences:  {
    columns: Array<Column>,
    page: any
  };
  globalSearch = '';
  selectedRows: Array<any> = [];
  
  constructor(private testService: TestService, private invariantsService: InvariantsService, private labelfilteringPipe: LabelfilteringPipe, private systemService: SystemService, private filterService: FilterService) { }

  ngOnInit() {
    // this.testService.getTestCasesList(this.selectedTest, this.invariantsService.systemsSelected, this.page.size, this.page.number);

    this.testService.observableTestCasesList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.testcasesList = response;
        }
      } else {
        this.testcasesList = null;
      }
    });
    this.testService.observableTestCasesListLength.subscribe(response => {
      if (response) {
        this.page.totalCount = response;
      }
    });
    this.search();

  }

  updateTest(selection) {
    this.filterTest = selection;
    this.testService.getTestCasesList(this.filterTest, this.invariantsService.systemsSelected);
  }

  appplySystemChange(globalSearch?: string) {
    if (this.page.size == null) this.page.size = 10;
    this.globalSearch = (globalSearch)? globalSearch : '';
    
    this.search()
    // if(this.filterList.length > 0) {
    //   this.testService.getTestCasesFilterList(this.page.size, this.filterList);
    // }else {
    //   this.testService.getTestCasesList(this.selectedTest, this.invariantsService.systemsSelected, this.page.size, this.page.number);
    // }

  }

  pageUpdate(newPage) { //When selecting a new page    
    this.page.number = newPage;
    this.appplySystemChange();
  }

  save() {
    console.log("Not implemented yet");
  }

  load() {
    console.log("Not implemented yet");
  }

  search() {
    
    //adjust system search with selected system and delete double.
    this.columns.filter(a => a.contentName==="system")[0].sSearch = this.columns.filter(a => a.contentName==="system")[0].sSearch.concat(this.invariantsService.systemsSelected);
    let systemArray = this.columns.filter(a => a.contentName==="system")[0].sSearch;
    this.columns.filter(a => a.contentName==="system")[0].sSearch = systemArray.filter((a,i) => systemArray.indexOf(a)===i);
    this.testService.getTestCasesFilterList(this.filterService.generateQueryStringParameters(this.columns, this.page, this.globalSearch));
  }

}
