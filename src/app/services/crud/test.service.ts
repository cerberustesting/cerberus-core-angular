import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITest } from 'src/app/model/test.model';
import { ITestCaseHeader, ITestCase, IStep, IAction, IControl } from 'src/app/model/testcase.model';
import { ILabel, ITestCaseLabel } from 'src/app/model/label.model';
import { IProject } from 'src/app/model/project.model';
import { AppSettings } from 'src/app/app.component';
import { TrueindexPipe } from 'src/app/pipes/trueindex.pipe';

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
  testcase: ITestCase = null;
  //project
  projectsList: Array<IProject> = new Array<IProject>();
  //observables
  observableTestsList = new BehaviorSubject<ITest[]>(this.testsList);
  observableTestCasesList = new BehaviorSubject<ITestCaseHeader[]>(this.testcasesList);
  observableTestCaseLabels = new BehaviorSubject<ILabel[]>(this.testcase_labels);
  observableTestCase = new BehaviorSubject<ITestCase>(this.testcase);
  observableLabels = new BehaviorSubject<ILabel[]>(this.testcase_labels);
  observableProjectsList = new BehaviorSubject<IProject[]>(this.projectsList);
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

  getTestCasesList(test: string) {
    this.http.get<ITestCaseHeader[]>(AppSettings.API_endpoint + '/ReadTestCase?test=' + test)
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
