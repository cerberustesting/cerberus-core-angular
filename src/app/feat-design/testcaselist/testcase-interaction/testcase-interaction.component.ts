import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-testcase-interaction',
  templateUrl: './testcase-interaction.component.html',
  styleUrls: ['./testcase-interaction.component.scss']
})
export class TestcaseInteractionComponent implements OnInit {

  /* variables received from the addComponentToSideBlock method */
  // from testcaselist.component.ts
  private test: string;
  private testcase: string;
  // mode to interact with the test case header
  private mode: INTERACTION_MODE;
  // tabs currently active (used to set the active tab)
  private selectedTab: string;

  // testcase header object refreshed by test and test folder variables
  private testcaseheader: ITestCaseHeader = null;
  // DIRTY : waiting for dev
  // https://github.com/cerberustesting/cerberus-source/issues/2015
  private testcaseheader_countryList_custom: Array<string> = new Array<string>();

  // list of tabs
  private tabs: Array<string>;

  // new test case ID when test folder has changed
  private newTestCase: string;

  // form that is submitted to to the API
  private testcaseHeaderForm: FormGroup;
  // detailled description value Editor object
  public Editor = ClassicEditor;

  // title for save button (different according to the mode)
  private saveButtonTitle: string;

  // testcaseList used for Test & Test case folder section
  private testcasesList: Array<ITestCaseHeader> = [];

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
  private testsList: Array<ITest>;

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
  dependencySelectedTestCase: ITestCaseHeader;
  // testcaseList used for dependencies
  private testcaseList: Array<ITestCaseHeader> = [];

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
    private testService: TestService,
    private notificationService: NotificationService,
    private sidecontentService: SidecontentService) {
    this.selectedTab = null;
    // list of tabs
    this.tabs = ['Definition', 'Settings', 'Labels', 'Bugs', 'Dependencies', 'Audit'];
  }

  ngOnInit() {

    // set the correct title for the save button (depending on the mode)
    this.saveButtonTitle = this.sidecontentService.getsaveButtonTitle(this.mode);

    // init the form (values will be set later)
    this.testcaseHeaderForm = null;

    // if we haven't received any selected tab, set it to its default value
    if (this.selectedTab === null) {
      this.selectedTab = this.tabs[0];
    }

    // force the refresh to get latest testcase header information
    if (this.testcaseheader === null) {
      // if no testcaseheader object has been passed from addComponentToSideBlock()
      // use the test & testcase id passed
      // DIRTY : need API rework
      this.testService.getTestCaseHeader(this.test, this.testcase);
    } else {
      // use the ones from the testcase header instead
      this.testService.getTestCaseHeader(this.testcaseheader.test, this.testcaseheader.testCase);
    }

    // subscribe to the test case observable
    this.testService.observableTestCaseHeader.subscribe(r => {
      if (r) {
        // if no testcaseheader object has been passed from addComponentToSideBlock()
        // the testcaseheader variable is still null
        // DIRTY : need API rework
        if (this.testcaseheader === null) {
          this.refreshOthersDatas();
        } else {
          this.refreshOthersDatas(true);
        }

        this.testcaseheader = r;

        // set the form
        this.setFormValues();

        // set the new testcase ID if it's create/duplicate mode
        if (this.mode !== INTERACTION_MODE.EDIT) {
          this.refreshNewTestCase();
        }

        // format the countries list
        // DIRTY : waiting for dev
        // https://github.com/cerberustesting/cerberus-source/issues/2015
        this.testcaseheader_countryList_custom = this.feedCustomCountryList();

        // feed the dependencies list
        this.dependencyTestCaseList = this.testcaseheader.dependencyList;

      }
    });

    // subscriptions
    this.systemService.observableLabelsHierarchyList.subscribe(rep => this.labelList = rep);
    this.systemService.observableApplicationList.subscribe(rep => this.applicationsList = rep);
    this.invariantsService.observableTcStatus.subscribe(rep => this.statusList = rep);
    this.invariantsService.observableConditionOperList.subscribe(rep => this.conditionOperList = rep);
    this.invariantsService.observableCountriesList.subscribe(rep => this.countriesList = rep);
    this.invariantsService.observablePriorities.subscribe(rep => this.priorityList = rep);
    this.invariantsService.observableGroupsList.subscribe(rep => this.typesList = rep);
    this.systemService.observableSprints.subscribe(rep => this.sprintsList = [{ versionName: '' }].concat(rep));
    this.systemService.observableRevs.subscribe(rep => this.revsList = [{ versionName: '' }].concat(rep));
    this.testService.observableTestsList.subscribe(rep => this.testsList = rep);
  }

  setFormValues() {
    this.testcaseHeaderForm = this.formBuilder.group({
      test: this.testcaseheader.test || '',
      testCase: this.testcaseheader.testCase,
      originalTest: this.testcaseheader.test,
      originalTestCase: this.testcaseheader.testCase,
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

  // refresh datas essential for test case header interaction (tests, applications list...)
  refreshOthersDatas(flag?: boolean) {
    if (flag === undefined) {
      this.testService.getTestsList();
    }
    this.systemService.getApplicationList();
    this.systemService.getLabelsHierarchyFromSystem(this.testcaseheader.system, this.testcaseheader.test, this.testcaseheader.testCase);
    this.systemService.getSprintsFromSystem(this.testcaseheader.system);
    this.systemService.getRevFromSystem(this.testcaseheader.system);
  }

  // TODO : clean it
  /*
  getTCInformationFromSystem(): void {
    if (this.testcaseHeaderForm.value.application) {
      this.testcaseheader.system = this.testcaseHeaderForm.value.application;
      this.systemService.getLabelsHierarchyFromSystem(this.testcaseheader.system, this.testcaseheader.test, this.testcaseheader.testCase);
      this.systemService.getSprintsFromSystem(this.testcaseheader.system);
      this.systemService.getRevFromSystem(this.testcaseheader.system);
    }
  }
  */

  // fired when the selected test folder (for dependencies) changes
  onTestChange(): void {
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

  // fired when the selected test case id (for dependencies) changes
  onTestCaseChange(testcase: ITestCaseHeader): void {
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
      this.testService.createTestCase(queryString).subscribe(rep => this.refreshTable());
    } else {
      this.testService.updateTestCase(queryString).subscribe(rep => this.refreshTable());
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
