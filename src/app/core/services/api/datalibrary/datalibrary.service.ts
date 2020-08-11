import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../../utils/global.service';
import { DataLibrary } from 'src/app/shared/model/back/datalibrary/datalibrary.model';

@Injectable({
  providedIn: 'root'
})
export class DatalibraryService {

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

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
    this.http.post<any>(environment.cerberus_api_url + '/DeleteTestDataLib', 'testdatalibid=' + id, environment.httpOptions)
      .subscribe((rep) => callback());
  }

  /**
   * fetch a list of data libraries that match the criterias, can return an empty array
   * @param name name to search for
   * @param limit on the number of results
   * @param like search for exact match?
   */
  getDataLibraries(name: string, limit: number, like: boolean, callback: (datalibraries: DataLibrary[]) => void) {
    let url = environment.cerberus_api_url + '/ReadTestDataLib?name=' + name;
    // add filtering query strings parameters
    url += '&limit=' + limit.toString();
    url += '&like=' + this.globalService.toCerberusString(like);
    this.http.get<any>(url, environment.httpOptions).subscribe(response => {
      callback(response.contentTable);
    });
  }
}
