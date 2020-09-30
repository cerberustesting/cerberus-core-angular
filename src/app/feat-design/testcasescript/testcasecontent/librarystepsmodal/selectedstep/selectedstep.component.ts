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

    this.testCaseService.getStep(this.step.test, this.step.testcase, this.step.stepId, (step: Step) => {
      // add the missing information to this component step
      this.step.toDelete = false;
      this.step.libraryStepTest = step.test;
      this.step.libraryStepTestCase = step.testcase;
      this.step.libraryStepStepId = step.stepId;
      this.step.loop = step.loop;
      this.step.conditionOperator = step.conditionOperator;
      this.step.conditionVal1 = step.conditionVal1;
      this.step.conditionVal2 = step.conditionVal2;
      this.step.conditionVal3 = step.conditionVal3;
      this.step.isExecutionForced = step.isExecutionForced;
      this.step.actions = step.actions;
    });
  }

  /**
  * remove a step from the list of selected steps
  * @param step object to remove
  */
  unselectStep(step: Step): void {
    const index = this.selectedSteps.findIndex(s => s.test === step.test && s.stepId === step.stepId);
    this.selectedSteps.splice(index, 1);
  }

}
