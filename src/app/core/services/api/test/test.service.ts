import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TestFolder } from 'src/app/shared/model/back/testfolder/test.model';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../../utils/global.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  /** list of test folders */
  public testFoldersList: Array<TestFolder> = null;

  /** observable for the test folders list */
  public observableTestsList = new BehaviorSubject<TestFolder[]>(this.testFoldersList);

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  /**
   * refresh the test folders list (of the test service)
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
          this.testFoldersList = response.contentTable;
          this.observableTestsList.next(this.testFoldersList);
        }
      });
  }

  /**
   * get the list of test folders from the API
   * @param callback function to use to process the result
  */
  getTestFolders(callback: (testfolders: TestFolder[]) => void, system?: string): void {
    let url = environment.cerberus_api_url + '/ReadTest';
    if (system) { url += '?system=' + system; }
    this.http.get<Array<TestFolder>>(url)
      .toPromise()
      .then((result: any) => {
        const formattedTestFolders = new Array<TestFolder>();
        result.contentTable.forEach(rawTestFolder => {
          formattedTestFolders.push(this.globalService.formatTestFolder(rawTestFolder));
        });
        callback(formattedTestFolders);
      });
  }

  /**
   * create a new test folder
   * @param testfolder the test folder object to create
   */
  createTestFolder(testfolder: TestFolder, callback: (response: any) => void): void {

    // set the url to post
    const url = environment.cerberus_api_url + '/CreateTest';

    // build the data to post
    const formData = this.globalService.toQueryString(testfolder, ['test', 'isActive', 'description']);

    this.http.post<any>(url, formData, environment.httpOptions).subscribe(response => {
      callback(response);
    });
  }

  /**
   * update the content of a test folder
   * @param initialtestoldername the initial name of the test folder
   * @param testfolder the test folder object to update
   */
  updateTestFolder(initialtestoldername: string, testfolder: TestFolder, callback: (response: any) => void): void {

    // set the url to post
    const url = environment.cerberus_api_url + '/UpdateTest';

    // build the data to post
    let formData = this.globalService.toQueryString(testfolder, ['test', 'isActive', 'description']);
    formData += '&originalTest=' + initialtestoldername;

    this.http.post<any>(url, formData, environment.httpOptions).subscribe(response => {
      callback(response);
    });
  }

  /**
   * remove a test folder
   * @param testfolder the name of the test folder to remove
   */
  deleteTestFolder(testfolder: TestFolder, callback: (response: any) => void): void {

    // set the url to post
    const url = environment.cerberus_api_url + '/DeleteTest';

    // build the data to post
    const formData = this.globalService.toQueryString(testfolder, ['test']);

    this.http.post<any>(url, formData, environment.httpOptions).subscribe(response => {
      callback(response);
    });
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
