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

// mocks
import single_testcase_full_mock from 'src/assets/data/mock/readTC_single_full.json';
import single_testcase_mock from 'src/assets/data/mock/readTC_single.json';

@Injectable({
  providedIn: 'root'
})
export class TestcaseService {

  // list of test folders
  testsList: Array<TestFolder>;

  // list of testcase object corresponding to the previous test folders list
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

  constructor(
    private http: HttpClient,
    private trueindexPipe: TrueindexPipe,
    private notificationService: NotificationService,
    private testService: TestService,
    private globalService: GlobalService,
    private labelService: LabelService
  ) { }

  /**
   * refresh the test folder list, used in testcaseselector component
  */
  refreshTestFolders() {
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

  /**
   * return the test cases list for a test folder, used in testcaseselector component
   * @param test test folder name to filter on
  */
  refreshTestCasesForATestFolder(test: string) {
    this.http.get<TestCase>(environment.cerberus_api_url + '/ReadTestCase?test=' + test)
      .subscribe(response => {
        if (response) {
          // @ts-ignore
          this.testcasesList = response.contentTable;
          this.observableTestCasesList.next(this.testcasesList);
        }
      });
  }

  /**
  * get the list of test cases from the API
  * @param callback function to use to process the result
  * @param test test folder name to filter on (optional)
  */
  getTestCases(callback: (testcases: TestCase[]) => void, test?: string): void {
    let url = environment.cerberus_api_url + '/ReadTestCase';
    // if the optional parameter test is defined
    if (!this.globalService.isNullOrEmpty(test)) {
      // add the test query string
      url += '?test=' + test;
    }
    this.http.get<TestCase[]>(url)
      .toPromise()
      .then((result: any) => {
        callback(result.contentTable);
      });
  }

  /**
   * refresh the test cases list that is used for dependencies management
   * @param test test folder name to filter on
  */
  // TODO : use the refreshTestCases method instead, and remove this one
  refreshTestCasesList4Dependencies(test: string) {
    this.http.get<Array<TestCase>>(environment.cerberus_api_url + '/ReadTestCase?test=' + test)
      .subscribe(response => {
        if (response) {
          // @ts-ignore
          this.testCasesList4Dependencies = response.contentTable;
          this.observableTestCasesList4Dependencies.next(this.testCasesList4Dependencies);
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
    return this.http.post<any>(environment.cerberus_api_url + '/UpdateTestCase', queryString, environment.httpOptions)
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
    return this.http.post<any>(environment.cerberus_api_url + '/CreateTestCase', queryString, environment.httpOptions)
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
    this.http.post<any>(environment.cerberus_api_url + '/DeleteTestCase', 'test=' + encodeURIComponent(test) + '&testCase=' + encodeURIComponent(testCase), environment.httpOptions)
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

  /**
   * get the latest incremental ID for a test folder
   * @param test test folder name
  */
  getMaxTestCase(test: string): void {
    const url = environment.cerberus_api_url + '/ReadTestCase?test=' + test + '&getMaxTC=true';
    this.http.get<any[]>(url)
      .subscribe(response => {
        // @ts-ignore
        const maxTestCase = response.maxTestCase;
        this.observableMaxTestCaseID.next(maxTestCase);
      });
  }

  /**
   * return true if a test case is present in a list
   * @param testcaseid test case id to check
   * @param testcases list of test cases to use
   */
  selectedTestCaseExist(testcaseid: string, testcases: Array<TestCase>): boolean {
    return testcases.filter(tc => tc.testCase === testcaseid).length > 0;
  }

  /**
   * return true if the country is selected for the test case
   * @param countries list of countries to search into
   * @param country country value of the country to check
  */
  isCountryDefinedForTestCase(countries: Invariant[], country: string): boolean {
    const res = countries.find(invariant => invariant.value === country);
    if (res) { return true; } else { return false; }
  }

  /**
   * send test case object to the API
   * @param testcaseheader test case object
   * @param originalTest initial value of test folder
   * @param originalTestCase initial value of test case id
   */
  saveTestCaseHeader(testcaseheader: TestCase, originalTest: string, originalTestCase: string): void {
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

  /** refresh the sort attribute of each steps (usefull for drag and drop)
  * @param steps list of step to reorder
  */
  refreshStepSort(steps: Array<Step>): void {
    steps.forEach((step, index) => {
      const newIndex = this.trueindexPipe.transform(index);
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

  /** refresh the sort attribute of each control (usefull for drag and drop)
  * @param controls list of control to reorder
  */
  refreshControlSort(controls: Array<Control>): void {
    controls.forEach((control, index) => {
      const newIndex = this.trueindexPipe.transform(index);
      // console.log("control #"+newIndex+' descripton: '+control.description);
      control.sort = newIndex;
    });
  }

  saveTestCase(testcase: TestCase) {
    // declare the object to be send to /UpdateTestCaseWithDependencies
    let requestPayload: any;
    // instantiate it
    requestPayload = {};
    // pass the test and test case information
    requestPayload.informationInitialTest = encodeURIComponent(testcase.test);
    requestPayload.informationInitialTestCase = encodeURIComponent(testcase.testCase);
    requestPayload.informationTest = encodeURIComponent(testcase.test);
    requestPayload.informationTestCase = encodeURIComponent(testcase.testCase);
    requestPayload.stepArray = [];
    // fill the step array
    testcase.steps.forEach(step => {
      // create a new step object (because the mapping is different)
      let newStep: any;
      newStep = {};
      newStep.toDelete = step.toDelete || false;
      newStep.test = step.test;
      newStep.testcase = step.testCase;
      newStep.step = step.step;
      newStep.sort = step.sort;
      newStep.description = step.description;
      newStep.useStep = step.useStep;
      newStep.useStepTest = step.useStepTest;
      newStep.useStepTestCase = step.useStepTestCase;
      newStep.useStepStep = step.useStepStep;
      newStep.inLibrary = step.inLibrary;
      newStep.loop = step.loop;
      newStep.conditionOper = step.conditionOper;
      newStep.conditionVal1 = step.conditionVal1;
      newStep.conditionVal2 = step.conditionVal2;
      newStep.conditionVal3 = step.conditionVal3;
      newStep.forceExe = step.forceExe;
      newStep.actionArr = [];
      step.actions.forEach(action => {
        // create a new action object (because the mapping is different)
        let newAction: any;
        newAction = {};
        newAction.toDelete = action.toDelete || false;
        newAction.test = action.test;
        newAction.testcase = action.testCase;
        newAction.step = action.step;
        newAction.sequence = action.sequence;
        newAction.sort = action.sequence;
        newAction.description = action.description;
        newAction.action = action.action;
        // mapping ????
        newAction.object = action.value1;
        // mapping ????
        newAction.property = action.value2;
        newAction.value3 = action.value3;
        newAction.forceExeStatus = action.forceExeStatus;
        newAction.conditionOper = action.conditionOper;
        newAction.conditionVal1 = action.conditionVal1;
        newAction.conditionVal2 = action.conditionVal2;
        newAction.conditionVal3 = action.conditionVal3;
        newAction.screenshotFileName = action.screenshotFilename;
        newAction.controlArr = [];
        action.controls.forEach(control => {
          // create a new control object (because the mapping is different)
          let newControl: any;
          newControl = {};
          newControl.toDelete = control.toDelete || false;
          newControl.test = control.test;
          newControl.testCase = control.testCase;
          newControl.step = control.step;
          newControl.sequence = control.sequence;
          newControl.control = control.control;
          newControl.sort = control.sort;
          newControl.description = control.description;
          newControl.objType = control.objType;
          // mapping ????
          newControl.controlSequence = control.controlSequence;
          newControl.value1 = control.value1;
          newControl.value2 = control.value2;
          newControl.value3 = control.value3;
          newControl.fatal = control.fatal;
          newControl.conditionOper = control.conditionOper;
          newControl.conditionVal1 = control.conditionVal1;
          newControl.conditionVal2 = control.conditionVal2;
          newControl.conditionVal3 = control.conditionVal3;
          newControl.screenshotFileName = control.screenshotFilename;
          newAction.controlArr.push(newControl);
        });
        newStep.actionArr.push(newAction);
      });
      requestPayload.stepArray.push(newStep);
    });
    console.log(requestPayload.stepArray);
    console.log(testcase.properties);
  }

  clearTestCase() {
    this.testcase = null;
    this.observableTestCase.next(this.testcase);
  }

}
