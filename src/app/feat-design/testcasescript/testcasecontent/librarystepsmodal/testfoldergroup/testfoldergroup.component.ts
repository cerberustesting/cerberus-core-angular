import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-testfoldergroup',
  templateUrl: './testfoldergroup.component.html',
  styleUrls: ['./testfoldergroup.component.scss']
})
export class TestfoldergroupComponent implements OnInit {

  /** steps grouped by test folder name */
  @Input('testfoldergroup') testfoldergroup: any;

  /** list of selected steps */
  @Input('selectedSteps') selectedSteps: any[];

  @Input('testFolderIndex') testFolderIndex: number;

  /** boolean to handle the display of the steps content */
  public showSteps: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleStep(step: any) {
    if (!this.isStepSelected(step)) {
      this.selectedSteps.push(step);
    } else {
      const index = this.selectedSteps.findIndex(s => s.test === step.test && s.description === step.description);
      this.selectedSteps.splice(index, 1);
    }
  }

  isStepSelected(step: any) {
    const res = this.selectedSteps.findIndex(s => s.test === step.test && s.description === step.description);
    if (res !== -1) { return true; } else { return false; }
  }

}
