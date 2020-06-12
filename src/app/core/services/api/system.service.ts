import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { BuildRevisionDefinition } from 'src/app/shared/model/buildrevisioninvariant.model';
import { Label } from 'src/app/shared/model/back/testcase/label.model';
import { Application } from 'src/app/shared/model/back/application/application.model';
import { environment } from 'src/environments/environment';
import { InvariantsService } from './invariants.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private sprints: Array<BuildRevisionDefinition> = new Array<BuildRevisionDefinition>();
  private revs: Array<BuildRevisionDefinition> = new Array<BuildRevisionDefinition>();
  private labels: Array<Label> = new Array<Label>();
  private labelsHierarchy: Array<any>;
  private applicationsList: Array<Application> = new Array<Application>();
  private application: Application;

  observableSprints = new BehaviorSubject<BuildRevisionDefinition[]>(this.sprints);
  observableRevs = new BehaviorSubject<BuildRevisionDefinition[]>(this.revs);
  observableLabelsList = new BehaviorSubject<Label[]>(this.labels);
  observableApplicationList = new BehaviorSubject<Application[]>(this.applicationsList);
  observableApplication = new BehaviorSubject<Application>(this.application);
  observableLabelsHierarchyList = new BehaviorSubject<any>(this.labelsHierarchy);

  constructor(private http: HttpClient, private invariantsService: InvariantsService, private userService: UserService) { }

  getSprintsFromSystem(system: string) {
    this.http.get<BuildRevisionDefinition[]>(environment.cerberus_api_url + '/ReadBuildRevisionInvariant?system=' + system + '&level=1')
      .subscribe(response => {
        // @ts-ignore
        this.sprints = response.contentTable;
        this.observableSprints.next(this.sprints);
      });
  }

  getRevFromSystem(system: string) {
    this.http.get<BuildRevisionDefinition[]>(environment.cerberus_api_url + '/ReadBuildRevisionInvariant?system=' + system + '&level=2')
      .subscribe(response => {
        this.revs = response;
        // @ts-ignore
        this.revs = this.revs.contentTable;
        this.observableRevs.next(this.revs);
      });
  }

  getLabelsFromSystem(system?: string) {
    let url = environment.cerberus_api_url + '/ReadLabel';
    // if the system argument is defined, filter add it accordingly to the url
    if (system) { url += '?system = ' + system; }
    this.http.get<Label[]>(url).subscribe(response => {
      this.labels = response;
      // @ts-ignore
      this.labels = this.labels.contentTable;
      for (const index in this.labels) {
        if (index) {
          // DIRTY: delete the display property in JSON object
          // @ts-ignore
          delete this.labels[index].display;
        }
      }
      this.observableLabelsList.next(this.labels);
    });
  }

  /**
   * return a labels hierarchy for a single system
   * @param system name of the system to filter on
   * @param callback function returning the result
   * @param test name of the test folder to filter on
   * @param testCase id of the test case to filter on
   */
  getLabelsHierarchyFromSystem(system: string, callback: (labels: any) => void, test?: string, testCase?: string): void {
    // build the url according to the arguments
    let url = environment.cerberus_api_url + '/ReadLabel?system=' + system + '&withHierarchy=true&isSelectable=Y';
    if (test && testCase) {
      url += '&testSelect=' + encodeURIComponent(test) + '&testCaseSelect=' + encodeURIComponent(testCase);
    }
    // HTTP get to this url
    this.http.get<any>(url)
      .subscribe(response => {
        // @ts-ignore
        this.labelsHierarchy = response.labelHierarchy;
        callback(this.labelsHierarchy);
      });
  }

  getLabelFromId(labelid: number) {
    return this.labels.find(x => x.id === labelid);
  }

  filterLabels(labellist: Label[], type: string) {
    return labellist.filter(label => label.type === type);
  }

  /**
   * refresh the list of application
   * WARNING : need the user variable to be defined to access his allowed systems
   */

  /**
   * returns a list of applications
   * @param callback function to get the result
   * @param systemName (optional) system name to filter on
   * @param userSystems (optional) current system of the user
   * @param fetchAll (optional) flag to set if no system filtering shoud be done
   */
  getApplicationList(callback: (applications: Application[]) => void, systemName?: string, userSystems?: string[], fetchAll?: boolean) {
    // create the url
    let url = environment.cerberus_api_url + '/ReadApplication';
    // if the fetch all argument is provided
    if (fetchAll) {
      // use the url as is.
    } else if (systemName) {
      // if a system name is provided, use it to filter the applications
      url += '?system=' + systemName;
    } else if (userSystems) {
      // use the user's system(s) otherwise
      url += '?';
      // build the url adding all systems
      userSystems.forEach((system, index) => {
        if (index !== 0) {
          url += '&';
        }
        url += 'system=' + system;
      });
    }
    // if the fetch all flag
    this.http.get<Application[]>(url)
      .subscribe(response => {
        // return the content
        // @ts-ignore
        callback(response.contentTable);
      });
  }

  getApplication(application: string) {
    this.http.get<Application>(environment.cerberus_api_url + '/ReadApplication?application=' + application)
      .subscribe(response => {
        this.application = response;
        // @ts-ignore
        this.application = this.application.contentTable;
        this.observableApplication.next(this.application);
      });
  }

}
