import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { SystemService } from 'src/app/core/services/api/system.service';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';
import { Subject } from 'rxjs';
import { TestService } from 'src/app/core/services/api/test/test.service';
import { UserService } from 'src/app/core/services/api/user.service';

@Component({
  selector: 'app-testcasescript',
  templateUrl: './testcasescript.component.html',
  styleUrls: ['./testcasescript.component.scss']
})
export class TestcasescriptComponent implements OnInit, OnDestroy {

  /** currently selected test folder */
  public selectedTest: string;

  /** currently selected test case id */
  public selectedTestCase: string;

  /** corresponding selected test case object */
  public testcase: TestCase;

  /** event to be fired when the 'save script' button is pressed */
  saveScriptEvent: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private testcaseService: TestcaseService,
    private testService: TestService,
    private InvariantService: InvariantsService,
    private systemService: SystemService,
    private headerTitleService: HeaderTitleService,
    private userService: UserService
  ) { }

  ngOnDestroy() {
    this.testcase = null;
    this.testcaseService.observableTestCase.next(this.testcase);
    this.selectedTest = null;
    this.selectedTestCase = null;
  }

  ngOnInit() {
    // set the page title
    this.headerTitleService.setTitle('Testcase Edition');

    // set the testcase object to its inital state (null)
    this.testcase = undefined;

    // update the applications list as soon as the user is defined (need its current system)
    // TODO : move this function up in the comp tree
    this.userService.observableUser.subscribe(rep => {
      if (rep) { this.systemService.getApplicationList(); }
    });

    // check the URL and decode the potential test folder and test case id
    if (this.activatedRoute.snapshot.paramMap.has('test')) {
      this.selectedTest = decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('test'));
      if (this.activatedRoute.snapshot.paramMap.has('testcase')) {
        this.selectedTestCase = decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('testcase'));
        // if a test folder and a test case id are defined in the URL, get the corresponding test case object
        this.refreshTestCase(this.selectedTest, this.selectedTestCase);
      } else {
        this.selectedTestCase = null;
      }
    } else {
      // no test folder defined in the URL
      this.selectedTest = null;
      this.selectedTestCase = null;
    }

    // refresh the public invariants
    this.InvariantService.getCountriesList();
    this.InvariantService.getTcStatus();
    this.InvariantService.getOriginsList();
    this.InvariantService.getPriorities();
    this.InvariantService.getTestCaseTypesList();
    this.InvariantService.getOriginsList();
    this.InvariantService.getPropertyDatabaseList();

    // refresh the private invariants : loaded once (excluded from any refresh)
    // TODO : use promise instead of observables
    this.InvariantService.getConditionOperatorsList();
    this.InvariantService.getStepLoopList();
    this.InvariantService.getActionList();
    this.InvariantService.getControlsList();
    this.InvariantService.getPropertyTypeList();
    this.InvariantService.getPropertyNatureList();
  }

  /** receive the selected test from the child component to update the route (URL)
   * fired when the selected test folder change (in the child comp)
   * and when the ng-select is instantiated
  */
  receiveTest($event) {
    // update the selected test folder
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

  /** receive the selected test case id the child component to update the route (URL)
    * fired when the selected test case id change (in the child comp)
  */
  receiveTestCase($event) {
    this.selectedTestCase = $event;
    // if the selected case id is null, don't update the route (it will be done by receiveTest method)
    if (this.selectedTestCase !== null) {
      this.router.navigate(['/design/testcasescript', this.selectedTest, this.selectedTestCase]);
      this.refreshTestCase(this.selectedTest, this.selectedTestCase);
    }
  }

  /** send a new GET query to the API, resolve the promise by getting the test case object */
  refreshTestCase(testfolder: string, testcaseid: string): void {
    this.testcaseService.getTestCase(testfolder, testcaseid, (testcase: TestCase) => {
      this.testcase = testcase;
      // refresh the labels list for the testcase system
      this.systemService.getLabelsFromSystem(this.testcase.system);
      // refresh the applications list for the testcase system
      this.systemService.getApplication(this.testcase.application);
      // refresh the revision list for the testcase system
      this.systemService.getRevFromSystem(this.testcase.system);
      // refresh the sprints list for the testcase system
      this.systemService.getSprintsFromSystem(this.testcase.system);
    });
  }

}
