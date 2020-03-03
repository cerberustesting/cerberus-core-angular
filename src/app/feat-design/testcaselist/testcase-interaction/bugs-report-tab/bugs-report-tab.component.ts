import { Component, OnInit, Input } from '@angular/core';
import { Bug } from 'src/app/shared/model/back/testcase.model';

@Component({
  selector: 'app-bugs-report-tab',
  templateUrl: './bugs-report-tab.component.html',
  styleUrls: ['./bugs-report-tab.component.scss']
})
export class BugsReportTabComponent implements OnInit {

  /** list of selected bugs for this test case */
  @Input('bugs') bugs: Array<Bug>;

  constructor() { }

  ngOnInit() {
  }

  /** return true if the bug has a value for bug ID */
  isBugIdEmpty(bug: Bug): boolean {
    if (bug.id === '' || bug.id === null || bug.id === undefined) {
      return true;
    } else {
      return false;
    }
  }

  redirectToBug(): void {
    // TODO
    console.log('TODO');
  }

  /** add a new empty bug to the bug list */
  addBug(): void {
    const newBug = new Bug();
    this.bugs.push(newBug);
  }

  // TODO : check any bug.id change to block duplicate bug id
  // TODO : maybe refresh the labels hierarchy at every component

}
