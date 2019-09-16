import { Component, OnInit } from '@angular/core';
import { ITestCaseHeader } from 'src/app/shared/model/testcase.model';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { IApplication } from 'src/app/shared/model/application.model';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { TestService } from 'src/app/core/services/crud/test.service';
import { ITest } from 'src/app/shared/model/test.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/crud/sidecontent.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-testcase-interaction',
  templateUrl: './testcase-interaction.component.html',
  styleUrls: ['./testcase-interaction.component.scss']
})
export class TestcaseInteractionComponent implements OnInit {

  // TODO: group the variables + functions semantically

  /** TITLE */
  saveButtonTitle: string;
  // _mode is used to print the mode value to the component
  // once (every time ngOnInit is fired)
  _mode: string;

  public Editor = ClassicEditor;

  // Variable received from the addComponentToSideBlock method
  // from testcaselist.component.ts
  private test: string;
  private testcase: string;
  // used to refresh the test case header  
  testcaseheader: ITestCaseHeader = null;
  mode: INTERACTION_MODE;

  // DIRTY : waiting for dev
  // https://github.com/cerberustesting/cerberus-source/issues/2015
  private testcaseheader_countryList_custom: Array<string> = new Array<string>();
  feedCustomCountryList(): Array<string> {
    const resArray = new Array<string>();
    this.testcaseheader.countryList.forEach(element => {
      resArray.push(element.country);
    });
    return resArray
  }

  isTheCountryDefined(country: string): boolean {
    let res = this.testcaseheader_countryList_custom.indexOf(country);
    if (res === -1) {
      return false
    } else {
      return true
    }
  }

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
  testcaseList: Array<ITestCaseHeader> = [];

  // public invariants
  private statusList: Array<IInvariant>;
  private priorityList: Array<IInvariant>;
  private sprintsList: Array<any>; // ? add type
  private revsList: Array<any>; // ? add type
  private inv_countries: Array<IInvariant>;

  // private invariants
  private typesList: Array<IInvariant>;
  private conditionsList: Array<IInvariant>;

  labelList = {
    batteries: [],
    requirements: [],
    stickers: []
  };

  // *** Other testcase properties ***
  private tcCountryList: Array<any> = [];

  dependencySelectedTestCase: ITestCaseHeader;
  dependencyTestCaseList: Array<any> = [];

  constructor(
    private invariantsService: InvariantsService,
    private systemService: SystemService,
    private formBuilder: FormBuilder,
    private testService: TestService,
    private notificationService: NotificationService,
    private sidecontentService: SidecontentService) { }

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
        console.log(r);
        // set the form
        this.setFormValues();
        this.refreshOthersDatas();

        // DIRTY : waiting for dev
        // https://github.com/cerberustesting/cerberus-source/issues/2015
        this.testcaseheader_countryList_custom = this.feedCustomCountryList();
      }
    })
    // if (this.testCase) {
    //   this.testService.getTestCaseInformations(this.testCase.test, this.testCase.testCase, testcaseHeader => {
    //     this.testCase = testcaseHeader;
    //     for (let dependency of this.testCase.dependencyList) {
    //       this.dependencyTestCaseList.push({
    //         id: dependency.id,
    //         test: dependency.depTest,
    //         testcase: dependency.depTestCase,
    //         description: dependency.description,
    //         active: dependency.active
    //       });
    //     }
    //   });
    //   for (let country in this.testCase.countryList) this.tcCountryList.push(country);
    // }

    // subscriptions
    this.systemService.observableLabelsHierarchyList.subscribe(rep => this.labelList = rep);
    this.systemService.observableApplicationList.subscribe(rep => this.applicationsList = rep);
    this.invariantsService.observableTcStatus.subscribe(rep => this.statusList = rep);
    this.invariantsService.observableConditionOperList.subscribe(rep => this.conditionsList = rep);
    this.invariantsService.observableCountriesList.subscribe(rep => this.inv_countries = rep);
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
    });
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
  onTestChange(test) {
    this.testService.getTestCasesList(test);
    this.testService.observableTestCasesList
      .subscribe(testcaseList => {
        if (testcaseList) {
          this.testcaseList = testcaseList;
        } else {
          this.testcaseList = [];
        }
      });
  }

  /** onTestCaseChange
   * * asign the selected testcase to dependencySelectedTestCase
   * @param testcase the testcase to asign
   */
  onTestCaseChange(testcase) {
    this.dependencySelectedTestCase = testcase;
  }

  /** addToDependencyTable
   * * add the testcase to the table
   * * if the testcase is already in the table notify the error
   * @param testCaseIndex 
   */
  addToDependencyTable(testCaseIndex): void {
    let testcase = this.testcaseList[testCaseIndex];
    let dependency = {
      id: this.dependencyTestCaseList.sort((a, b) => (a.id < b.id) ? 1 : -1)[0].id + 1,
      test: testcase.test,
      testcase: testcase.testCase,
      description: '',
      active: true
    };
    if (!(this.dependencyTestCaseList.map(d => d.test).includes(dependency.test) &&
      this.dependencyTestCaseList.map(d => d.testcase).includes(dependency.testcase))) {
      this.dependencyTestCaseList.push(dependency);
    } else {
      this.notificationService.createANotification('This TestCase is already selected !', NotificationStyle.Error);
    }
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
      this.notificationService.createANotification("Please specify the name of the application", NotificationStyle.Warning);
      return;
    }

    if (!values.test) {
      this.notificationService.createANotification("Please specify the Test Folder", NotificationStyle.Warning);
      return;
    }

    if (!values.testCase) {
      this.notificationService.createANotification("Please specify the Test Case ID", NotificationStyle.Warning);
      return;
    }

    let queryString = ""; // the query string to send
    let countryList = []; //the format countrylist
    let labelList = []; //the format labelList

    // add all items from the form  group
    for (let item in values) {
      queryString += encodeURIComponent(item) + '=' + encodeURIComponent(values[item] || '') + '&';
    }

    // fill countryList with all countries selected
    for (let country of this.inv_countries) {
      countryList.push(
        { country: country.value, toDelete: this.tcCountryList.map(c => c.country).includes(country.value) }
      )
    }

    // fill labelList with all labels selected
    for (let type in this.labelList) {
      for (let label of this.labelList[type]) {
        if (label.state.selected) {
          labelList.push(
            { labelId: label.id, toDelete: false }
          )
        }
      }
    }

    // add all list to the queryString
    queryString += 'testcaseDependency=' + encodeURIComponent(JSON.stringify(this.dependencyTestCaseList)) + '&';
    queryString += 'countryList=' + encodeURIComponent(JSON.stringify(countryList)) + '&';
    queryString += 'labelList=' + encodeURIComponent(JSON.stringify(labelList));

    if (this.mode = INTERACTION_MODE.CREATE) {
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

  // DIRTY : converting an array of weird countryObject 
  // from testcaseheader object in array of string
  format_countryListToCustom(array: Array<any>): Array<string> {
    const countryList = new Array<string>();
    for (var country in array) {
      countryList.push(country);
    }
    return countryList;
  }

  // DIRTY : converting an array of string countryObject 
  // to an array of weird countryObject
  format_countryListToRaw(array: Array<string>): Array<any> {
    const countryList = new Array<any>();
    for (var country in array) {
      const c = {
        country: country,
        test: this.testcaseheader.test,
        testCase: this.testcaseheader
      }
      countryList.push(c);
    }
    return countryList;
  }

}
