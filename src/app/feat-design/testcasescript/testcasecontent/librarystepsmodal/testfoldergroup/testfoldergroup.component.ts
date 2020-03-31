import { Component, OnInit, Input } from '@angular/core';
import { Step } from 'src/app/shared/model/back/testcase/step.model';

@Component({
  selector: 'app-testfoldergroup',
  templateUrl: './testfoldergroup.component.html',
  styleUrls: ['./testfoldergroup.component.scss']
})
export class TestfoldergroupComponent {

  /** steps grouped by test folder name */
  @Input('testfoldergroup') testfoldergroup: any;

  /** list of selected steps */
  @Input('selectedSteps') selectedSteps: any[];

  /** position of the test folder group in the array (only used to create HTML id) */
  @Input('testFolderIndex') testFolderIndex: number;

  /** boolean to handle the display of the steps content */
  public showSteps: boolean;

  constructor() { }

  /**
   * add or remove a step to the select steps list
   * @param step step object to add
  */
  toggleStep(step: Step): void {
    if (!this.isStepSelected(step)) {
      this.selectedSteps.push(step);
    } else {
      const index = this.selectedSteps.findIndex(s => s.test === step.test && s.description === step.description);
      this.selectedSteps.splice(index, 1);
    }
  }

  /**
   * return true if a step is already in the selected steps list
   * @param step step object to add
  */
  isStepSelected(step: Step): boolean {
    const res = this.selectedSteps.findIndex(s => s.test === step.test && s.description === step.description);
    if (res !== -1) { return true; } else { return false; }
  }

}
