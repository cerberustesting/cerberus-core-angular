import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IBuildRevisionInvariant } from 'src/app/shared/model/buildrevisioninvariant.model';
import { Label } from 'src/app/shared/model/back/label.model';
import { IApplication } from 'src/app/shared/model/application.model';
import { environment } from 'src/environments/environment';
import { InvariantsService } from './invariants.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private sprints: Array<IBuildRevisionInvariant> = new Array<IBuildRevisionInvariant>();
  private revs: Array<IBuildRevisionInvariant> = new Array<IBuildRevisionInvariant>();
  private labels: Array<Label> = new Array<Label>();
  private labelsHierarchy: Array<any>;
  private applicationsList: Array<IApplication> = new Array<IApplication>();
  private application: IApplication;

  observableSprints = new BehaviorSubject<IBuildRevisionInvariant[]>(this.sprints);
  observableRevs = new BehaviorSubject<IBuildRevisionInvariant[]>(this.revs);
  observableLabelsList = new BehaviorSubject<Label[]>(this.labels);
  observableApplicationList = new BehaviorSubject<IApplication[]>(this.applicationsList);
  observableApplication = new BehaviorSubject<IApplication>(this.application);
  observableLabelsHierarchyList = new BehaviorSubject<any>(this.labelsHierarchy);

  constructor(private http: HttpClient, private invariantsService: InvariantsService, private userService: UserService) { }

  getSprintsFromSystem(system: string) {
    this.http.get<IBuildRevisionInvariant[]>(environment.cerberus_api_url + '/ReadBuildRevisionInvariant?system=' + system + '&level=1')
      .subscribe(response => {
        // @ts-ignore
        this.sprints = response.contentTable;
        this.observableSprints.next(this.sprints);
      });
  }

  getRevFromSystem(system: string) {
    this.http.get<IBuildRevisionInvariant[]>(environment.cerberus_api_url + '/ReadBuildRevisionInvariant?system=' + system + '&level=2')
      .subscribe(response => {
        this.revs = response;
        // @ts-ignore
        this.revs = this.revs.contentTable;
        this.observableRevs.next(this.revs);
      });
  }

  getLabelsFromSystem(system: string) {
    this.http.get<Label[]>(environment.cerberus_api_url + '/ReadLabel?system=' + system)
      .subscribe(response => {
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

  getLabelsHierarchyFromSystem(system: string, test: string, testCase: string, ) {
    this.http.get<any>(environment.cerberus_api_url + '/ReadLabel?system=' + system + '&withHierarchy=true&isSelectable=Y&testSelect=' +
      encodeURIComponent(test) + '&testCaseSelect=' + encodeURIComponent(testCase))
      .subscribe(response => {
        // @ts-ignore
        this.labelsHierarchy = response.labelHierarchy;
        this.observableLabelsHierarchyList.next(this.labelsHierarchy);
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
  getApplicationList() {
    this.applicationsList = [];
    // for each selected system, gather the application list
    for (const system of this.userService.user.defaultSystem) {
      this.http.get<IApplication[]>(environment.cerberus_api_url + '/ReadApplication?system=' + system)
        .subscribe(response => {
          // @ts-ignore
          this.applicationsList = this.applicationsList.concat(response.contentTable);
          // @ts-ignore
          this.observableApplicationList.next(this.applicationsList);
        });
    }

  }

  getApplication(application: string) {
    this.http.get<IApplication>(environment.cerberus_api_url + '/ReadApplication?application=' + application)
      .subscribe(response => {
        this.application = response;
        // @ts-ignore
        this.application = this.application.contentTable;
        this.observableApplication.next(this.application);
      });
  }

}
