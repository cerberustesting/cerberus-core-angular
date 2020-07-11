import { Injectable } from '@angular/core';
import { Label } from 'src/app/shared/model/back/testcase/label.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { CRUD } from 'src/app/shared/model/front/utils.model';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private labels: Array<Label>;

  private observableLabels = new BehaviorSubject<Label[]>(this.labels);

  constructor(private http: HttpClient) {
    this.labels = undefined;
  }

  /** refresh the labels hierarchy corresponding to a test case */
  getLabelsfromTestCase(test: string, testcase: string) {
    const url = environment.cerberus_api_url + '/ReadTestCaseLabel?test=' + test + '&testcase=' + testcase;
    this.http.get<Label[]>(url)
      .subscribe((response) => {
        // @ts-ignore
        this.labels = response.contentTable;
        this.observableLabels.next(this.labels);
      });
  }

  /**
   * add/remove a list of labels to/from a test case
   * @param labels list of labels to add/remove
   * @param testcases list of testcases to add or remove the labels to
   * @param method method to use (Update or Delete)
   * @param callback function retuning the api response
   */
  massUpdateTestCaseLabels(labels: Label[], testcases: TestCase[], method: CRUD, callback): void {
    let uri = '';
    if (method === CRUD.Update) {
      uri = '/CreateTestCaseLabel';
    } else if (method === CRUD.Delete) {
      uri = '/DeleteTestCaseLabel';
    } else {
      console.error('Internal error, please open an issue on github : https://github.com/cerberustesting/cerberus-angular/issues/new?assignees=&labels=bug&template=bug_report.md');
    }
    const url = environment.cerberus_api_url + uri;
    // build the formData with duplicate keys https://github.com/cerberustesting/cerberus-source/issues/2146
    let formData = '';
    testcases.forEach(tc => {
      formData += '&test=' + tc.test + '&testcase=' + tc.testCase;
    });
    labels.forEach(label => {
      formData += '&labelid=' + label.id;
    });
    this.http.post<any>(url, formData, environment.httpOptions).subscribe(rep => {
      callback(rep);
    });

  }

}
