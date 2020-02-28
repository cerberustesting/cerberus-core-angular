import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  constructor(private http: HttpClient) { }

  addToExecutionQueue (formData: FormData) {
    this.http.post(environment.cerberus_api_url + '/AddToExecutionQueueV003', formData).subscribe(
        data  => {
          console.log('POST Request is successful ', data);
        },
        error  => {
          console.log('Error', error);
        });
  }
}
