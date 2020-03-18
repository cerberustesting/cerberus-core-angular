import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TestFolder } from 'src/app/shared/model/back/test.model';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../../utils/global.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  /** list of test folders */
  public testsList: Array<TestFolder>;

  /** observable for the test folders list */
  public observableTestsList = new BehaviorSubject<TestFolder[]>(this.testsList);

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  /**
   * refresh the test folders list
   * @param system (optional) name of a system to filter on
   */
  refreshTestFolders(system?: string): void {
    let url = environment.cerberus_api_url + '/ReadTest';
    // if a system is passed, use it 4 filtering
    if (system) { url += '?system=' + system; }
    this.http.get<TestFolder[]>(url)
      .subscribe(response => {
        if (response) {
          // @ts-ignore
          this.testsList = response.contentTable;
          this.observableTestsList.next(this.testsList);
        }
      });
  }

  /**
   * get the list of test folders from the API
   * @param callback function to use to process the result
  */
  getTestFolders(callback: (testfolders: TestFolder[]) => void): void {
    const url = environment.cerberus_api_url + '/ReadTest';
    this.http.get<Array<TestFolder>>(url)
      .toPromise()
      .then((result: any) => {
        callback(result.contentTable);
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
  deleteTestFolder(testfoldername: string): void {
    // TODO
  }

  /**
   * return true if the test is found in the test folders list
   * @param testfoldername test folder name to search for
   * @param testfolderslist list of test folders to search in
   */
  testExists(testfoldername: string, testfolderslist: Array<TestFolder>): boolean {
    const search = testfolderslist.find(t => t.test === testfoldername);
    if (search) { return true; } else { return false; }
  }

}
