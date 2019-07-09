import { Component, OnInit} from '@angular/core';
import {TestService} from '../../core/services/crud/test.service';
import {ITestCaseHeader} from '../../shared/model/testcase.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { Column } from 'src/app/shared/model/column.model';


@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {

  rows = [];
  columns: Array<Column> = [
    { displayName: 'Test Folder', contentName: 'testCase', active: true }, //test folder
    { displayName: 'Status', contentName: 'status', active: true },
    { displayName: 'Application', contentName: 'application', active: true },
    { displayName: 'Description', contentName: 'description', width: 300, active: true },
    { displayName: 'System', contentName: 'system',  active: true },
    { displayName: 'TcActive', contentName: 'tcActive',  active: true },
    { displayName: 'Priority', contentName: 'priority',  active: true },
    { displayName: 'CountryList', contentName: 'countryList', width: 200, active: true },
    { displayName: 'Labels', contentName: 'LABELS',  active: true },
    /****/
    { displayName: 'Stickers', contentName: 'stickers',  active: false },//
    { displayName: 'Requirements', contentName: 'requirements',  active: false },
    { displayName: 'Batteries', contentName: 'batteries',  active: false },//
    { displayName: 'Global Activation', contentName: 'Global Activation',  active: false },//
    { displayName: 'Priority', contentName: 'priority',  active: false },
    { displayName: 'Function', contentName: 'function',  active: false },
    { displayName: 'Project', contentName: 'Project',  active: false },//
    { displayName: 'Origine', contentName: 'origine',  active: false },
    { displayName: 'Reference Origine', contentName: 'refOrigin',  active: false },
    { displayName: 'Group', contentName: 'group',  active: false },//type
    { displayName: 'Date Created', contentName: 'dateCreated',  active: false },
    { displayName: 'User Created', contentName: 'usrCreated',  active: false },
    { displayName: 'TestCase Version', contentName: 'testCaseVersion',  active: false },
    { displayName: 'Date Modification', contentName: 'dateModif',  active: false },
    { displayName: 'User Modification', contentName: 'usrModif',  active: false },

  ];
  selectedTest = '';
  searchTerm =  { $or: [{ testCase: '' }, { status: '' }, { application: '' }, { description: '' }, { system: '' }] };

  filterTest: any;
  testcasesList: Array<ITestCaseHeader>;

  constructor( private testService: TestService, private invariantsService: InvariantsService ) { }

  ngOnInit() {
    this.testService.getTestCasesList(this.selectedTest, this.invariantsService.systemsSelected);
    
    this.testService.observableTestCasesList.subscribe(response => {      
      if (response) {
        if (response.length > 0) {
          this.testcasesList = response;
        }
      } else {
        this.testcasesList = null;
      }
    });

  }

  updateTest(selection) {
    this.filterTest = selection;
    this.testService.getTestCasesList(this.filterTest, this.invariantsService.systemsSelected);
  }
  updateSearch(search) {
    this.searchTerm.$or[0].testCase = search;
    this.searchTerm.$or[1].status = search;
    this.searchTerm.$or[2].application = search;
    this.searchTerm.$or[3].description = search;
    this.searchTerm.$or[4].system = search;
    console.log(this.searchTerm);
  }

  appplySystemChange() {
    this.testService.getTestCasesList(this.selectedTest, this.invariantsService.systemsSelected);
    
    this.testService.observableTestCasesList.subscribe(response => {
      
      if (response) {
        if (response.length > 0) {
          this.testcasesList = response;
        }
      } else {
        this.testcasesList = null;
      }
    });
  }

}
