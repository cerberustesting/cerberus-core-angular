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

  // user object
  public user: IUser;

  // observable for the user
  public observableUser = new BehaviorSubject<IUser>(this.user);

  /**
   * fetch the user information in Cerberus DB.
   * Authentication has been done with Keycloak when calling it.
   */
  getUser() {
    this.http.get<IUser>(environment.cerberus_api_url + '/ReadMyUser')
      .subscribe(response => {
        this.user = response;
        // DIRTY : format the default system list,
        // waiting for https://github.com/cerberustesting/cerberus-source/issues/2096 to be fixed
        this.user.defaultSystem = this.formatDefaultSystemList(this.user.defaultSystem);
        this.observableUser.next(this.user);
      });
  }

  /**
   * update the user default systems list
   * * sends the new list to the API
   * * update the observable for all the consumers
   * @param newSystemsList list of system name to add
   */
  updateUserSystemList(newSystemsList: Array<string>) {
    // persist the new systems only if the list not empy
    if (newSystemsList.length !== 0) {
      // store the userId (login from KC standpoint)
      const userId = this.user.login;
      // build the query parameters
      let queryParameters = 'id=' + userId + '&';
      newSystemsList.forEach(system => { queryParameters += 'MySystem=' + encodeURIComponent(system) + '&'; });
      // remove the last '&'
      queryParameters = queryParameters.slice(0, queryParameters.length - 1);
      // perform the call WITHOUT refreshing any observable
      this.http.get<Array<string>>(environment.cerberus_api_url + '/UpdateMyUserSystem?' + queryParameters)
        .subscribe(res => { });
      // TODO: catch HTTP errors
      this.user.defaultSystem = newSystemsList;
      this.observableUser.next(this.user);
    }
  }

  /**
   * format the raw user default system : [\"CERBERUS\",\"US-nouxx\"] to an array of string
   * @params rawList : list of system in the raw format
   */
  formatDefaultSystemList(raw: string): Array<string> {
    const resultArray = new Array<string>();
    // trim left and right, then split with the comma separator
    raw.replace('[\"', '').replace('\"]', '').split('\",\"').forEach(country => { resultArray.push(country); });
    return resultArray;
  }

}
