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
  dataSource = this.testcasesList;
  displayedColumns: string[] = ['testCase', 'status', 'application', 'description'];

  constructor( private TestService: TestService) { }

  ngOnInit() {
    this.TestService.getTestCasesList(this.selectedTest);

    this.TestService.observableTestCasesList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.testcasesList = response;
          console.log(this.testcasesList);
          console.log(this.dataSource);
        }
      } else {
        this.testcasesList = null;
      }
    });
  }
}
