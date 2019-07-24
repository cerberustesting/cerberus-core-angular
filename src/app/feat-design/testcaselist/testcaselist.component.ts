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

  rows = []; // testcase list
  columns: Array<Column> = ColumnsData; // coluln list
  userPreferences: string;
  page = {
    size: 10, //maximum element per page
    number: 1, //number of current page
    sort: [{dir: "asc", prop : "testcase"}], //sort item
    totalCount: 0 //total count of element in database
  };

  selectedTest = ''; // ? 

  filterTest: any; //
  testcasesList: Array<ITestCaseHeader>;
  filterList: Array<Filter> = [];
  globalSearch = ''; // value in global search field
  selectedRows: Array<any> = [];
  
  constructor(private testService: TestService, private invariantsService: InvariantsService, private labelfilteringPipe: LabelfilteringPipe, private systemService: SystemService, private filterService: FilterService) { }

  ngOnInit() {
    // this.testService.getTestCasesList(this.selectedTest, this.invariantsService.systemsSelected, this.page.size, this.page.number);
    this.load();
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
    this.save()
    this.search()
  }

  pageUpdate(newPage) { //When selecting a new page    
    this.page.number = newPage;
    this.appplySystemChange();
  }

  save() {
    console.log("Save : Not implemented yet");
    let usrPref = "";
    usrPref = JSON.stringify({
      columns: this.columns,
      pageInformations: this.page
    });
    // TODO : Send data to the database
  }

  load() {
    console.log("Load : Not implemented yet");
    // TODO : Get data from database
  }

  search() {    
    //adjust system search with selected system and delete double.
    this.columns.filter(a => a.contentName==="system")[0].sSearch = this.columns.filter(a => a.contentName==="system")[0].sSearch.concat(this.invariantsService.systemsSelected);
    let systemArray = this.columns.filter(a => a.contentName==="system")[0].sSearch;
    this.columns.filter(a => a.contentName==="system")[0].sSearch = systemArray.filter((a,i) => systemArray.indexOf(a)===i);
    this.testService.getTestCasesFilterList(this.filterService.generateQueryStringParameters(this.columns, this.page, this.globalSearch));
  }

}
