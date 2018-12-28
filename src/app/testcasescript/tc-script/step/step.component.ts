import { Component, OnInit, Input } from '@angular/core';
import { IStep } from 'src/app/model/testcase.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { CrossReference } from 'src/app/model/crossreference.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { CrossreferenceService } from 'src/app/services/utils/crossreference.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input('step') step: IStep;
  showedStepHeader: boolean;
  // private invariants
  private inv_condition_oper: Array<IInvariant>;
  private inv_step_loop: Array<IInvariant>;
  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ConditionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ConditionValue;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService
  ) { }

  ngOnInit() {
    this.showedStepHeader = false;
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.InvariantService.observableStepLoopList.subscribe(response => { this.inv_step_loop = response; });
  }

  hasConditionCrossReference(condition: string): boolean { return this.CrossReferenceService.hasConditionCrossReference(condition); }
  findConditionCrossReference(condition: string): CrossReference { return this.CrossReferenceService.findConditionCrossReference(condition); }

  saveActiveStep() {
    console.log(this.step);
  }

}
