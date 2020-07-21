import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/model/back/user/user.model';
import { BehaviorSubject } from 'rxjs';
import { UserGroup } from 'src/app/shared/model/front/utils.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // user object
  public user: User;

  // observable for the user
  public observableUser = new BehaviorSubject<User>(this.user);

  /**
   * refresh the user information and populate the observable
   * Authentication has been done with Keycloak when calling it.
   */
  refreshUser(): void {
    this.http.get<User>(environment.cerberus_api_url + '/ReadMyUser')
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
   * return true is a user is authorized for a group
   * @param user user object
   * @param group name of the group to check
   */
  isUserAuthorizedForGroup(user: User, group: UserGroup): boolean {
    return user.group.includes(group);
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
