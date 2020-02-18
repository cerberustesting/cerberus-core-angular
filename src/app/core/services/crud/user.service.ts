import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

        // DIRTY : format the default system list, 
        // waiting for https://github.com/cerberustesting/cerberus-source/issues/2096 to be removed
        this.user.defaultSystem = this.formatDefaultSystemList(this.user.defaultSystem);

        this.observableAccountLink.next(this.user);
      });
  }

  /**
   * format the dirty format of user default system : [\"CERBERUS\",\"US-nouxx\"] to an array of string
   * @params rawList : list of system in the raw format
   */
  formatDefaultSystemList(raw: string): Array<string> {
    const resultArray = new Array<string>();
    // trim left and right, then split with the comma separator
    raw.replace('[\"', '').replace('\"]', '').split('\",\"').forEach(country => { resultArray.push(country); });
    return resultArray;
  }

}
