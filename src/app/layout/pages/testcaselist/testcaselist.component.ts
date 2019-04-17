import { Component, OnInit} from '@angular/core';
import {TestService} from '../../../services/crud/test.service';
import {ITestCaseHeader} from '../../../model/testcase.model';


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
  filterTest: any;
  public testcasesList: Array<ITestCaseHeader>;
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

  updateTest(statusSelected) {
    this.filterTest = statusSelected;
    console.log(this.filterTest);
    this.testService.getTestCasesList(this.filterTest);
  }
}
