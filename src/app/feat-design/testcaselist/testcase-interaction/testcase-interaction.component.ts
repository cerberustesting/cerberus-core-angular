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

@Component({
  selector: 'app-testcase-interaction',
  templateUrl: './testcase-interaction.component.html',
  styleUrls: ['./testcase-interaction.component.scss']
})
export class TestcaseInteractionComponent implements OnInit {

  /** TITLE */
  private saveButtonTitle: string;

  // *** Inputs ***
  testCase: any = {};
  mode: INTERACTION_MODE;
  exit: (n: void) => void;

  // *** HTML control ***
  paneActive = 1;
  labelTab = 1;

  // *** Forms ***
  testcaseHeaderForm: FormGroup;

  // *** select lists ***
  booleanList: Array<any> = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' }
  ];
  applicationsList: Array<IApplication>;
  statusList: Array<IInvariant>;
  typesList: Array<IInvariant>;
  priorityList: Array<IInvariant>;
  sprintsList: Array<any>; // ? add type
  revsList: Array<any>; // ? add type
  conditionsList: Array<IInvariant>;
  testsList: Array<ITest>;
  private countriesList: Array<IInvariant>;
  labelList = {
    batteries: [],
    requirements: [],
    stickers: []
  };

  // *** Other testcase properties ***
  private tcCountryList: Array<any> = [];
  testcaseList: Array<ITestCaseHeader> = [];
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
    if (this.testCase) {
      this.testService.getTestCaseInformations(this.testCase.test, this.testCase.testCase, testcaseHeader => {
        this.testCase = testcaseHeader;
        for (let dependency of this.testCase.dependencyList) {
          this.dependencyTestCaseList.push({
            id: dependency.id,
            test: dependency.depTest,
            testcase: dependency.depTestCase,
            description: dependency.description,
            active: dependency.active
          });
        }
      });
      for (let country in this.testCase.countryList) this.tcCountryList.push(country);
    }

    this.systemService.observableLabelsHierarchyList.subscribe(rep => this.labelList = rep);
    this.systemService.getApplicationList();
    this.systemService.observableApplicationList.subscribe(rep => this.applicationsList = rep);
    this.invariantsService.observableTcStatus.subscribe(rep => this.statusList = rep);
    this.invariantsService.observableConditionOperList.subscribe(rep => this.conditionsList = rep);
    this.invariantsService.observableCountriesList.subscribe(rep => this.countriesList = rep);
    this.invariantsService.observablePriorities.subscribe(rep => this.priorityList = rep);
    this.invariantsService.observableGroupsList.subscribe(rep => this.typesList = rep);

    this.systemService.observableSprints.subscribe(rep => this.sprintsList = [{ versionName: '' }].concat(rep));

    this.systemService.observableRevs.subscribe(rep => this.revsList = [{ versionName: '' }].concat(rep));
    this.testService.getTestsList();
    this.testService.observableTestsList.subscribe(rep => this.testsList = rep);




    this.testcaseHeaderForm = this.formBuilder.group({
      test: this.testCase.test || '',
      testCase: this.testCase.testCase,
      originalTest: this.testCase.test, // ! const
      originalTestCase: this.testCase.testCase, // ! const
      active: this.testCase.tcActive,
      activeProd: this.testCase.activePROD,
      activeQA: this.testCase.activeQA,
      activeUAT: this.testCase.activeUAT,
      application: this.testCase.application,
      behaviorOrValueExpected: this.testCase.behaviorOrValueExpected,
      bugId: this.testCase.bugID,
      comment: this.testCase.comment,
      fromRev: this.testCase.fromRev,
      fromSprint: this.testCase.fromBuild,
      group: this.testCase.group,
      implementer: this.testCase.implementer,
      priority: this.testCase.priority,
      shortDesc: this.testCase.description,
      status: this.testCase.status,
      targetRev: this.testCase.targetRev,
      targetSprint: this.testCase.targetBuild,
      conditionOper: this.testCase.conditionOper,
      conditionVal1: this.testCase.conditionVal1,
      conditionVal2: this.testCase.conditionVal2,
      toRev: this.testCase.toRev,
      toSprint: this.testCase.toBuild,
      userAgent: this.testCase.userAgent,
      screenSize: this.testCase.screenSize,
    });
    this.getFromSystem();
  }

  getFromSystem(): void {
    if (this.testcaseHeaderForm.value.application) {
      this.testCase.system = this.testcaseHeaderForm.value.application;
      this.systemService.getLabelsHierarchyFromSystem(this.testCase.system, this.testCase.test, this.testCase.testCase);
      this.systemService.getSprintsFromSystem(this.testCase.system);
      this.systemService.getRevFromSystem(this.testCase.system);
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
    for (let country of this.countriesList) {
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

}
