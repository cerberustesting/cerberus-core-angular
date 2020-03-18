import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TestFolder } from 'src/app/shared/model/back/test.model';
import { TestCase, Step, Action, Control } from 'src/app/shared/model/back/testcase.model';
import { TrueindexPipe } from 'src/app/shared/pipes/trueindex.pipe';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../../utils/notification.service';
import { tap } from 'rxjs/operators';
import { NotificationStyle } from '../../utils/notification.model';
import { Invariant } from 'src/app/shared/model/invariants.model';
import { TestService } from '../test/test.service';
import { GlobalService } from '../../utils/global.service';
import { LabelService } from '../label/label.service';
import single_testcase_full_mock from 'src/assets/data/mock/readTC_single_full.json';
import single_testcase_mock from 'src/assets/data/mock/readTC_single.json';

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
export class TestcaseService {

  // list of test folders
  testsList: Array<TestFolder>;

  // list of testcase id corresponding to the previous test folders list
  testcasesList: Array<TestCase>;

  // list of testcase id corresponding to a test folder used for dependencies management
  testCasesList4Dependencies: Array<TestCase>;

  // full testcase object
  testcase: TestCase = null;

  // max id that can be used for a test folder
  maxTestCase: number = null;

  // list of library steps
  libraryStepList: Array<Step> = new Array<Step>();

  // observables
  observableTestsList = new BehaviorSubject<TestFolder[]>(this.testsList);
  observableTestCasesList = new BehaviorSubject<TestCase[]>(this.testcasesList);
  observableTestDataLib = new BehaviorSubject<any[]>(this.testcasesList);
  observableTestCase = new BehaviorSubject<TestCase>(this.testcase);
  observableMaxTestCaseID = new BehaviorSubject<number>(this.maxTestCase);
  observableLibraryStepList = new BehaviorSubject<Step[]>(this.libraryStepList);
  observableTestCasesList4Dependencies = new BehaviorSubject<TestCase[]>(this.testCasesList4Dependencies);

  // boolean
  // TODO: delete?
  refreshTC: boolean;

  constructor(
    private http: HttpClient,
    private trueindexPipe: TrueindexPipe,
    private notificationService: NotificationService,
    private testService: TestService,
    private globalService: GlobalService,
    private labelService: LabelService
  ) {
    this.refreshTC = false;
  }

  /** refresh the test folder list (this one should be used with this test case, not globally) */
  getTestFoldersList() {
    this.http.get<TestFolder[]>(environment.cerberus_api_url + '/ReadTest')
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

  /** return the test cases list for a test folder */
  getTestCasesForATestFolder(test: string) {
    this.http.get<TestCase>(environment.cerberus_api_url + '/ReadTestCase?test=' + test)
      .subscribe(response => {
        if (response) {
          // @ts-ignore
          this.testcasesList = response.contentTable;
          this.observableTestCasesList.next(this.testcasesList);
        }
      });
  }

  /** refresh the test case id list that is used for dependencies management */
  getTestCasesList4Dependencies(test: string) {
    this.http.get<Array<TestCase>>(environment.cerberus_api_url + '/ReadTestCaseV2?test=' + test)
      .subscribe(response => {
        // @ts-ignore
        if (response.iTotalRecords > 0) {
          // @ts-ignore
          this.testCasesList4Dependencies = response.contentTable;
          // @ts-ignore
          this.observableTestCasesList4Dependencies.next(this.testCasesList4Dependencies);
        } else {
          if (test != null) {
            this.notificationService.createANotification('There are no TestCase for the Test : ' + test, NotificationStyle.Warning);
            this.testCasesList4Dependencies = null;
            this.observableTestCasesList4Dependencies.next(this.testCasesList4Dependencies);
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

  // TODO: merge the two getTestCaseList function (with the callback)
  getTestCasesList_withCallback(test: string, callback) {
    this.http.get<TestCase>(environment.cerberus_api_url + '/ReadTestCase?test=' + test)
      .subscribe((response) => {
        // @ts-ignore
        if (response.iTotalRecords > 0) {
          // @ts-ignore
          callback(response.contentTable);
        } else {
          if (test != null) {
            this.testcasesList = null;
            this.observableTestCasesList.next(this.testcasesList);
          }
        }
      });
  }

  // return the "highest" test case ID for a test used for the interaction
  getLatestTestCaseId(testcaselist: Array<TestCase>, test: string): string {
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

  deleteTestCase(test: string, testCase: string, callback: (msg: string, status: string) => void) {
    this.http.post<any>(environment.cerberus_api_url + '/DeleteTestCase', 'test=' + encodeURIComponent(test) + '&testCase=' + encodeURIComponent(testCase), httpOptions)
      .subscribe((rep) => callback(rep.message, rep.messageType));
  }

  /**
  * Gets test case full content
  * @param test
  * @param testcase
  * @returns test case object
  */
  getTestCase(test: string, testcase: string, callback): Promise<TestCase> {
    if (!this.globalService.isNullOrEmpty(test) || !this.globalService.isNullOrEmpty(testcase)) {
      // this.http.get<TestCase>(environment.cerberus_api_url + '/ReadTestCaseV2?test=' + test + '&testCase=' + testcase + '&withStep=true')
      //   .subscribe((response) => {
      //     this.testcase = response;
      //     this.observableTestCase.next(this.testcase);
      //     // refresh the lables hierarchy for this test case
      //     this.labelService.getLabelsfromTestCase(test, testcase);
      //   });
      const promise = new Promise<TestCase>((resolve, reject) => {
        this.http
          .get<TestCase>(environment.cerberus_api_url + '/ReadTestCase?test=' + test + '&testCase=' + testcase + '&withSteps=true')
          .toPromise()
          .then((result: any) => {
            // Success
            // callback(result.contentTable);
            callback(single_testcase_full_mock.contentTable[0]);
            resolve();
          },
            err => {
              // Error
              reject(err);
            }
          );
      });
      return promise;
    }
  }

  /**
  * Gets only test case header information
  * /!\ do not provide script and properties
  * @param test
  * @param testcase
  * @returns test case header object
  */
  getTestCaseHeader(test: string, testcase: string, callback): Promise<TestCase> {
    const promise = new Promise<TestCase>((resolve, reject) => {
      this.http
        .get<TestCase>(environment.cerberus_api_url + '/ReadTestCase?test=' + test + '&testCase=' + testcase)
        .toPromise()
        .then((result: any) => {
          // Success
          // callback(result.contentTable);
          callback(single_testcase_mock.contentTable[0]);
          resolve();
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
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

  selectedTestCaseExist(testcaseid: string, testcases: Array<TestCase>): boolean {
    return testcases.filter(tc => tc.testCase === testcaseid).length > 0;
  }

  // DIRTY : correct the model mistake
  convertCountriesList(testcaseheader: TestCase): Array<string> {
    const countriesList = new Array<string>();
    // @ts-ignore
    for (const index in testcaseheader.countryList) {
      if (index) {
        // @ts-ignore
        countriesList.push(testcaseheader.countryList[index]);
      }
    }
    return countriesList;
  }

  /** return true if the country is selected for the test case */
  isCountryDefinedForTestCase(countries: Array<Invariant>, country: string): boolean {
    const res = countries.find(invariant => invariant.value === country);
    if (res) { return true; } else { return false; }
  }

  saveTestCaseHeader(testcaseheader: TestCase, originalTest, originalTestCase) {
    let data: TestCase;
    data = testcaseheader;
    // add the original test and testcase to the data to send
    // @ts-ignore
    data.originalTest = originalTest;
    // @ts-ignore
    data.originalTestCase = originalTestCase;
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

  /** refresh the sort attribute of each actions (usefull for drag and drop)
   * @param actions list of actions to reorder
   */
  refreshActionsSort(actions: Array<Action>): void {
    actions.forEach((action, index) => {
      const newIndex = this.trueindexPipe.transform(index);
      action.sort = newIndex;
    });
    console.log(actions);
  }

  refreshControlSort(controlList: Array<Control>): void {
    controlList.forEach((control, index) => {
      const newIndex = this.trueindexPipe.transform(index);
      // console.log("control #"+newIndex+' descripton: '+control.description);
      control.sort = newIndex;
    });
  }

  saveTestCase(testcase: TestCase) {
    // TODO
  }

  clearTestCase() {
    this.testcase = null;
    this.observableTestCase.next(this.testcase);
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

}
