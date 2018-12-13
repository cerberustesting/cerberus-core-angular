import { Component, OnInit } from '@angular/core';
import { ITestCase } from '../model/testcase.model';
import { ITest } from '../model/test.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '../services/crud/test.service';
import { InvariantsService } from '../services/crud/invariants.service';
import { SystemService } from '../services/crud/system.service';

@Component({
  selector: 'app-testcasescript',
  templateUrl: './testcasescript.component.html',
  styleUrls: ['./testcasescript.component.scss']
})
export class TestcasescriptComponent implements OnInit {

  selectedTest: string;
  selectedTestCase: string;

  testcase: ITestCase;

  testsList: Array<ITest>;
  testCasesList: Array<ITestCase>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private TestService: TestService,
    private InvariantService: InvariantsService,
    private SystemService: SystemService
  ) { }

  ngOnInit() {
    this.selectedTest = null;
    this.selectedTestCase = null;
    // parse query strings from URL
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['test']) { this.selectedTest = params['test']; }
      if (params['testcase']) { this.selectedTestCase = params['testcase']; }
    });
    //subscription
    this.TestService.observableTestCase.subscribe(response => {
      this.testcase = response;
      if (this.testcase) {
        this.SystemService.getLabelsFromSystem(this.testcase.info.system);
        this.SystemService.getRevFromSystem(this.testcase.info.system);
        this.SystemService.getSprintsFromSystem(this.testcase.info.system);
        this.SystemService.getApplicationList();
        this.SystemService.getApplication(this.testcase.info.application);
      }
    });
    this.TestService.getTests();
    this.TestService.getTestCasesByTest(this.selectedTest);
    this.TestService.getProjectsList();
    this.refreshTestCase();
    // load invariant lists
    this.InvariantService.getCountries();
    this.InvariantService.getTcStatus();
    this.InvariantService.getOriginsList();
    this.InvariantService.getPriorities();
    this.InvariantService.getGroupList();
    this.InvariantService.getOriginsList();
    this.InvariantService.getConditionOperList();
  }

  refreshTestCase() {
    if (this.selectedTest != null && this.selectedTestCase != null) {
      this.TestService.getTestCase(this.selectedTest, this.selectedTestCase);
    } else {
      this.testcase = null;
    }
  }

  receiveTest($event) {
    this.selectedTest = $event;
    this.refreshTestCase();
    this.router.navigate([], { queryParams: { test: this.selectedTest } });
  }

  receiveTestCase($event) {
    this.selectedTestCase = $event;
    this.refreshTestCase();
    this.router.navigate([], { queryParams: { test: this.selectedTest, testcase: this.selectedTestCase } });
  }

  debug() {
    console.log(this.testcase);
  }

}
