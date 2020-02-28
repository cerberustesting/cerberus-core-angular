import { Component, OnInit } from '@angular/core';
import { TestCaseHeader } from 'src/app/shared/model/testcase.model';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { IApplication } from 'src/app/shared/model/application.model';
import { SystemService } from 'src/app/core/services/api/system.service';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { TestFolder } from 'src/app/shared/model/back/test.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/api/sidecontent.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ICrossReference, CrossreferenceService } from 'src/app/core/services/utils/crossreference.service';

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
  // DIRTY : waiting for dev
  // https://github.com/cerberustesting/cerberus-source/issues/2015
  private testcaseheader_countryList_custom: Array<string> = new Array<string>();

  // list of tabs
  private tabs: Array<string>;

  // new test case ID when test folder has changed
  private newTestCase: string;

  // form that is submitted to to the API
  public testcaseHeaderForm: FormGroup;
  // detailled description value Editor object
  public Editor = ClassicEditor;

  // title for save button (different according to the mode)
  private saveButtonTitle: string;

  // testcaseList used for Test & Test case folder section
  private testcasesList: Array<TestCaseHeader> = [];

  // public invariants
  private statusList: Array<IInvariant>;
  private priorityList: Array<IInvariant>;
  private sprintsList: Array<any>; // TODO: add type
  private revsList: Array<any>; // TODO: add type
  private countriesList: Array<IInvariant>;

  // private invariants
  private typesList: Array<IInvariant>;
  private conditionOperList: Array<IInvariant>;

  // others cerberus entity
  private applicationsList: Array<IApplication>;

  /** tests folder list */
  private testsList: Array<TestFolder>;

  // cross references array to display the correct input fields according to the selected condition
  private crossReference_ConditionValue: Array<ICrossReference> = this.crossReferenceService.crossReference_ConditionValue;

  // instantiate labelsList objects
  labelList = {
    batteries: [],
    requirements: [],
    stickers: []
  };

  /* dependencies management */
  // selected test
  dependencySelectedTest: string;
  // selected testcase id
  dependencySelectedTestCase: TestCaseHeader;
  // testcaseList used for dependencies
  private testcaseList: Array<TestCaseHeader> = [];

  // DIRTY : input format
  dependencyTestCaseList: Array<any> = [];
  // DIRTY : output format
  dependencyTestCaseListOutput: Array<any> = [];

  // ???
  exit: (n: void) => void;

  // convert the malformed contries list to array of string (remove test and test case attributes)
  feedCustomCountryList(): Array<string> {
    const resArray = new Array<string>();
    this.testcaseheader.countryList.forEach(element => {
      resArray.push(element.country);
    });
    return resArray;
  }

  // return true if a country name (string) is selected fot the test case
  isTheCountrySelected(country: string): boolean {
    const res = this.testcaseheader_countryList_custom.indexOf(country);
    if (res === -1) {
      return false;
    } else {
      return true;
    }
  }

  // select or unselect a country when its clicked
  toggleCountry(country: string) {
    if (this.isTheCountrySelected(country) === true) {
      const index = this.testcaseheader_countryList_custom.indexOf(country);
      this.testcaseheader_countryList_custom.splice(index, 1);
    } else {
      this.testcaseheader_countryList_custom.push(country);
    }
  }

  // return true if a condition oper has a cross reference
  hasConditionCrossReference(condition: string): boolean {
    return this.crossReferenceService.hasCrossReference(condition, this.crossReferenceService.crossReference_ConditionValue);
  }
  // return the actual cross reference value
  findConditionCrossReference(condition: string): ICrossReference {
    return this.crossReferenceService.findCrossReference(condition, this.crossReferenceService.crossReference_ConditionValue);
  }

  constructor(
    private invariantsService: InvariantsService,
    private systemService: SystemService,
    private crossReferenceService: CrossreferenceService,
    private formBuilder: FormBuilder,
    private testcaseService: TestcaseService,
    private notificationService: NotificationService,
    private sidecontentService: SidecontentService) {
    this.selectedTab = null;
    // list of tabs
    this.tabs = ['Definition', 'Settings', 'Labels', 'Bugs', 'Dependencies', 'Audit'];
    this.testcaseheader = undefined;
    this.testcaseHeaderForm = null;
  }

  ngOnInit() {

    // subscribe to invariants and others lists
    this.systemService.observableLabelsHierarchyList.subscribe(rep => this.labelList = rep);
    this.systemService.observableApplicationList.subscribe(rep => this.applicationsList = rep);
    this.invariantsService.observableTcStatus.subscribe(rep => this.statusList = rep);
    this.invariantsService.observableConditionOperList.subscribe(rep => this.conditionOperList = rep);
    this.invariantsService.observableCountriesList.subscribe(rep => this.countriesList = rep);
    this.invariantsService.observablePriorities.subscribe(rep => this.priorityList = rep);
    this.invariantsService.observableGroupsList.subscribe(rep => this.typesList = rep);
    this.systemService.observableSprints.subscribe(rep => { this.sprintsList = rep; });
    this.systemService.observableRevs.subscribe(rep => this.revsList = rep);
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
          this.refreshData(this.testcaseheader);
          this.setFormValues();
          if (this.mode !== INTERACTION_MODE.EDIT) {
            this.refreshNewTestCase();
          }
          this.testcaseheader_countryList_custom = this.feedCustomCountryList();
          this.dependencyTestCaseList = this.testcaseheader.dependencyList;
        }
      });
      // if the full testcaseheader object is passed : we don't refresh
    } else if (this.testcaseheader) {
      this.setFormValues();
      if (this.mode !== INTERACTION_MODE.EDIT) {
        this.refreshNewTestCase();
      }
      this.testcaseheader_countryList_custom = this.feedCustomCountryList();
      this.dependencyTestCaseList = this.testcaseheader.dependencyList;
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

  /** return true if sprints and revs are defined (false instead) */
  sprintsAndRevAreDefined(): boolean {
    return this.sprintsList.length > 0 && this.revsList.length > 0;
  }

  /** set the form values with the testcaseheader one
   * we're converting 'Y' and 'N' field to boolean since it is mandatory for fromControlName
  */
  setFormValues() {
    this.testcaseHeaderForm = this.formBuilder.group({
      test: this.testcaseheader.test || '',
      testCase: this.testcaseheader.testCase,
      originalTest: this.testcaseheader.test,
      originalTestCase: this.testcaseheader.testCase,
      active: this.toBoolean(this.testcaseheader.tcActive),
      activePROD: this.toBoolean(this.testcaseheader.activePROD),
      activeQA: this.toBoolean(this.testcaseheader.activeQA),
      activeUAT: this.toBoolean(this.testcaseheader.activeUAT),
      application: this.testcaseheader.application,
      behaviorOrValueExpected: this.testcaseheader.behaviorOrValueExpected,
      bugId: this.testcaseheader.bugID,
      comment: this.testcaseheader.comment,
      fromRev: this.testcaseheader.fromRev,
      fromSprint: this.testcaseheader.fromBuild,
      group: this.testcaseheader.group,
      implementer: this.testcaseheader.implementer,
      priority: this.testcaseheader.priority,
      shortDesc: this.testcaseheader.description,
      status: this.testcaseheader.status,
      targetRev: this.testcaseheader.targetRev,
      targetSprint: this.testcaseheader.targetBuild,
      conditionOper: this.testcaseheader.conditionOper,
      conditionVal1: this.testcaseheader.conditionVal1,
      conditionVal2: this.testcaseheader.conditionVal2,
      toRev: this.testcaseheader.toRev,
      toSprint: this.testcaseheader.toBuild,
      userAgent: this.testcaseheader.userAgent,
      screenSize: this.testcaseheader.screenSize
      // labels list is added later (onSubmit)
    });
  }

  // used if the user change the test folder selection
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

  // return true if the form has a value for bug ID
  checkBugID() {
    if (this.testcaseHeaderForm.get('bugID').value) {
      return false;
    } else {
      return true;
    }
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

  // fired when the selected test folder (for dependencies) changes
  onTestChange(): void {
    // reset the selected test case value
    this.dependencySelectedTestCase = null;
    if (this.dependencySelectedTest !== null) {
      this.testcaseService.getTestCasesList(this.dependencySelectedTest);
      this.testcaseService.observableTestCasesList
        .subscribe(testcaseList => {
          if (testcaseList) {
            this.testcaseList = testcaseList;
          } else {
            this.testcaseList = [];
          }
        });
    } else {
      this.testcaseList = [];
    }
  }

  // fired when the selected test case id (for dependencies) changes
  onTestCaseChange(testcase: TestCaseHeader): void {
    this.dependencySelectedTestCase = testcase;
  }

  // return true if the add dependncy button should be enabled
  enableAddToDependencyButton(): boolean {
    if (this.dependencySelectedTestCase !== null) {
      return true;
    } else {
      return false;
    }
  }

  // add a testcase id to the tc dependencies
  addToDependencyTable(testcase: TestCaseHeader): void {
    const dependency = {
      // id: this.dependencyTestCaseList.sort((a, b) => (a.id < b.id) ? 1 : -1)[0].id + 1,
      id: this.dependencyTestCaseList.length + 1,
      depTest: testcase.test,
      depTestCase: testcase.testCase,
      description: '',
      active: true
    };
    // check that the dependency (with the same test & testcase) isn't selected yet
    if ((this.dependencyTestCaseList.find(d => d.test === dependency.depTest)) && (this.dependencyTestCaseList.find(d => d.testcase === dependency.depTestCase))) {
      this.notificationService.createANotification('This TestCase is already selected !', NotificationStyle.Error);
    } else {
      this.dependencyTestCaseList.push(dependency);
    }
  }

  // format the dependencies list to be sent to the API
  formatDependency(depList: any[]): Array<any> {
    const res = new Array<any>();
    // format to be sent to /UpdateTestCase
    depList.forEach(dep => {
      const dependency = {
        id: dep.id,
        test: dep.depTest,
        testcase: dep.depTestCase,
        description: dep.description,
        active: dep.active
      };
      res.push(dependency);
    });
    return res;
  }

  // remove a dependency
  removeDependency(dependencyIndex): void {
    this.dependencyTestCaseList.splice(dependencyIndex, 1);
  }

  // submit the new tc object to the API
  onSubmit(values: any): void {

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
    const countryList = []; // the format countrylist
    const labelList = []; // the format labelList

    // encode all the items from the form group
    for (const item in values) {
      if (item) {
        queryString += encodeURIComponent(item) + '=' + encodeURIComponent(values[item] || '') + '&';
      }
    }

    // fill countryList with all countries selected
    for (const country of this.countriesList) {
      countryList.push(
        { country: country.value, toDelete: !this.testcaseheader_countryList_custom.includes(country.value) }
      );
    }

    // fill labelList with all labels selected
    for (const type in this.labelList) {
      if (type) {
        for (const label of this.labelList[type]) {
          if (label.state.selected) {
            labelList.push({ labelId: label.id, toDelete: false });
          }
        }
      }
    }

    // add the dependencies
    this.dependencyTestCaseListOutput = this.formatDependency(this.dependencyTestCaseList);

    // add all list to the queryString
    queryString += 'testcaseDependency=' + encodeURIComponent(JSON.stringify(this.dependencyTestCaseListOutput)) + '&';
    queryString += 'countryList=' + encodeURIComponent(JSON.stringify(countryList)) + '&';
    queryString += 'labelList=' + encodeURIComponent(JSON.stringify(labelList));

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
