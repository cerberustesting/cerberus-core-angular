import { Injectable } from '@angular/core';
import { Label } from 'src/app/shared/model/back/label.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
