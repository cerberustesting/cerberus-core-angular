import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITest } from 'src/app/shared/model/test.model';
import { TestCaseHeader, ITestCase, Step, Action, Control } from 'src/app/shared/model/testcase.model';
import { ILabel, ITestCaseLabel } from 'src/app/shared/model/label.model';
import { IProject } from 'src/app/shared/model/project.model';
import { TrueindexPipe } from 'src/app/shared/pipes/trueindex.pipe';
import { PropertyValue } from 'src/app/shared/model/property.model';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../utils/notification.service';
import { tap } from 'rxjs/operators';
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
  // list of test folders
  testsList: Array<ITest> = new Array<ITest>();

  // list of testcase id corresponding to the previous test folders list
  testcasesList: Array<TestCaseHeader> = new Array<TestCaseHeader>();

  // TODO: clean this?
  testcasesListLength: number;

  // list of data library
  testdatalib: Array<any> = new Array<TestCaseHeader>();

  // full testcase object
  testcase: ITestCase = null;

  // max id that can be used for a test folder
  maxTestCase: number = null;

  // DIRTY : waiting for #2016 ReadTestCase servlet : dependencies
  // should only be one object
  testcaseheader: TestCaseHeader = null;

  libraryStepList: Array<Step> = new Array<Step>();


  testcase_labels: Array<ILabel> = new Array<ILabel>();
  testcase_properties: Array<PropertyValue>;

  private testcaseheader_countriesList_format = new Array<string>();
  // project
  projectsList: Array<IProject> = new Array<IProject>();
  // observables
  observableTestsList = new BehaviorSubject<ITest[]>(this.testsList);
  observableTestCasesList = new BehaviorSubject<TestCaseHeader[]>(this.testcasesList);
  observableTestCasesListLength = new BehaviorSubject<number>(this.testcasesListLength);
  observableTestDataLib = new BehaviorSubject<any[]>(this.testcasesList);
  observableTestDataLibLength = new BehaviorSubject<number>(this.testcasesListLength);
  observableTestCaseLabels = new BehaviorSubject<ILabel[]>(this.testcase_labels);
  observableTestCase = new BehaviorSubject<ITestCase>(this.testcase);
  observableLabels = new BehaviorSubject<ILabel[]>(this.testcase_labels);
  observableProjectsList = new BehaviorSubject<IProject[]>(this.projectsList);
  observableTestCaseProperties = new BehaviorSubject<PropertyValue[]>(this.testcase_properties);
<<<<<<< HEAD
  observableTestCaseHeader = new BehaviorSubject<ITestCaseHeader>(this.testcaseheader);
  observableLibraryStepList = new BehaviorSubject<Step[]>(this.libraryStepList);
=======
  observableTestCaseHeader = new BehaviorSubject<TestCaseHeader>(this.testcaseheader);
  observableMaxTestCaseID = new BehaviorSubject<number>(this.maxTestCase);
>>>>>>> cdd076a58afb50cae91a15cbe147ed6a0bea04d7
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
    this.http.get<TestCaseHeader>(environment.cerberus_api_url + '/ReadTestCase?test=' + test)
      .subscribe((response) => {
        if (response.iTotalRecords > 0) {
          this.testcasesList = response.contentTable;
          this.testcasesListLength = response.iTotalRecords;
          this.observableTestCasesList.next(this.testcasesList);
        } else {
          if (test != null) {
            this.notificationService.createANotification('There are no TestCase for the Test : ' + test, NotificationStyle.Warning);
            this.testcasesList = null;
            this.observableTestCasesList.next(this.testcasesList);
          }
        }
      });
  }

  // A TERMINER : response
  getLibraryStepList(system: string) {
    this.http.get<Step[]>(environment.cerberus_api_url + '/GetStepInLibrary?system=' + system)
      .subscribe((response) => {
        console.log(response);
        // @ts-ignore
        if (response.testCaseStepList.length > 0) {
          // @ts-ignore
          this.libraryStepList = response.testCaseStepList;
          this.observableLibraryStepList.next(this.libraryStepList);
        } else {
          if (system != null) {
            this.notificationService.createANotification('There are no Library steps for the system : ' + system, NotificationStyle.Warning);
            this.libraryStepList = null;
            this.observableLibraryStepList.next(this.libraryStepList);
          }
        }
      });
  }

  // DIRTY: convert {FR: FR} style object
  // to Array of string, an iterable
  // waiting for https://github.com/cerberustesting/cerberus-source/issues/2015
  formatCountryList(rawList: any): Array<string> {
    const newArray: string[] = [];
    for (const key in rawList) {
      if (rawList.hasOwnProperty(key)) {
        newArray.push(rawList[key]);
      }
    }
    return newArray;
  }

  // TODO: merge the two getTestCaseList function (with the callback)
  getTestCasesList_withCallback(test: string, callback) {
    this.http.get<TestCaseHeader>(environment.cerberus_api_url + '/ReadTestCase?test=' + test)
      .subscribe((response) => {
        if (response.iTotalRecords > 0) {
          callback(response.contentTable);
        } else {
          if (test != null) {
            this.notificationService.createANotification('There are no TestCase for the Test : ' + test, NotificationStyle.Warning);
            this.testcasesList = null;
            this.observableTestCasesList.next(this.testcasesList);
          }
        }
      });
  }

  // return the "highest" test case ID for a test
  // used for the duplication action
  getLatestTestCaseId(testcaselist: Array<TestCaseHeader>, test: string): string {
    // create an array with only the testCase ID
    const testCasesList = new Array<string>();
    // @ts-ignore
    testcaselist.forEach(tc => {
      testCasesList.push(tc.testCase);
    });
    // get only the testcases with the correct syntax (e.g. 0001A)
    const testCasesWithCorrectSyntaxList: Array<string> = testCasesList.filter(tc => this.isATestCaseIdIsIncremental(tc) === true);
    // get only the numbers of the previous list
    const testCaseIndexList = new Array<number>();
    testCasesWithCorrectSyntaxList.forEach(tc => {
      testCaseIndexList.push(Number(tc.substr(0, tc.length - 1)));
    });
    const maxIndex = Math.max(...testCaseIndexList) + 1;
    // get the lenth of the maxindex (e.g. 22 => 2)
    const maxIndexLength = String(maxIndex).length;
    switch (maxIndexLength) {
      case 1: { return '000' + maxIndex + 'A'; }
      case 2: { return '00' + maxIndex + 'A'; }
      case 3: { return '0' + maxIndex + 'A'; }
      case 4: { return maxIndex + 'A'; }
    }
  }

  // return true if the testcase ID is in the incremental format
  // e.g. 0001A
  isATestCaseIdIsIncremental(testcase: string): boolean {
    // check that the last caracter is 'A'
    if (testcase.substr(testcase.length - 1) === 'A') {
      // remove the last caracter 'A'
      const testcaseWithoutA = testcase.substr(0, testcase.length - 1);
      // check that the previous caracters are numbers
      if (!isNaN(Number(testcaseWithoutA))) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getFromRequest(servlet: string, queryParameters: string, callback) {
    // get data for datatable
    this.http.post<TestCaseHeader>(environment.cerberus_api_url + servlet, queryParameters, httpOptions)
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
    return this.http.get<TestCaseHeader>(query);
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

  deleteTestCase(test: string, testCase: string, callback: (msg: string, status: string) => void) {
    this.http.post<any>(environment.cerberus_api_url + '/DeleteTestCase', 'test=' + encodeURIComponent(test) + '&testCase=' + encodeURIComponent(testCase), httpOptions)
      .subscribe((rep) => callback(rep.message, rep.messageType));
  }

  filtreTestCase(filterTable): Observable<TestCaseHeader> {
    return this.http.post<TestCaseHeader>(environment.cerberus_api_url + '/ReadTestCase', filterTable, httpOptions);
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
  getTestCaseInformations(test: string, testcase: string, callback: (n: TestCaseHeader) => any) {
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

  /** get the latest incremental ID for a test folder */
  getMaxTestCase(test: string): void {
    const url = environment.cerberus_api_url + '/ReadTestCase?test=' + test + '&getMaxTC=true';
    this.http.get<any[]>(url)
      .subscribe(response => {
        // @ts-ignore
        const maxTestCase = response.maxTestCase;
        this.observableMaxTestCaseID.next(maxTestCase);
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
    this.http.get<PropertyValue[]>(url)
      .subscribe((response) => {
        // this.testcase_properties = this.sanitizePropertiesList(response);
        this.testcase_properties = response;
        this.observableTestCaseProperties.next(this.testcase_properties);
      });
  }

  // DIRTY : correct the model mistake
  convertCountriesList(testcaseheader: TestCaseHeader): Array<string> {
    const countriesList = new Array<string>();
    for (const index in testcaseheader.countryList) {
      if (index) {
        countriesList.push(testcaseheader.countryList[index]);
      }
    }
    return countriesList;
  }

  isCountryDefinedForTestCase(testcaseheader: TestCaseHeader, country: string): boolean {
    return this.testcaseheader_countriesList_format.includes(country);
  }

  saveTestCaseHeader(testcaseheader: TestCaseHeader, originalTest, originalTestCase) {
    let data: TestCaseHeader;
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

  refreshStepSort(stepList: Array<Step>): void {
    stepList.forEach((step, index) => {
      const newIndex = this.trueindexPipe.transform(index);
      // console.log("step #"+newIndex+' descripton: '+step.description);
      step.sort = newIndex;
    });
  }

  refreshActionSort(actionList: Array<Action>): void {
    actionList.forEach((action, index) => {
      const newIndex = this.trueindexPipe.transform(index);
      // console.log("action #"+newIndex+' descripton: '+action.description);
      action.sort = newIndex;
    });
  }

  refreshControlSort(controlList: Array<Control>): void {
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
