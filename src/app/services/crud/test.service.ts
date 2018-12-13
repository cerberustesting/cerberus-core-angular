import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITest } from 'src/app/model/test.model';
import { ITestCaseHeader, ITestCase } from 'src/app/model/testcase.model';
import { ILabel, ITestCaseLabel } from 'src/app/model/label.model';
import { IProject } from 'src/app/model/project.model';

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

  private testsList: Array<ITest> = new Array<ITest>();
  private testcasesList: Array<ITestCaseHeader> = new Array<ITestCaseHeader>();
  private testcase_labels: Array<ILabel> = new Array<ILabel>();
  private testcase: ITestCase = null;
  //project
  private projectsList: Array<IProject>;
  //observables
  observableTestsList: any;
  observableTestCasesList: any;
  observableTestCaseLabels: any;
  observableTestCase: any;
  observableLabels: any;
  observableProjectsList = new BehaviorSubject<IProject[]>(this.projectsList);

  constructor(private http: HttpClient) {
    this.observableTestsList = new BehaviorSubject<ITest[]>(this.testsList);
    this.observableTestCasesList = new BehaviorSubject<ITestCaseHeader[]>(this.testcasesList);
    this.observableTestCase = new BehaviorSubject<ITestCase>(this.testcase);
    this.observableTestCaseLabels = new BehaviorSubject<ILabel[]>(this.testcase_labels);
    this.observableLabels = new BehaviorSubject<ILabel[]>(this.testcase_labels);
  }

  getTests() {
    this.http.get<ITest[]>('../../../assets/tests.json')
      .subscribe(response => {
        // @ts-ignore
        this.testsList = response.contentTable;
        this.refreshTestsList();
      })
  }

  getTestCasesByTest(test: string) {
    this.http.get<ITestCaseHeader[]>('http://localhost:8080/Cerberus-3.8-SNAPSHOT/ReadTestCase?test=' + test)
      .subscribe((response) => {
        // @ts-ignore
        if (response.iTotalRecords == 0) {
          this.testcasesList = null;
          this.refreshTestCasesList();
        } else {
          // @ts-ignore
          this.testcasesList = response.contentTable;
          this.refreshTestCasesList();
        }
      })
  }

  getTestCase(test: string, testcase: string) {
    var url = 'http://localhost:8080/Cerberus-3.8-SNAPSHOT/ReadTestCase?test=' + test + '&testCase=' + testcase + '&withStep=true';
    if (test == null || testcase == null) {
      this.testcase = null;
    } else {
      this.http.get<ITestCase>(url)
        .subscribe((response) => {
          this.testcase = response;
          this.refreshTestCase();
          this.getLabelsfromTestCase(test, testcase);
        })
    }
  }

  getLabelsfromTestCase(test: string, testcase: string) {
    var url = 'http://localhost:8080/Cerberus-3.8-SNAPSHOT/ReadTestCaseLabel?test=' + test + '&testcase=' + testcase
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

  updateTestCase(testcaseheader: ITestCaseHeader, originalTest, originalTestCase) {
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

  refreshTestsList() {
    this.observableTestsList.next(this.testsList);
  }

  refreshTestCasesList() {
    this.observableTestCasesList.next(this.testcasesList);
  }

  refreshTestCase() {
    this.observableTestCase.next(this.testcase);
  }

  cleanTestCase() {
    this.testcase = null;
    this.refreshTestCase();
  }

  getProjectsList() {
    this.http.get<IProject[]>('http://localhost:8080/Cerberus-3.8-SNAPSHOT/ReadProject')
      .subscribe(response => {
        this.projectsList = response;
        // @ts-ignore
        this.projectsList = this.projectsList.contentTable
        this.observableProjectsList.next(this.projectsList);
      });
  }

}
