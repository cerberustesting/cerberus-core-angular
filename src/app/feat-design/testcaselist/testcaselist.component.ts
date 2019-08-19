import { Component, OnInit } from '@angular/core';
import { TestService } from '../../core/services/crud/test.service';
import { ITestCaseHeader } from '../../shared/model/testcase.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { Column } from 'src/app/shared/model/column.model';
import { LabelfilteringPipe } from 'src/app/shared/pipes/labelfiltering.pipe';
import { Filter } from 'src/app/shared/model/filter.model';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';
import { TestCasesColumnsData } from './testcaselist.columnsdata';
import { HeaderTitleService } from 'src/app/core/services/crud/header-title.service';




@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {


  columns: Array<Column> = TestCasesColumnsData; // column list
  
  page = {
    size: 0, //maximum element per page
    number: 1, //number of current page
    sort: [{dir: "asc", prop : "testCase"}], //sort item
    totalCount: 0 //total count of element in database
  };
  selectedRows: Array<any> = [];
  servlet :string = '/ReadTestCase'

  userPreferences: string;
  
  constructor(private headerTitleService: HeaderTitleService) { 
    this.headerTitleService.setTitle("Testcase List");
  }

  ngOnInit() {
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

}
