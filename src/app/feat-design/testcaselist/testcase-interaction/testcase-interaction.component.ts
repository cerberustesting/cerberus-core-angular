import { Component, OnInit } from '@angular/core';
import { TestCaseHeader } from 'src/app/shared/model/back/testcase.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { SystemService } from 'src/app/core/services/api/system.service';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { TestFolder } from 'src/app/shared/model/back/test.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/api/sidecontent.service';

@Component({
  selector: 'app-testcase-interaction',
  templateUrl: './testcase-interaction.component.html',
  styleUrls: ['./testcase-interaction.component.scss']
})
export class TestcaseInteractionComponent implements OnInit {

  /** variables received from the addComponentToSideBlock method */
  // from testcaselist.component.ts
  private test: string;
  private testcase: string;
  private application: string;
  // mode to interact with the test case header
  private mode: INTERACTION_MODE;
  // tabs currently active (used to set the active tab)
  private selectedTab: string;

  // testcase header object (can be refreshed by test and test folder variables)
  private testcaseheader: TestCaseHeader = null;

  // list of tabs
  private tabs: Array<string>;

  // new test case ID when test folder has changed
  private newTestCase: string;

  // form that is submitted to to the API
  public testcaseHeaderForm: FormGroup;

  // title for save button (different according to the mode)
  private saveButtonTitle: string;

  // test case list used for Test & Test case folder section
  private testcasesList: Array<TestCaseHeader> = [];

  // tests folder list used for Test & Test case folder section
  private testsList: Array<TestFolder>;

  // labels available for selection (labels hierarchy)
  // private labelList = {
  //   batteries: [],
  //   requirements: [],
  //   stickers: []
  // };

  // ???
  exit: (n: void) => void;

  constructor(
    private invariantsService: InvariantsService,
    private systemService: SystemService,
    private formBuilder: FormBuilder,
    private testcaseService: TestcaseService,
    private notificationService: NotificationService,
    private sidecontentService: SidecontentService) {
    this.selectedTab = null;
    // list of tabs
    this.tabs = ['Definition', 'Settings', 'Labels', 'Bugs', 'Dependencies', 'Audit'];
    this.testcaseheader = undefined;
  }

  ngOnInit() {
    this.testcaseService.observableTestsList.subscribe(rep => this.testsList = rep);

    // set the correct title for the save button (depending on the mode)
    this.saveButtonTitle = this.sidecontentService.getsaveButtonTitle(this.mode);

    // if we haven't received any selected tab, set it to its default value
    if (this.selectedTab === null) {
      this.selectedTab = this.tabs[0];
    }

    this.refreshOthers();

    // check in parameters

    // if the test and testcase values are passed : we refresh
    if (this.test && this.testcase) {
      // refresh the test case object
      this.testcaseService.getTestCaseHeader(this.test, this.testcase);
      // subscribe to the value change
      this.testcaseService.observableTestCaseHeader.subscribe(rep => {
        if (rep) {
          this.testcaseheader = rep;
          console.log(this.testcaseheader);
          this.refreshData(this.testcaseheader);
          this.setFormValues();
          if (this.mode !== INTERACTION_MODE.EDIT) {
            this.refreshNewTestCase();
          }
        }
      });
      // if the full testcaseheader object is passed : we don't refresh
    } else if (this.testcaseheader) {
      this.setFormValues();
      if (this.mode !== INTERACTION_MODE.EDIT) {
        this.refreshNewTestCase();
      }
      // if neither of it is passed, there's a problem
    } else {
      console.error('mandatory parameters not found, please open an issue in github : https://github.com/cerberustesting/cerberus-angular/issues/new?assignees=&labels=bug&template=bug_report.md');
    }
  }

  /** transform 'Y' or 'N' string to boolean */
  toBoolean(raw: string): boolean {
    if (raw === 'Y') {
      return true;
    } else {
      return false;
    }
  }

  /** set the form values with the testcaseheader one
   * we're converting 'Y' and 'N' field to boolean since it is mandatory for fromControlName
  */
  setFormValues() {

    // countries, labels, bugs and dependencies are handled appart from the form
    this.testcaseHeaderForm = this.formBuilder.group({
      originalTest: this.testcaseheader.test,
      originalTestCase: this.testcaseheader.testCase,
      test: new FormControl(this.testcaseheader.test),
      testCase: new FormControl(this.testcaseheader.testCase),
      definition: this.formBuilder.group({
        description: new FormControl(this.testcaseheader.description),
        application: new FormControl(this.testcaseheader.application),
        status: new FormControl(this.testcaseheader.status),
        type: new FormControl(this.testcaseheader.group),
        priority: new FormControl(this.testcaseheader.priority),
        behaviorOrValueExpected: new FormControl(this.testcaseheader.behaviorOrValueExpected)
      }),
      settings: this.formBuilder.group({
        active: new FormControl(this.toBoolean(this.testcaseheader.tcActive)),
        activePROD: new FormControl(this.toBoolean(this.testcaseheader.activePROD)),
        activeUAT: new FormControl(this.toBoolean(this.testcaseheader.activeUAT)),
        activeQA: new FormControl(this.toBoolean(this.testcaseheader.activeQA)),
        fromRev: new FormControl(this.testcaseheader.fromRev),
        fromSprint: new FormControl(this.testcaseheader.fromBuild),
        toRev: new FormControl(this.testcaseheader.toRev),
        toSprint: new FormControl(this.testcaseheader.toBuild),
        targetRev: new FormControl(this.testcaseheader.targetRev),
        targetSprint: new FormControl(this.testcaseheader.targetBuild),
        conditionOper: new FormControl(this.testcaseheader.conditionOper),
        conditionVal1: new FormControl(this.testcaseheader.conditionVal1),
        conditionVal2: new FormControl(this.testcaseheader.conditionVal2),
        conditionVal3: new FormControl(this.testcaseheader.conditionVal3),
        userAgent: new FormControl(this.testcaseheader.userAgent),
        screenSize: new FormControl(this.testcaseheader.screenSize)
      }),
      bugsReport: this.formBuilder.group({
        comment: new FormControl(this.testcaseheader.comment)
      }),
      audit: this.formBuilder.group({
        implementer: new FormControl(this.testcaseheader.implementer),
        executor: new FormControl(this.testcaseheader.executor)
      })
    });
    console.log(this.testcaseHeaderForm);
  }

  /** used if the user change the test folder selection */
  refreshNewTestCase(): void {
    const newTest = this.testcaseHeaderForm.get('test').value;
    // fetch the test cases list for that test folder
    this.testcaseService.getTestCasesList_withCallback(newTest, (tcList: Array<TestCaseHeader>) => {
      this.testcasesList = tcList;
      // find the last unused test case id
      this.newTestCase = this.testcaseService.getLatestTestCaseId(this.testcasesList, newTest);
      // edit the test case form value
      this.testcaseHeaderForm.controls['testCase'].setValue(this.newTestCase);
    });
  }

  /** refresh data that depends on a testcaseheader  */
  refreshData(testcaseheader: TestCaseHeader) {
    this.systemService.getSprintsFromSystem(testcaseheader.system);
    this.systemService.getRevFromSystem(testcaseheader.system);
    this.systemService.getLabelsHierarchyFromSystem(testcaseheader.system, testcaseheader.test, testcaseheader.testCase);
  }

  /** refresh data */
  refreshOthers() {
    this.systemService.getApplicationList();
    this.testcaseService.getTestFoldersList();
  }

  // submit the new tc object to the API
  onSubmit(values: any): void {
    // "values" variables corresponds to the form values

    // if no application is set
    if (!values.application) {
      this.notificationService.createANotification('Please specify the name of the application', NotificationStyle.Warning);
      return;
    }

    // if no test folder is set
    if (!values.test) {
      this.notificationService.createANotification('Please specify the Test Folder', NotificationStyle.Warning);
      return;
    }

    // if no test case id is set
    if (!values.testCase) {
      this.notificationService.createANotification('Please specify the Test Case ID', NotificationStyle.Warning);
      return;
    }

    // query string that will contains all the values
    let queryString = '';

    // instantiate arrays
    const countries = [];
    const labels = [];
    const dependencies = [];

    // add (& encode) all the items from the form group (one to one relationship)
    for (const item in values) {
      if (item) {
        queryString += encodeURIComponent(item) + '=' + encodeURIComponent(values[item] || '') + '&';
      }
    }

    // add all the countries
    // format is [{"country":"FR","toDelete":false},{"country":"BE","toDelete":false}...]
    queryString += 'countryList=' + encodeURIComponent(JSON.stringify(countries)) + '&';

    // fill labelList with all labels selected

    // add the dependencies

    // add all list to the queryString
    // queryString += 'testcaseDependency=' + encodeURIComponent(JSON.stringify(this.dependencyTestCaseListOutput)) + '&';
    queryString += 'countryList=' + encodeURIComponent(JSON.stringify(countries)) + '&';
    queryString += 'labelList=' + encodeURIComponent(JSON.stringify(labels));

    // trigger the correct API endpoint
    if (this.mode === INTERACTION_MODE.CREATE) {
      this.testcaseService.createTestCase(queryString).subscribe(rep => this.refreshTable());
    } else {
      this.testcaseService.updateTestCase(queryString).subscribe(rep => this.refreshTable());
    }
  }

  // ??
  refreshTable(): void {
    this.sidecontentService.closeSideBlock();
    this.exit();
  }

  // cancel the current interaction and close the side content
  closeSideContent() {
    this.sidecontentService.closeSideBlock();
  }
}
