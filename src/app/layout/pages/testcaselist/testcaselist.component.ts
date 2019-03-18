import { Component, OnInit } from '@angular/core';
import {TestService} from '../../../services/crud/test.service';
import {ITestCaseHeader} from '../../../model/testcase.model';

@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {

  selectedTest = '';
  public testcasesList: Array<ITestCaseHeader>;
  displayedColumns: string[] = ['testCase', 'status', 'application', 'description'];

  constructor( private testService: TestService) { }

  ngOnInit() {
    this.testService.getTestCasesList(this.selectedTest);

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
