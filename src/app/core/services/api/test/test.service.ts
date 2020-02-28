import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TestFolder } from 'src/app/shared/model/back/test.model';
import { TrueindexPipe } from 'src/app/shared/pipes/trueindex.pipe';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../../utils/notification.service';

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

  /** list of test folders */
  public testsList: Array<TestFolder> = new Array<TestFolder>();

  /** observable for the test folders list */
  public observableTestsList = new BehaviorSubject<TestFolder[]>(this.testsList);

  constructor(
    private http: HttpClient,
    private trueindexPipe: TrueindexPipe,
    private notificationService: NotificationService
  ) {
  }

  /**
   * refresh the test folders list
   * @param system (optional) name of a system to filter on
   */
  getTestFoldersList(system?: string): void {
    let url = environment.cerberus_api_url + '/ReadTest';
    // if a system is passed, use it 4 filtering
    if (system) {
      url += '?system=' + system;
    }
    this.http.get<TestFolder[]>(url)
      .subscribe(response => {
        // @ts-ignore
        if (response.iTotalRecords > 0) {
          // @ts-ignore
          this.testsList = response.contentTable;
          this.observableTestsList.next(this.testsList);
        } else {
          // empty the array
          this.testsList = new Array<TestFolder>();
          this.observableTestsList.next(this.testsList);
        }
      });
  }

  /**
   * update the content of a test folder
   * @param testfoldername the initial name of the test folder
   * @param testfolder the test folder object to update
   */
  updateTestFolder(testfoldername: string, testfolder: TestFolder): void {
    // TODO
  }

  /**
   * remove a test folder
   * @param testfoldername the name of the test folder to remove
   */
  deleteTestFolder(testfoldername: string) {
    // TODO
  }

}
