import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @class Page Title
 * @classdesc current page title and its DOM id
 */
export class PageTitle {

  /** title value */
  titleValue: string;

  /** id value */
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

  /** current page title */
  private pageTitle: PageTitle;

  /** observable for this page title */
  public observableTitle = new BehaviorSubject<PageTitle>(this.pageTitle);

  constructor() {
    // create an empty page title
    this.pageTitle = new PageTitle('', 'notDefined');
  }

  /**
   * set the title object that will be sent to the curent page component
   * @param newTitle new page title to set
   * @param id HTML id to set for automated testing (optional)
   */
  setTitle(newTitle: string, id?: string): void {
    if (!id) { id = 'notDefined'; }
    const newPageTitle = new PageTitle(newTitle, id);
    this.observableTitle.next(newPageTitle);
  }
}
