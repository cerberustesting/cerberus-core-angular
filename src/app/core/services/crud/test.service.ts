import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITest } from 'src/app/shared/model/test.model';
import { ITestCaseHeader, ITestCase, IStep, IAction, IControl } from 'src/app/shared/model/testcase.model';
import { ILabel, ITestCaseLabel } from 'src/app/shared/model/label.model';
import { IProject } from 'src/app/shared/model/project.model';
import { TrueindexPipe } from 'src/app/shared/pipes/trueindex.pipe';
import { IProperty } from 'src/app/shared/model/property.model';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../utils/notification.service';
import { catchError, tap } from 'rxjs/operators';
import { NotificationStyle } from '../utils/notification.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'Cookie:': 'JSESSIONID=2e0cb26156d548803026c75c051b'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TestService {
  testsList: Array<ITest> = new Array<ITest>();
  testcasesList: Array<ITestCaseHeader> = new Array<ITestCaseHeader>();
  testcasesListLength: number;
  // Data Library
  testdatalib: Array<any> = new Array<ITestCaseHeader>();
  testdatalibLength: number;
  // Test case
  testcase: ITestCase = null;
  // DIRTY : waiting for #2016 ReadTestCase servlet : dependencies
  // should only be one object
  testcaseheader: ITestCaseHeader = null;
  testcase_labels: Array<ILabel> = new Array<ILabel>();
  testcase_properties: Array<IProperty>;

  private testcaseheader_countriesList_format = new Array<string>();
  // project
  projectsList: Array<IProject> = new Array<IProject>();
  // observables
  observableTestsList = new BehaviorSubject<ITest[]>(this.testsList);
  observableTestCasesList = new BehaviorSubject<ITestCaseHeader[]>(this.testcasesList);
  observableTestCasesListLength = new BehaviorSubject<number>(this.testcasesListLength);
  observableTestDataLib = new BehaviorSubject<any[]>(this.testcasesList);
  observableTestDataLibLength = new BehaviorSubject<number>(this.testcasesListLength);
  observableTestCaseLabels = new BehaviorSubject<ILabel[]>(this.testcase_labels);
  observableTestCase = new BehaviorSubject<ITestCase>(this.testcase);
  observableLabels = new BehaviorSubject<ILabel[]>(this.testcase_labels);
  observableProjectsList = new BehaviorSubject<IProject[]>(this.projectsList);
  observableTestCaseProperties = new BehaviorSubject<IProperty[]>(this.testcase_properties);
  observableTestCaseHeader = new BehaviorSubject<ITestCaseHeader>(this.testcaseheader);
  // boolean
  refreshTC: boolean;

  constructor(
    private http: HttpClient,
    private trueindexPipe: TrueindexPipe,
    private notificationService: NotificationService
  ) {
    this.refreshTC = false;
  }

  getTestsList() {
    this.http.get<ITest[]>(environment.cerberus_api_url + '/ReadTest')
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

  getTestCasesList(test: string) {
    this.http.get<ITestCaseHeader>(environment.cerberus_api_url + '/ReadTestCase?test=' + test)
      .subscribe((response) => {
        if (response.iTotalRecords > 0) {
          this.testcasesList = response.contentTable;
          this.testcasesListLength = response.iTotalRecords;
          this.observableTestCasesList.next(this.testcasesList);
        } else {
          this.notificationService.createANotification('There are no TestCase for the Test : ' + test, NotificationStyle.Warning);
          this.testcasesList = null;
          this.observableTestCasesList.next(this.testcasesList);
        }
      });
  }

  getFromRequest(servlet: string, queryParameters: string, callback) {
    // get data for datatable
    this.http.post<ITestCaseHeader>(environment.cerberus_api_url + servlet, queryParameters, httpOptions)
      .subscribe((response) => {
        if (response) {
          if (response.iTotalRecords > 0) {
            callback(response.contentTable, response.iTotalRecords);
          } else {
            this.testcasesList = null;
            this.observableTestDataLib.next(this.testcasesList);
          }
        }
      });
  }

  getColumnData(servlet: string, columnName: string) {
    // get all data from one column
    const query = environment.cerberus_api_url + servlet + '?columnName=' + columnName;
    return this.http.get<ITestCaseHeader>(query);
  }
  updateTestCase(queryString) {
    return this.http.post<any>(environment.cerberus_api_url + '/UpdateTestCase', queryString, httpOptions)
      .pipe(tap(
        data => {
          if (data.messageType === 'OK') {
            this.notificationService.createANotification('Testcase updated', NotificationStyle.Success);
          } else {
            this.notificationService.createANotification(data.message, NotificationStyle.Warning);
          }
        },
        error => this.notificationService.createANotification('Error : ' + error.status, NotificationStyle.Error)
      ));
  }
  createTestCase(queryString) {
    return this.http.post<any>(environment.cerberus_api_url + '/CreateTestCase', queryString, httpOptions)
      .pipe(tap(
        data => {
          if (data.messageType === 'OK') {
            this.notificationService.createANotification('Testcase created', NotificationStyle.Success);
          } else {
            this.notificationService.createANotification(data.message, NotificationStyle.Warning);
          }
        },
        error => this.notificationService.createANotification('Error : ' + error.status, NotificationStyle.Error)
      ));
  }

  getTestDataLib(testdatalibid: string, name: string, country: string, callback: (TestDataLib: any) => any) {
    // get data for datatable
    this.http.get<any>(environment.cerberus_api_url + '/ReadTestDataLib?testdatalibid=' + testdatalibid + '&name=' + name + '&country=' + country)
      .subscribe((response) => {
        if (response) {
          callback(response);
        }
      });
  }
  getDataLibData(testdatalibId: string, callback: (data: any) => any) {
    this.http.get<any>(environment.cerberus_api_url + '/ReadTestDataLibData?testdatalibid=' + testdatalibId)
      .subscribe((response) => {
        if (response) {
          callback(response);
        }
      });
  }
  updateTestDataLib(formData: FormData) {
    return this.http.post<any>(environment.cerberus_api_url + '/UpdateTestDataLib', formData);
  }
  createTestDataLib(formData: FormData) {
    return this.http.post<any>(environment.cerberus_api_url + '/CreateTestDataLib', formData);
  }
  deleteTestDataLib(id: string, callback: (n: void) => void) {
    this.http.post<any>(environment.cerberus_api_url + '/DeleteTestDataLib', 'testdatalibid=' + id, httpOptions)
      .subscribe((rep) => callback());
  }
  deleteTestCase(test: string, testCase: string, callback: (n: void) => void) {
    this.http.post<any>(environment.cerberus_api_url + '/DeleteTestCase', 'test=' + encodeURIComponent(test) + '&testCase=' + encodeURIComponent(testCase), httpOptions)
      .subscribe((rep) => callback());
  }


  filtreTestCase(filterTable): Observable<ITestCaseHeader> {
    return this.http.post<ITestCaseHeader>(environment.cerberus_api_url + '/ReadTestCase', filterTable, httpOptions);
  }

  postTestCasesList(formData): Observable<any> {
    return this.http.post(environment.cerberus_api_url + '/ReadTestCase', '');
  }

  /**
  * Gets test case full content
  * /!\ do not provide test case dependencies !
  * @param test
  * @param testcase
  * @returns test case object
  */
  getTestCase(test: string, testcase: string) {
    if (test == null || testcase == null) {
      this.testcase = null;
    } else {
      this.http.get<ITestCase>(environment.cerberus_api_url + '/ReadTestCase?test=' + test + '&testCase=' + testcase + '&withStep=true')
        .subscribe((response) => {
          console.log(environment.cerberus_api_url + '/ReadTestCase?test=' + test + '&testCase=' + testcase);
          this.testcase = response;
          this.observableTestCase.next(this.testcase);
          // format the countries List to an string array
          this.testcaseheader_countriesList_format = new Array<string>();
          this.testcaseheader_countriesList_format = this.convertCountriesList(this.testcase.info);
          this.getLabelsfromTestCase(test, testcase);
        });
    }
  }

  /**
  * Gets only test case header information
  * /!\ do not provide steps/actions/controls
  * @param test
  * @param testcase
  * @returns test case header object
  */
  getTestCaseHeader(test: string, testcase: string) {
    if (test == null || testcase == null) {
      this.testcaseheader = null;
    } else {
      this.http.get<ITestCase>(environment.cerberus_api_url + '/ReadTestCase?test=' + test + '&testCase=' + testcase)
        .subscribe((response) => {
          // @ts-ignore
          this.testcaseheader = response.contentTable;
          this.observableTestCaseHeader.next(this.testcaseheader);
        });
    }
  }

  // TO DELETE : wrong name
  getTestCaseInformations(test: string, testcase: string, callback: (n: ITestCaseHeader) => any) {
    if (test && testcase) {
      this.http.get<any>(environment.cerberus_api_url + '/ReadTestCase?test=' + test + '&testCase=' + testcase)
        .subscribe((response) => callback(response.contentTable));
    }
  }

  getLabelsfromTestCase(test: string, testcase: string) {
    const url = environment.cerberus_api_url + '/ReadTestCaseLabel?test=' + test + '&testcase=' + testcase;
    this.http.get<ITestCaseLabel[]>(url)
      .subscribe((response) => {
        // @ts-ignore
        const content_table = response.contentTable;
        this.testcase_labels = [];
        // DIRTY : convert the ITestCaseLabel to Label : easier to manipulate
        for (const tclabel in content_table) {
          if (tclabel) {
            const label = content_table[tclabel].label;
            this.testcase_labels.push(label);
          }
        }
        this.observableTestCaseLabels.next(this.testcase_labels);
      });
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
    const url = environment.cerberus_api_url + '/GetPropertiesForTestCase?test=' + test + '&testcase=' + testcase;
    this.http.get<IProperty[]>(url)
      .subscribe((response) => {
        // split the properties by country (one per country)
        this.testcase_properties = this.sanitizePropertiesList(response);
        this.observableTestCaseProperties.next(this.testcase_properties);
      });
  }

  // DIRTY : add angular managed ids to separate properties uniquely
  sanitizePropertiesList(propList: Array<IProperty>): Array<IProperty> {
    let id = 0;
    propList.forEach((prop1) => {
      const propName = prop1.property;
      id = id + 1;
      if (propName === '') {
        prop1.property_id = id;
      } else {
        propList.forEach((prop2) => {
          if (prop2.property === propName) {
            prop2.property_id = id;
          }
        });
      }
    });
    return propList;
  }

  // compute all the current properties and return a unique ID
  getNewPropertyID(): number {
    const idsArray = new Array<number>();
    this.testcase_properties.forEach((prop) => {
      if (prop.property_id) { idsArray.push(prop.property_id); }
    });
    if (idsArray.length === 0) {
      return 1;
    } else {
      return Math.max(...idsArray) + 1;
    }
  }

  // rename several property values with the same property_id
  renameProperty(propList: Array<IProperty>, id: number, newName: string): Array<IProperty> {
    propList.forEach((prop) => { if (prop.property_id === id) { prop.property = newName; } });
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
      const prop = propList[i];
      if (prop.property_id === id) {
        propList.splice(propList.indexOf(prop), 1);
      }
    }
    return propList;
  }

  // remove from the properties model a single propValue
  removePropertyValue(propList: Array<IProperty>, prop: IProperty): Array<IProperty> {
    const propValue = propList.find(p => p === prop);
    propList.splice(this.testcase_properties.indexOf(propValue), 1);
    return propList;
  }

  filterPropertiesByid(propertiesList: Array<IProperty>, id: number): Array<IProperty> {
    return propertiesList.filter(prop => prop.property_id === id);
  }

  findPropertyNameById(propList: Array<IProperty>, id: number): string {
    return propList.find(prop => prop.property_id === id).property;
  }

  // DIRTY : correct the model mistake
  convertCountriesList(testcaseheader: ITestCaseHeader): Array<string> {
    const countriesList = new Array<string>();
    for (const index in testcaseheader.countryList) {
      if (index) {
        countriesList.push(testcaseheader.countryList[index]);
      }
    }
    return countriesList;
  }

  isCountryDefinedForTestCase(testcaseheader: ITestCaseHeader, country: string): boolean {
    return this.testcaseheader_countriesList_format.includes(country);
  }

  saveTestCaseHeader(testcaseheader: ITestCaseHeader, originalTest, originalTestCase) {
    let data: ITestCaseHeader;
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

  refreshStepSort(stepList: Array<IStep>): void {
    stepList.forEach((step, index) => {
      const newIndex = this.trueindexPipe.transform(index);
      // console.log("step #"+newIndex+' descripton: '+step.description);
      step.sort = newIndex;
    });
  }

  refreshActionSort(actionList: Array<IAction>): void {
    actionList.forEach((action, index) => {
      const newIndex = this.trueindexPipe.transform(index);
      // console.log("action #"+newIndex+' descripton: '+action.description);
      action.sort = newIndex;
    });
  }

  refreshControlSort(controlList: Array<IControl>): void {
    controlList.forEach((control, index) => {
      const newIndex = this.trueindexPipe.transform(index);
      // console.log("control #"+newIndex+' descripton: '+control.description);
      control.sort = newIndex;
    });
  }

  saveTestCase(testcase: ITestCase) {
    // this.refreshStepSortSequence(testcase.stepList);
    console.log('TestCase Object to be saved');
    console.log(testcase.stepList);
  }

  clearTestCase() {
    this.testcase = null;
    this.observableTestCase.next(this.testcase);
  }

  getProjectsList() {
    this.http.get<IProject[]>(environment.cerberus_api_url + '/ReadProject')
      .subscribe(response => {
        // @ts-ignore
        this.projectsList = response.contentTable;
        this.observableProjectsList.next(this.projectsList);
      });
  }

}
