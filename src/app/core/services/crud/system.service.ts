import { Injectable } from '@angular/core';
import { IBuildRevisionInvariant } from 'src/app/shared/model/buildrevisioninvariant.model';
import { ILabel } from 'src/app/shared/model/label.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IApplication } from 'src/app/shared/model/application.model';
import { AppSettings } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  // URL
  private _url: string;

  private sprints: Array<IBuildRevisionInvariant> = new Array<IBuildRevisionInvariant>();
  private revs: Array<IBuildRevisionInvariant> = new Array<IBuildRevisionInvariant>();
  private labels: Array<ILabel> = new Array<ILabel>();
  private applicationsList: Array<IApplication> = new Array<IApplication>();
  private application: IApplication;

  observableSprints = new BehaviorSubject<IBuildRevisionInvariant[]>(this.sprints);
  observableRevs = new BehaviorSubject<IBuildRevisionInvariant[]>(this.revs);
  observableLabelsList = new BehaviorSubject<ILabel[]>(this.labels);
  observableApplicationList = new BehaviorSubject<IApplication[]>(this.applicationsList);
  observableApplication = new BehaviorSubject<IApplication>(this.application);

  constructor(private http: HttpClient) { }

  getSprintsFromSystem(system: string) {
    this.http.get<IBuildRevisionInvariant[]>(AppSettings.API_endpoint + '/ReadBuildRevisionInvariant?system=' + system + '&level=1')
      .subscribe(response => {
        this.sprints = response;
        // @ts-ignore
        this.sprints = this.sprints.contentTable
        this.observableSprints.next(this.sprints);
      });
  }

  getRevFromSystem(system: string) {
    this.http.get<IBuildRevisionInvariant[]>(AppSettings.API_endpoint + '/ReadBuildRevisionInvariant?system=' + system + '&level=2')
      .subscribe(response => {
        this.revs = response;
        // @ts-ignore
        this.revs = this.revs.contentTable
        this.observableRevs.next(this.revs);
      });
  }

  getLabelsFromSystem(system: string) {
    this.http.get<ILabel[]>(AppSettings.API_endpoint + '/ReadLabel?system=' + system)
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

  getLabelFromId(labelid: number) {
    return this.labels.find(x => x.id === labelid);
  }

  filterLabels(labellist: ILabel[], type: string) {
    return labellist.filter(labellist => labellist.type === type);
  }

  getApplicationList() {
    this.http.get<IApplication[]>(AppSettings.API_endpoint + '/ReadApplication')
      .subscribe(response => {
        this.applicationsList = response;
        // @ts-ignore
        this.applicationsList = this.applicationsList.contentTable;
        this.observableApplicationList.next(this.applicationsList);
      })
  }

  getApplication(application: string) {
    this.http.get<IApplication>(AppSettings.API_endpoint + '/ReadApplication?application=' + application)
      .subscribe(response => {
        this.application = response;
        // @ts-ignore
        this.application = this.application.contentTable;
        this.observableApplication.next(this.application);
      })
  }

}
