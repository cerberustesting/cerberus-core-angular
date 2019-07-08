import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITest } from 'src/app/shared/model/test.model';
import { ITestCaseHeader, ITestCase, IStep, IAction, IControl } from 'src/app/shared/model/testcase.model';
import { ILabel, ITestCaseLabel } from 'src/app/shared/model/label.model';
import { IProject } from 'src/app/shared/model/project.model';
import { AppSettings } from 'src/app/app.component';
import { TrueindexPipe } from 'src/app/shared/pipes/trueindex.pipe';
import { IProperty, Property } from 'src/app/shared/model/property.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //'X-Requested-With': 'XMLHttpRequest',
    //'Cookie:': 'JSESSIONID=2e0cb26156d548803026c75c051b'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TestService {
  testsList: Array<ITest> = new Array<ITest>();
  testcasesList: Array<ITestCaseHeader> = new Array<ITestCaseHeader>();
  testcase_labels: Array<ILabel> = new Array<ILabel>();
  testcase_properties: Array<IProperty>;
  testcase: ITestCase = null;
  private testcaseheader_countriesList_format = new Array<string>();
  //project
  projectsList: Array<IProject> = new Array<IProject>();
  //observables
  observableTestsList = new BehaviorSubject<ITest[]>(this.testsList);
  observableTestCasesList = new BehaviorSubject<ITestCaseHeader[]>(this.testcasesList);
  observableTestCaseLabels = new BehaviorSubject<ILabel[]>(this.testcase_labels);
  observableTestCase = new BehaviorSubject<ITestCase>(this.testcase);
  observableLabels = new BehaviorSubject<ILabel[]>(this.testcase_labels);
  observableProjectsList = new BehaviorSubject<IProject[]>(this.projectsList);
  observableTestCaseProperties = new BehaviorSubject<IProperty[]>(this.testcase_properties);
  // boolean
  refreshTC: boolean = false;

  constructor(
    private http: HttpClient,
    private TrueindexPipe: TrueindexPipe
  ) { }

  getTestsList() {
    this.http.get<ITest[]>(AppSettings.API_endpoint + '/ReadTest')
      .subscribe(response => {
        // @ts-ignore
        if (response.iTotalRecords > 0) {
          // @ts-ignore
          this.testsList = response.contentTable;
          this.observableTestsList.next(this.testsList);
        } else {
          this.testsList = null;
          this.observableTestsList.next(this.testsList);
        }
      });
  }

  getTestCasesList(test?: string, systems?: string[]) {
    let query = AppSettings.API_endpoint + '/ReadTestCase?' + ((test) ? 'test=' + test + '&' : '');
    if (systems) {
      for (let system of systems) {
        query += 'system=' + system + '&';
      }
    }

    this.http.get<ITestCaseHeader[]>(query)
      .subscribe((response) => {
        // @ts-ignore
        if (response.iTotalRecords > 0) {
          // @ts-ignore
          this.testcasesList = response.contentTable;
          this.observableTestCasesList.next(this.testcasesList);
        }
        else {
          this.testcasesList = null;
          this.observableTestCasesList.next(this.testcasesList);
        }
      })
  }

  getTestCase(test: string, testcase: string) {
    if (test == null || testcase == null) {
      this.testcase = null;
    } else {
      this.http.get<ITestCase>(AppSettings.API_endpoint + '/ReadTestCase?test=' + test + '&testCase=' + testcase + '&withStep=true')
        .subscribe((response) => {
          this.testcase = response;
          this.observableTestCase.next(this.testcase);
          // format the countries List to an string array
          this.testcaseheader_countriesList_format = new Array<string>();
          this.testcaseheader_countriesList_format = this.convertCountriesList(this.testcase.info);
          this.getLabelsfromTestCase(test, testcase);
        })
    }
  }

  getLabelsfromTestCase(test: string, testcase: string) {
    var url = AppSettings.API_endpoint + '/ReadTestCaseLabel?test=' + test + '&testcase=' + testcase
    this.http.get<ITestCaseLabel[]>(url)
      .subscribe((response) => {
        // @ts-ignore
        var content_table = response.contentTable;
        this.testcase_labels = [];
        // DIRTY : convert the ITestCaseLabel to Label : easier to manipulate
        for (var tclabel in content_table) {
          var label = content_table[tclabel].label;
          this.testcase_labels.push(label);
        }
        this.observableTestCaseLabels.next(this.testcase_labels);
      })
  }

  seletectedTestExist(test: string): boolean {
    if (test != null) {
      return this.testsList.filter(t => t.test === test).length > 0;
    } else {
      return false;
    }
  }

  selectedTestCaseExist(testcase: string): boolean {
    return this.testcasesList.filter(tc => tc.testCase === testcase).length > 0;
  }

  getProperties(test: string, testcase: string) {
    var url = AppSettings.API_endpoint + '/GetPropertiesForTestCase?test=' + test + '&testcase=' + testcase
    this.http.get<IProperty[]>(url)
      .subscribe((response) => {
        // split the properties by country (one per country) 
        this.testcase_properties = this.sanitizePropertiesList(response);
        this.observableTestCaseProperties.next(this.testcase_properties);
      })
  }

  // DIRTY : add angular managed ids to separate properties uniquely
  sanitizePropertiesList(propList: Array<IProperty>): Array<IProperty> {
    let id = 0;
    propList.forEach((prop1) => {
      let propName = prop1.property
      id = id + 1;
      if (propName == "") {
        prop1.property_id = id;
      } else {
        propList.forEach((prop2) => {
          if (prop2.property == propName) {
            prop2.property_id = id;
          }
        });
      }
    });
    return propList;
  }

  // compute all the current properties and return a unique ID
  getNewPropertyID(): number {
    let idsArray = new Array<number>();
    this.testcase_properties.forEach((prop) => {
      if (prop.property_id) { idsArray.push(prop.property_id); }
    });
    if (idsArray.length == 0) { return 1; }
    else { return Math.max(...idsArray) + 1; }
  }

  // rename several property values with the same property_id
  renameProperty(propList: Array<IProperty>, id: number, newName: string): Array<IProperty> {
    propList.forEach((prop) => { if (prop.property_id == id) { prop.property = newName; } });
    return propList;
  }

  // add a property
  addProperty(propList: Array<IProperty>, prop: IProperty): Array<IProperty> {
    propList.push(prop);
    return propList;
  }

  removePropertiesById(propList: Array<IProperty>, id: number): Array<IProperty> {
    // must loop backward to avoid having indexes problem when calling splice()
    for (let i = propList.length - 1; i >= 0; i--) {
      let prop = propList[i];
      if (prop.property_id == id) {
        propList.splice(propList.indexOf(prop), 1);
      }
    }
    return propList;
  }

  // remove from the properties model a single propValue
  removePropertyValue(propList: Array<IProperty>, prop: IProperty): Array<IProperty> {
    let propValue = propList.find(p => p == prop);
    propList.splice(this.testcase_properties.indexOf(propValue), 1);
    return propList;
  }

  filterPropertiesByid(propertiesList: Array<IProperty>, id: number): Array<IProperty> {
    return propertiesList.filter(prop => prop.property_id == id);
  }

  findPropertyNameById(propList: Array<IProperty>, id: number): string {
    return propList.find(prop => prop.property_id == id).property
  }

  // DIRTY : correct the model mistake
  convertCountriesList(testcaseheader: ITestCaseHeader): Array<string> {
    var countriesList = new Array<string>();
    for (var index in testcaseheader.countryList) {
      countriesList.push(testcaseheader.countryList[index]);
    }
    return countriesList;
  }

  isCountryDefinedForTestCase(testcaseheader: ITestCaseHeader, country: string): boolean {
    return this.testcaseheader_countriesList_format.includes(country);
  }

  saveTestCaseHeader(testcaseheader: ITestCaseHeader, originalTest, originalTestCase) {
    var data: ITestCaseHeader
    data = testcaseheader;
    // add the original test and testcase to the data to send
    data.originalTest = originalTest;
    data.originalTestCase = originalTestCase;
    console.log(data);
    /*
    // use of URLSearchParams() and body.toString to match the old school API
    let body = new URLSearchParams();
    for (var key in data) {
      body.set(key, data[key]);
    }
    this.http.post('http://localhost:8080/Cerberus-3.8-SNAPSHOT/UpdateTestCase', body.toString(), httpOptions)
      .subscribe((response) => {
        con
    */
  }

  debug(testcase: ITestCase) {
    for (let step of testcase.stepList) {
      console.log("iterating on step#" + step.sort + " which is the step " + step.description);
    }
  }

  refreshStepSort(stepList: Array<IStep>): void {
    stepList.forEach((step, index) => {
      var newIndex = this.TrueindexPipe.transform(index);
      //console.log("step #"+newIndex+' descripton: '+step.description);
      step.sort = newIndex;
    });
  }

  refreshActionSort(actionList: Array<IAction>): void {
    actionList.forEach((action, index) => {
      var newIndex = this.TrueindexPipe.transform(index);
      //console.log("action #"+newIndex+' descripton: '+action.description);
      action.sort = newIndex;
    });
  }

  refreshControlSort(controlList: Array<IControl>): void {
    controlList.forEach((control, index) => {
      var newIndex = this.TrueindexPipe.transform(index);
      //console.log("control #"+newIndex+' descripton: '+control.description);
      control.sort = newIndex;
    });
  }

  saveTestCase(testcase: ITestCase) {
    //this.refreshStepSortSequence(testcase.stepList);
    console.log("TestCase Object to be saved");
    console.log(testcase.stepList);
    this.debug(testcase);

  }

  clearTestCase() {
    this.testcase = null;
    this.observableTestCase.next(this.testcase);
  }

  getProjectsList() {
    this.http.get<IProject[]>(AppSettings.API_endpoint + '/ReadProject')
      .subscribe(response => {
        // @ts-ignore
        this.projectsList = response.contentTable;
        this.observableProjectsList.next(this.projectsList);
      });
  }

}