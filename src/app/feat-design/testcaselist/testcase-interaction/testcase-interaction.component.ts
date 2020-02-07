import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ITestCaseHeader } from 'src/app/shared/model/testcase.model';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { IApplication } from 'src/app/shared/model/application.model';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { TestService } from 'src/app/core/services/crud/test.service';
import { ITest } from 'src/app/shared/model/test.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/crud/sidecontent.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ICrossReference, CrossreferenceService } from 'src/app/core/services/utils/crossreference.service';
import { LabelsTabComponent, SelectedLabel } from './labels-tab/labels-tab.component';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { startWith, tap, delay } from 'rxjs/operators';


@Component({
  selector: 'app-testcase-interaction',
  templateUrl: './testcase-interaction.component.html',
  styleUrls: ['./testcase-interaction.component.scss']
})
export class TestcaseInteractionComponent implements OnInit {

  private selectedLabelsList: Array<SelectedLabel>;

  // TODO: group the variables + functions semantically

  /** TITLE */
  saveButtonTitle: string;
  // _mode is used to print the mode value to the component
  // once (every time ngOnInit is fired)
  _mode: string;

  // Editor object
  public Editor = ClassicEditor;

  // Variable received from the addComponentToSideBlock method

  // from testcaselist.component.ts
  private test: string;
  private testcase: string;
  // tabs currently active
  private selectedTab: string;

  // list of tabs
  private tabs: Array<string>;

  // new test case ID when test folder has changed
  private newTestCase: string;

  // used to refresh the test case header
  testcaseheader: ITestCaseHeader = null;
  mode: INTERACTION_MODE;

  exit: (n: void) => void;

  // *** Forms ***
  testcaseHeaderForm: FormGroup;

  // *** select lists ***
  booleanList: Array<any> = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' }
  ];

  // others cerberus entity
  applicationsList: Array<IApplication>;
  testsList: Array<ITest>;
  // testcaseList used for dependencies
  testcaseList: Array<ITestCaseHeader> = [];

  // testcaseList used for Test & Test case folder section
  testcasesList: Array<ITestCaseHeader> = [];

  // public invariants
  private statusList: Array<IInvariant>;
  private priorityList: Array<IInvariant>;
  private sprintsList: Array<any>; // ? add type
  private revsList: Array<any>; // ? add type
  private inv_countries: Array<IInvariant>;

  // private invariants
  private typesList: Array<IInvariant>;
  private conditionOperList: Array<IInvariant>;

  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ConditionValue: Array<ICrossReference> = this.crossReferenceService.crossReference_ConditionValue;

  labelList = {
    batteries: [],
    requirements: [],
    stickers: []
  };

  // *** Other testcase properties ***
  private tcCountryList: Array<any> = [];

  dependencySelectedTest: string;
  dependencySelectedTestCase: ITestCaseHeader;
  // DIRTY : input format
  dependencyTestCaseList: Array<any> = [];
  // DIRTY : output format
  dependencyTestCaseListOutput: Array<any> = [];

  // DIRTY : waiting for dev
  // https://github.com/cerberustesting/cerberus-source/issues/2015
  private testcaseheader_countryList_custom: Array<string> = new Array<string>();
  feedCustomCountryList(): Array<string> {
    const resArray = new Array<string>();
    this.testcaseheader.countryList.forEach(element => {
      resArray.push(element.country);
    });
    return resArray;
  }

  isTheCountrySelected(country: string): boolean {
    const res = this.testcaseheader_countryList_custom.indexOf(country);
    if (res === -1) {
      return false;
    } else {
      return true;
    }
  }

  toggleCountry(country: string) {
    if (this.isTheCountrySelected(country) === true) {
      const index = this.testcaseheader_countryList_custom.indexOf(country);
      this.testcaseheader_countryList_custom.splice(index, 1);
    } else {
      this.testcaseheader_countryList_custom.push(country);
    }
  }

  hasConditionCrossReference(condition: string): boolean {
    return this.crossReferenceService.hasCrossReference(condition, this.crossReferenceService.crossReference_ConditionValue);
  }
  findConditionCrossReference(condition: string): ICrossReference {
    return this.crossReferenceService.findCrossReference(condition, this.crossReferenceService.crossReference_ConditionValue);
  }

  constructor(
    private invariantsService: InvariantsService,
    private systemService: SystemService,
    private crossReferenceService: CrossreferenceService,
    private formBuilder: FormBuilder,
    private testService: TestService,
    private notificationService: NotificationService,
    private sidecontentService: SidecontentService) {
    this.selectedTab = null;
    this.tabs = ['Definition', 'Settings', 'Labels', 'Bugs', 'Dependencies', 'Audit'];
  }

  ngOnInit() {
    this.saveButtonTitle = this.sidecontentService.getsaveButtonTitle(this.mode);
    this._mode = this.mode;

    // init the form (will be set later)
    this.testcaseHeaderForm = null;

    // force the refresh to get latest testcase header information
    this.testService.getTestCaseHeader(this.test, this.testcase);
    // subscribe to the test case observable
    this.testService.observableTestCaseHeader.subscribe(r => {
      if (r) {
        this.testcaseheader = r;

        // set the form
        this.setFormValues();
        this.refreshOthersDatas();

        // set the new testcase ID if it's create/duplicate mode
        if (this.mode !== INTERACTION_MODE.EDIT) {
          this.refreshNewTestCase();
        }

        // DIRTY : waiting for dev
        // https://github.com/cerberustesting/cerberus-source/issues/2015
        this.testcaseheader_countryList_custom = this.feedCustomCountryList();

        this.dependencyTestCaseList = this.testcaseheader.dependencyList;
      }
    });

    // if we haven't received any selected tab, set it to its default value
    if (this.selectedTab === null) {
      this.selectedTab = this.tabs[0];
    }

    // subscriptions
    this.systemService.observableLabelsHierarchyList.subscribe(rep => this.labelList = rep);
    this.systemService.observableApplicationList.subscribe(rep => this.applicationsList = rep);
    this.invariantsService.observableTcStatus.subscribe(rep => this.statusList = rep);
    this.invariantsService.observableConditionOperList.subscribe(rep => this.conditionOperList = rep);
    this.invariantsService.observableCountriesList.subscribe(rep => this.inv_countries = rep);
    this.invariantsService.observablePriorities.subscribe(rep => this.priorityList = rep);
    this.invariantsService.observableGroupsList.subscribe(rep => this.typesList = rep);
    this.systemService.observableSprints.subscribe(rep => this.sprintsList = [{ versionName: '' }].concat(rep));
    this.systemService.observableRevs.subscribe(rep => this.revsList = [{ versionName: '' }].concat(rep));
    this.testService.observableTestsList.subscribe(rep => this.testsList = rep);
  }

  setFormValues() {
    // call the labels tab child component function
    // to get the selected labels list
    // console.log(this.labelsTab.getLabelsSelection());

    this.testcaseHeaderForm = this.formBuilder.group({
      test: this.testcaseheader.test || '',
      testCase: this.testcaseheader.testCase,
      originalTest: this.testcaseheader.test, // ! const
      originalTestCase: this.testcaseheader.testCase, // ! const
      active: this.testcaseheader.tcActive,
      activePROD: this.testcaseheader.activePROD,
      activeQA: this.testcaseheader.activeQA,
      activeUAT: this.testcaseheader.activeUAT,
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
    this.testService.getTestCasesList_withCallback(newTest, (tcList: Array<ITestCaseHeader>) => {
      this.testcasesList = tcList;
      // console.log('refreshNewTestCase for test=' + newTest);
      // find the last unused test case id
      this.newTestCase = this.testService.getLatestTestCaseId(this.testcasesList, newTest);
      // edit the test case form value
      this.testcaseHeaderForm.controls['testCase'].setValue(this.newTestCase);
      // console.log('test case value form updated to : ' + this.newTestCase);
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

  /**
   * refresh datas that a test case header depends on:
   * - invariants lists
   * - tests, applications, labels, build lists
   */
  refreshOthersDatas() {
    this.testService.getTestsList();
    this.systemService.getApplicationList();
    this.systemService.getLabelsHierarchyFromSystem(this.testcaseheader.system, this.testcaseheader.test, this.testcaseheader.testCase);
    this.systemService.getSprintsFromSystem(this.testcaseheader.system);
    this.systemService.getRevFromSystem(this.testcaseheader.system);
  }

  // TODO : clean it
  getTCInformationFromSystem(): void {
    if (this.testcaseHeaderForm.value.application) {
      this.testcaseheader.system = this.testcaseHeaderForm.value.application;
      this.systemService.getLabelsHierarchyFromSystem(this.testcaseheader.system, this.testcaseheader.test, this.testcaseheader.testCase);
      this.systemService.getSprintsFromSystem(this.testcaseheader.system);
      this.systemService.getRevFromSystem(this.testcaseheader.system);
    }
  }

  /** toggleLabel
   * * call on label click
   * * toggle label selection
   * @param label label to select/unselect
   */
  toggleLabel(label): void {
    label.state.selected = !label.state.selected;
  }

  // *** Dependency tab ***

  /** onTestChange
   * * call on test selection
   * * load all testcase from the chosen test
   * @param test
   */
  onTestChange() {
    // reset the selected test case value
    this.dependencySelectedTestCase = null;
    if (this.dependencySelectedTest !== null) {
      this.testService.getTestCasesList(this.dependencySelectedTest);
      this.testService.observableTestCasesList
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

  /** onTestCaseChange
   * * asign the selected testcase to dependencySelectedTestCase
   * @param testcase the testcase to asign
   */
  onTestCaseChange(testcase: ITestCaseHeader) {
    this.dependencySelectedTestCase = testcase;
  }

  enableAddToDependencyButton() {
    if (this.dependencySelectedTestCase !== null) {
      return true;
    } else {
      return false;
    }
  }

  /** addToDependencyTable
   * * add the testcase to the table
   * * if the testcase is already in the table notify the error
   * @param testCaseIndex;
   */
  addToDependencyTable(testcase: ITestCaseHeader): void {
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

  formatDependency(depList: any[]) {
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

  /** removeDependency
   * * call on click on the trash button
   * * delete the dependency from the table
   * @param dependencyIndex
   */
  removeDependency(dependencyIndex): void {
    this.dependencyTestCaseList.splice(dependencyIndex, 1);
  }

  /** onSubmit
   * * call the api to valid the forms
   * @param values values of the formGroup
   */
  onSubmit(values: any): void {

    if (!values.application) {
      this.notificationService.createANotification('Please specify the name of the application', NotificationStyle.Warning);
      return;
    }

    if (!values.test) {
      this.notificationService.createANotification('Please specify the Test Folder', NotificationStyle.Warning);
      return;
    }

    if (!values.testCase) {
      this.notificationService.createANotification('Please specify the Test Case ID', NotificationStyle.Warning);
      return;
    }

    let queryString: string;
    queryString = '';
    // the query string to send
    const countryList = []; // the format countrylist
    const labelList = []; // the format labelList

    // add all items from the form  group
    for (const item in values) {
      if (item) {
        queryString += encodeURIComponent(item) + '=' + encodeURIComponent(values[item] || '') + '&';
      }
    }

    // fill countryList with all countries selected
    for (const country of this.inv_countries) {
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

    this.dependencyTestCaseListOutput = this.formatDependency(this.dependencyTestCaseList);

    // add all list to the queryString
    queryString += 'testcaseDependency=' + encodeURIComponent(JSON.stringify(this.dependencyTestCaseListOutput)) + '&';
    queryString += 'countryList=' + encodeURIComponent(JSON.stringify(countryList)) + '&';
    queryString += 'labelList=' + encodeURIComponent(JSON.stringify(labelList));

    if (this.mode === INTERACTION_MODE.CREATE) {
      this.testService.createTestCase(queryString).subscribe(rep => this.refreshTable());
    } else {
      this.testService.updateTestCase(queryString).subscribe(rep => this.refreshTable());
    }
  }

  /** refreshTable
   * * close the sidecontent and call exit function gave as input
   */
  refreshTable(): void {
    this.sidecontentService.closeSideBlock();
    this.exit();
  }

  closeSideContent() {
    this.sidecontentService.closeSideBlock();
  }
}
