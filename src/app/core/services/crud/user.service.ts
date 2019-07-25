import { Injectable } from '@angular/core';
import { IBuildRevisionInvariant } from 'src/app/shared/model/buildrevisioninvariant.model';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getReadUser() {
    this.http.get<IBuildRevisionInvariant[]>(AppSettings.API_endpoint + 'ReadUser', { withCredentials: true })
      .subscribe(response => {
            // do nothing. Can get the user information
      });
  }

}
