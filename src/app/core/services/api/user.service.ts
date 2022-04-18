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
    let _this = this;
    this.http.get<User>(environment.cerberus_api_url + '/ReadMyUser')
      .subscribe(response => {
        _this.user = response;
        // DIRTY : format the default system list,
        // waiting for https://github.com/cerberustesting/cerberus-source/issues/2096 to be fixed
        _this.user.defaultSystem = this.formatDefaultSystemList(this.user.defaultSystem);

        let customColumns = [];

        if (response.userPreferences) {
          let userPref = _this.parseJSON(response.userPreferences);

          // if the userPreferences format is not supported: abort
          if(!userPref){
            console.log("No user preferences loaded");
            return;
          }

          _this.user.userPreferences = {}; // clean

          Object.keys(userPref).forEach(function(key) {
            let currentTable = _this.parseJSON(userPref[key]);//['DataTables_' + settings.sInstance + '_' + location.pathname];
            /*
            if(currentTable && currentTable.hasOwnProperty("columns") ){
              let columns = _this.parseJSON(currentTable)["columns"]
              for (let i = 0; i < columns.length; i++) {
                  let currentSearch = columns[i]["search"]["search"];
                  let search = currentSearch.substr(1, currentSearch.length - 2);
                  search = search.split("|");
                  customColumns.push(search);
              }
            }
            */
            _this.user.userPreferences[key] = _this.parseJSON(currentTable);
          });
        }

        _this.observableUser.next(_this.user);
      });
  }
  /**
   * handle json 
   * @param text json or string value
   * @returns json or null when error
   */
  parseJSON(text: any): JSON {
    if (typeof text!=="string"){
        return text;
    }
    try{
        var json = JSON.parse(text);
        return json;
    }
    catch (error){
        return null;
    }
  }

  /**
   * update user preferences automatically
   * when something is changed on table (columns, filters or search)
   */
  updateUserPreferences() {
    let preferences = JSON.stringify(this.user.userPreferences);
    let url = environment.cerberus_api_url + '/UpdateMyUser';
    this.http.post<any>(url, "column=userPreferences&value="+encodeURIComponent(preferences), environment.httpOptions)
    .subscribe(response => {});
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

}
