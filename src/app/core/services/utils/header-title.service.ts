import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleService {

  private title: string;
  public observableTitle = new BehaviorSubject<string>(this.title);

  constructor() {
    this.title = '';
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
    this.observableTitle.next(this.title);
  }
}
