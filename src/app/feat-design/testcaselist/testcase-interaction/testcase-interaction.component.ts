import { Component, OnInit } from '@angular/core';
import { ITestCase, ITestCaseHeader } from 'src/app/shared/model/testcase.model';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { IApplication } from 'src/app/shared/model/application.model';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { TestService } from 'src/app/core/services/crud/test.service';
import { ITest } from 'src/app/shared/model/test.model';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

export enum TESTCASE_INTERACTION_MODE {
  EDIT = 'EDIT',
  DUPLICATE = 'DUPLICATE'
}

@Component({
  selector: 'app-testcase-interaction',
  templateUrl: './testcase-interaction.component.html',
  styleUrls: ['./testcase-interaction.component.scss']
})
export class TestcaseInteractionComponent implements OnInit {

  // *** Inputs ***
  testCase: ITestCaseHeader;
  mode: TESTCASE_INTERACTION_MODE;

  // *** HTML control ***
  private paneActive = 1;

  // *** Forms ***
  private testcaseHeaderForm: FormGroup;

  // *** select lists ***
  private booleanList: Array<any> = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' }
  ];
  private applicationsList: Array<IApplication>; // ok
  private statusList: Array<IInvariant>; // ok
  private typesList: Array<IInvariant>; // ok
  private priorityList: Array<IInvariant>; // TODO
  private sprintsList: Array<any>; // ? add type
  private revsList: Array<any>; // ? add type
  private conditionsList: Array<IInvariant>; // TODO
  private testsList: Array<ITest>;
  private countriesList: Array<IInvariant>;

  private tcCountryList: Array<any> = [];

  constructor(
    private invariantsService: InvariantsService,
    private systemService: SystemService,
    private formBuilder: FormBuilder,
    private testService: TestService) { }

  ngOnInit() {
    this.systemService.getApplicationList();
    this.systemService.observableApplicationList.subscribe(rep => this.applicationsList = rep);
    this.invariantsService.getTcStatus();
    this.invariantsService.observableTcStatus.subscribe(rep => this.statusList = rep);
    this.invariantsService.getStepConditionOperList();
    this.invariantsService.observableConditionOperList.subscribe(rep => this.conditionsList = rep);
    this.invariantsService.getCountriesList();
    this.invariantsService.observableCountriesList.subscribe(rep => this.countriesList = rep);
    this.invariantsService.getPriorities();
    this.invariantsService.observablePriorities.subscribe(rep => this.priorityList = rep);
    this.invariantsService.getGroupList();    
    this.invariantsService.observableGroupsList.subscribe(rep => this.typesList = rep);
    this.systemService.getSprintsFromSystem(this.testCase.system);
    this.systemService.observableSprints.subscribe(rep => this.sprintsList = [{ versionName: '' }].concat(rep));
    this.systemService.getRevFromSystem(this.testCase.system);
    this.systemService.observableRevs.subscribe(rep => this.revsList = [{ versionName: '' }].concat(rep));
    this.testService.getTestsList();
    this.testService.observableTestsList.subscribe(rep => this.testsList = rep);

    for (let country in this.testCase.countryList) this.tcCountryList.push(country);

    this.testcaseHeaderForm = this.formBuilder.group({
      test: this.testCase.test,
      testCase: this.testCase.testCase,
      originalTest: this.testCase.test, // ! const
      originalTestCase: this.testCase.testCase, // ! const
      active: this.testCase.tcActive,
      activeProd: this.testCase.activePROD,
      activeQA: this.testCase.activeQA,
      activeUAT: this.testCase.activeUAT,
      application: this.testCase.application,
      behaviorOrValueExpected: this.testCase.behaviorOrValueExpected, // ?
      bugId: this.testCase.bugID,
      comment: this.testCase.comment,
      fromRev: this.testCase.fromRev,
      fromSprint: this.testCase.fromBuild,
      group: this.testCase.group,
      implementer: this.testCase.implementer,
      priority: this.testCase.priority,
      shortDesc: this.testCase.description, // ?
      status: this.testCase.status, // ?
      targetRev: this.testCase.targetRev,
      targetSprint: this.testCase.targetBuild,
      conditionOper: this.testCase.conditionOper,
      conditionVal1: this.testCase.conditionVal1,
      conditionVal2: this.testCase.conditionVal2,
      toRev: this.testCase.toRev,
      toSprint: this.testCase.toBuild,
      userAgent: this.testCase.userAgent, // ?
      screenSize: this.testCase.screenSize
      // labelList: [], // ?
      // countryList: [{ "country": "BE", "toDelete": true }, { "country": "CH", "toDelete": true }, { "country": "ES", "toDelete": true }, { "country": "FR", "toDelete": true }, { "country": "IT", "toDelete": true }, { "country": "NL", "toDelete": true }, { "country": "PT", "toDelete": false }, { "country": "RU", "toDelete": true }, { "country": "UK", "toDelete": true }, { "country": "VI", "toDelete": true }, { "country": "PL", "toDelete": true }, { "country": "DE", "toDelete": true }, { "country": "RX", "toDelete": true }, { "country": "UF", "toDelete": true }], // ?
      // testcaseDependency: [], // ?
    });

  }

  onSubmit(values: any) {
    console.log(this.tcCountryList);
    // values.shortDesc = encodeURIComponent(values.shortDesc);
    // values.status = encodeURIComponent(values.status);
    // values.userAgent = encodeURIComponent(values.userAgent);
    // values.behaviorOrValueExpected = encodeURIComponent(values.behaviorOrValueExpected);

    let queryString = "";

    for (let item in values) {
      queryString += encodeURIComponent(item) + '=' + encodeURIComponent(values[item]) + '&';
    }
    queryString += 'labelList+' + encodeURIComponent(JSON.stringify([])) + '&';    
    queryString += 'testcaseDependency+' + encodeURIComponent(JSON.stringify([])) + '&';

    let countryList = [];
    for (let country of this.countriesList) {
      countryList.push(
        {country: country.value, toDelete: this.tcCountryList.map(c => c.country).includes(country.value)}
      )
    }
    queryString += 'countryList+' + encodeURIComponent(JSON.stringify(countryList));
    

    console.log(queryString);
    this.testService.updateTestCase(queryString).subscribe(rep => console.info(rep));
    return false;
    
  }

}
