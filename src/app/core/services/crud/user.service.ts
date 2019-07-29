import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBuildRevisionInvariant } from 'src/app/shared/model/buildrevisioninvariant.model';
import { IUser } from 'src/app/shared/model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // variables
  private user: IUser;

  // observables
  observableAccountLink = new BehaviorSubject<IUser>(this.user);

  getUser() {
    this.http.get<IUser>(environment.cerberus_api_url + '/ReadMyUser')
      .subscribe(response => {
        this.user = response;
        this.observableAccountLink.next(this.user);
      });
  }

}
