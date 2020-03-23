import { Component, OnInit, Input } from '@angular/core';
import { Action } from 'src/app/shared/model/back/testcase.model';
import { Invariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { CrossreferenceService, ICrossReference } from 'src/app/core/services/utils/crossreference.service';

@Component({
  selector: 'app-action-settings',
  templateUrl: './action-settings.component.html',
  styleUrls: ['./action-settings.component.scss']
})
export class ActionSettingsComponent implements OnInit {

  /** control object */
  @Input('action') action: Action;

  /** readonly mode to disabled all fields */
  @Input('readonly') readonly: boolean;

  /** list of condition operators (private invariants) */
  public conditionsOperators: Array<Invariant>;

  /** list of actions (private invariants) */
  public actions: Array<Invariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService
  ) { }

  ngOnInit() {
    // get the invariants
    this.InvariantService.observableConditionOperList.subscribe(response => { this.conditionsOperators = response; });
    this.InvariantService.observableActionsList.subscribe(response => { this.actions = response; });
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

  /**
  * return true if the action has a cross reference object
  * @param action action operator to check
  */
  hasActionCrossReference(action: string): boolean {
    return this.CrossReferenceService.hasCrossReference(action, this.CrossReferenceService.crossReference_ActionValue);
  }

  /**
  * return the cross reference object for a control
  * @param action action operator to check
  */
  findActionCrossReference(action: string): ICrossReference {
    return this.CrossReferenceService.findCrossReference(action, this.CrossReferenceService.crossReference_ActionValue);
  }

}
