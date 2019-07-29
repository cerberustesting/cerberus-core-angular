import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBuildRevisionInvariant } from 'src/app/shared/model/buildrevisioninvariant.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser() {
    this.http.get<IBuildRevisionInvariant[]>(environment.cerberus_api_url + '/ReadMyUser')
      .subscribe(response => {
        // TODO : feed the variables (to create)
      });
  }

}
