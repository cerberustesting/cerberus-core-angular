import { Component, OnInit, Input } from '@angular/core';
import { Step } from 'src/app/shared/model/back/testcase/step.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';

@Component({
  selector: 'app-selectedstep',
  templateUrl: './selectedstep.component.html',
  styleUrls: ['./selectedstep.component.scss']
})
export class SelectedstepComponent implements OnInit {

  /** @description step object that is selected */
  @Input('step') step: Step;

  /** @description list of selected steps */
  @Input('selectedsteps') selectedSteps: Step[];

  constructor(
    private testCaseService: TestcaseService
  ) { }

  ngOnInit() {

    this.testCaseService.getStep(this.step.test, this.step.testCase, this.step.step, (step: Step) => {
      this.step.toDelete = false;
      this.step.useStep = 'Y';
      this.step.useStepTest = step.test;
      this.step.useStepTestCase = step.testCase;
      this.step.inLibrary = step.inLibrary;
      this.step.loop = step.loop;
      this.step.conditionOper = step.conditionOper;
      this.step.conditionVal1 = step.conditionVal1;
      this.step.conditionVal2 = step.conditionVal2;
      this.step.conditionVal3 = step.conditionVal3;
      this.step.forceExe = step.forceExe;
      this.step.actions = step.actions;
      // add the missing information to that step
      console.log(this.step);
    });
  }

  /**
  * remove a step from the list of selected steps
  * @param step object to remove
  */
  unselectStep(step: Step): void {
    const index = this.selectedSteps.findIndex(s => s.test === step.test && s.description === step.description);
    this.selectedSteps.splice(index, 1);
  }

}
