import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Page Title entity
// store the current page title
// and the DOM id (needed for language independant testing)
export class PageTitle {

  titleValue: string;
  id: string;

  constructor(value: string, id: string) {
    this.titleValue = value;
    this.id = id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleService {

  private pageTitle: PageTitle;
  public observableTitle = new BehaviorSubject<PageTitle>(this.pageTitle);

  constructor() {
    // create an empty page title
    this.pageTitle = new PageTitle('', 'notDefined');
  }

  // method to set the title object
  // that will be sent to the corresponding (page) component
  setTitle(newTitle: string, id?: string): void {
    console.log('setTitle called with : newTitle=' + newTitle + ' & id=' + id);
    if (!id) { id = 'notDefined'; }
    const newPageTitle = new PageTitle(newTitle, id);
    this.observableTitle.next(newPageTitle);
  }
}
