import { Component, OnInit} from '@angular/core';
import {TestService} from '../../core/services/crud/test.service';
import {ITestCaseHeader} from '../../shared/model/testcase.model';


@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {

  rows = [];
  columns = [
    { name: 'testCase' },
    { name: 'status' },
    { name: 'application' },
    { name: 'description' },
    { name: 'system' },
    { name: 'tcActive' },
    { name: 'priority' },
  ];
  selectedTest = '';
  searchTerm =  { $or: [{ testCase: '' }, { status: '' }, { application: '' }, { description: '' }, { system: '' }] };
  filterTest: any;
  testcasesList: Array<ITestCaseHeader>;

  constructor( private testService: TestService) { }

  ngOnInit() {
    this.testService.getTestCasesList(this.selectedTest);

    this.testService.observableTestCasesList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.testcasesList = response;
          console.log(this.testcasesList);
        }
      } else {
        this.testcasesList = null;
      }
    });
  }

  updateTest(selection) {
    this.filterTest = selection;
    this.testService.getTestCasesList(this.filterTest);
  }
  updateSearch(search) {
    this.searchTerm.$or[0].testCase = search;
    this.searchTerm.$or[1].status = search;
    this.searchTerm.$or[2].application = search;
    this.searchTerm.$or[3].description = search;
    this.searchTerm.$or[4].system = search;
    console.log(this.searchTerm);
    }
}
