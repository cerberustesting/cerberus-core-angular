import { Injectable } from '@angular/core';
import { ITag } from 'src/app/model/reporting.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AppSettings } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  // variables
  private tagsList: Array<ITag>;
  // observables
  observableTagsList = new BehaviorSubject<ITag[]>(this.tagsList);

  constructor(private http: HttpClient) { }

  getTagList() {
    this.http.get<ITag[]>(AppSettings.API_endpoint + '/ReadTag?iSortCol_0=0&sSortDir_0=desc&sColumns=id,tag,campaign,description')
      .subscribe(response => {
        // @ts-ignore
        this.tagsList = response.contentTable;
        this.observableTagsList.next(this.tagsList);
      })
  }

  tagExists(tag: string) {
    if (tag != null) { return this.tagsList.filter(t => t.tag === tag).length > 0; }
    else { return false; }
  }

  findTag(tag: string): ITag{
    return this.tagsList.find(t => t.tag === tag);
  }
}
