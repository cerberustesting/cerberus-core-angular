import { Component, OnInit, Input } from '@angular/core';
import { Invariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { Step } from 'src/app/shared/model/back/testcase.model';
import { ICrossReference, CrossreferenceService } from 'src/app/core/services/utils/crossreference.service';

@Component({
  selector: 'app-step-settings',
  templateUrl: './step-settings.component.html',
  styleUrls: ['./step-settings.component.scss']
})
export class StepSettingsComponent implements OnInit {

  /** control object */
  @Input('step') step: Step;

  /** readonly mode to disabled all fields */
  @Input('readonly') readonly: boolean;

  /** list of condition operators (private invariants) */
  public conditionsOperators: Array<Invariant>;

  /** list of loop operators (private invariants) */
  public stepLoopOperators: Array<Invariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService
  ) { }

  ngOnInit() {
    // get the invariants
    this.InvariantService.observableConditionOperList.subscribe(response => { this.conditionsOperators = response; });
    this.InvariantService.observableStepLoopList.subscribe(response => { this.stepLoopOperators = response; });
  }

  /**
  * return true if the condition has a cross reference object
  * @param condition condition operator to check
  */
  hasConditionCrossReference(condition: string): boolean {
    return this.CrossReferenceService.hasCrossReference(condition, this.CrossReferenceService.crossReference_ConditionValue);
  }

  /**
  * return the cross reference object for a condition
  * @param condition condition operator to filter on
  */
  findConditionCrossReference(condition: string): ICrossReference {
    return this.CrossReferenceService.findCrossReference(condition, this.CrossReferenceService.crossReference_ConditionValue);
  }

}
