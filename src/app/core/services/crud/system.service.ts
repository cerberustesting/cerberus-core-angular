import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IBuildRevisionInvariant } from 'src/app/shared/model/buildrevisioninvariant.model';
import { ILabel } from 'src/app/shared/model/label.model';
import { IApplication } from 'src/app/shared/model/application.model';
import { environment } from 'src/environments/environment';
import { InvariantsService } from './invariants.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private sprints: Array<IBuildRevisionInvariant> = new Array<IBuildRevisionInvariant>();
  private revs: Array<IBuildRevisionInvariant> = new Array<IBuildRevisionInvariant>();
  private labels: Array<ILabel> = new Array<ILabel>();
  private labelsHierarchy: Array<any>;
  private applicationsList: Array<IApplication> = new Array<IApplication>();
  private application: IApplication;

  observableSprints = new BehaviorSubject<IBuildRevisionInvariant[]>(this.sprints);
  observableRevs = new BehaviorSubject<IBuildRevisionInvariant[]>(this.revs);
  observableLabelsList = new BehaviorSubject<ILabel[]>(this.labels);
  observableApplicationList = new BehaviorSubject<IApplication[]>(this.applicationsList);
  observableApplication = new BehaviorSubject<IApplication>(this.application);
  observableLabelsHierarchyList = new BehaviorSubject<any>(this.labelsHierarchy);

  constructor(private http: HttpClient, private invariantsService: InvariantsService) { }

  getSprintsFromSystem(system: string) {
    this.http.get<IBuildRevisionInvariant[]>(environment.cerberus_api_url + '/ReadBuildRevisionInvariant?system=' + system + '&level=1')
      .subscribe(response => {
        this.sprints = response;
        // @ts-ignore
        this.sprints = this.sprints.contentTable
        this.observableSprints.next(this.sprints);
      });
  }

  getRevFromSystem(system: string) {
    this.http.get<IBuildRevisionInvariant[]>(environment.cerberus_api_url + '/ReadBuildRevisionInvariant?system=' + system + '&level=2')
      .subscribe(response => {
        this.revs = response;
        // @ts-ignore
        this.revs = this.revs.contentTable
        this.observableRevs.next(this.revs);
      });
  }

  getLabelsFromSystem(system: string) {
    this.http.get<ILabel[]>(environment.cerberus_api_url + '/ReadLabel?system=' + system)
      .subscribe(response => {
        this.labels = response;
        // @ts-ignore
        this.labels = this.labels.contentTable
        for (var index in this.labels) {
          // DIRTY: delete the display property in JSON object
          // @ts-ignore
          delete this.labels[index].display;
        }
        this.observableLabelsList.next(this.labels);
      });
  }

  getLabelsHierarchyFromSystem(system: string, test: string, testCase: string, ) {
    this.http.get<any>(environment.cerberus_api_url + '/ReadLabel?system=' + system + '&withHierarchy=true&isSelectable=Y&testSelect=' + 
    encodeURIComponent(test) + '&testCaseSelect=' + encodeURIComponent(testCase))
      .subscribe(response => {
        // @ts-ignore
        this.labelsHierarchy = response.labelHierarchy
        this.observableLabelsHierarchyList.next(this.labelsHierarchy);
      });
  }

  getLabelFromId(labelid: number) {
    return this.labels.find(x => x.id === labelid);
  }

  filterLabels(labellist: ILabel[], type: string) {
    return labellist.filter(labellist => labellist.type === type);
  }

  getApplicationList() {
    this.applicationsList = [];
    for (let system of this.invariantsService.selectedSystemsList) {
      this.http.get<IApplication[]>(environment.cerberus_api_url + '/ReadApplication?system='+system.value)
      .subscribe(response => {
        console.log(response);
        // @ts-ignore
        this.applicationsList = this.applicationsList.concat(response.contentTable);
        // @ts-ignore
        // this.applicationsList = this.applicationsList.contentTable;
        this.observableApplicationList.next(this.applicationsList);
        console.log(this.applicationsList);
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
      })
  }

}
