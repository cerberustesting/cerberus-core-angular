import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatalibraryService {

  constructor(private http: HttpClient) { }

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
}
