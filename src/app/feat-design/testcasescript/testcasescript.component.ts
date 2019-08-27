import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ITestCase } from 'src/app/shared/model/testcase.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { HeaderTitleService } from 'src/app/core/services/crud/header-title.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-testcasescript',
  templateUrl: './testcasescript.component.html',
  styleUrls: ['./testcasescript.component.scss']
})
export class TestcasescriptComponent implements OnInit, OnDestroy {

  selectedTest: string;
  selectedTestCase: string;
  testcase: ITestCase;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private TestService: TestService,
    private InvariantService: InvariantsService,
    private SystemService: SystemService,
    private headerTitleService: HeaderTitleService
  ) { 
    headerTitleService.setTitle("Testcase Edition");
  }

  ngOnDestroy() {
    this.testcase = null;
    this.TestService.observableTestCase.next(this.testcase);
    this.selectedTest = null;
    this.selectedTestCase = null;
  }

  ngOnInit() {
    this.selectedTest = null;
    this.selectedTestCase = null;
    if (this.activatedRoute.snapshot.paramMap.has('test')) {
      this.selectedTest = decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('test'));
      if (this.activatedRoute.snapshot.paramMap.has('testcase')) {
        this.selectedTestCase = decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('testcase'));
      }
    }
    this.TestService.getTestsList();
    this.TestService.getProjectsList();
    this.SystemService.getApplicationList();
    this.TestService.observableTestCase.subscribe(response => {
      if (response) {
        this.testcase = response;
        this.TestService.getProperties(this.testcase.info.test, this.testcase.info.testCase);
        this.SystemService.getLabelsFromSystem(this.testcase.info.system);
        this.SystemService.getRevFromSystem(this.testcase.info.system);
        this.SystemService.getSprintsFromSystem(this.testcase.info.system);
        this.SystemService.getApplication(this.testcase.info.application);
      }
    });
    // public invariants
    this.InvariantService.getCountriesList();
    this.InvariantService.getTcStatus();
    this.InvariantService.getOriginsList();
    this.InvariantService.getPriorities();
    this.InvariantService.getGroupList();
    this.InvariantService.getOriginsList();
    this.InvariantService.getPropertyDatabaseList();
    // private invariants : loaded once (exluded from any refresh)
    this.InvariantService.getStepConditionOperList();
    this.InvariantService.getStepLoopList();
    this.InvariantService.getActionList();
    this.InvariantService.getControlsList();
    this.InvariantService.getPropertyTypeList();
    this.InvariantService.getPropertyNatureList();
  }

  receiveTest($event) {
    this.selectedTest = $event;
    this.testcase = null;
    if (this.selectedTest) {
      if (this.selectedTestCase) {
        this.router.navigate(['/design/testcasescript', this.selectedTest, this.selectedTestCase]);
      } else {
        this.router.navigate(['/design/testcasescript', this.selectedTest]);
      }
    }
  }

  receiveTestCase($event) {
    this.selectedTestCase = $event;
    this.router.navigate(['/design/testcasescript', this.selectedTest, this.selectedTestCase]);
  }

  debug() {
    console.log(this.testcase);
  }

}
