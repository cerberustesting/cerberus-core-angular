import { Component, OnInit, Input } from '@angular/core';
import { Invariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { Control } from 'src/app/shared/model/back/testcase.model';
import { CrossreferenceService, ICrossReference } from 'src/app/core/services/utils/crossreference.service';

@Component({
  selector: 'app-control-settings',
  templateUrl: './control-settings.component.html',
  styleUrls: ['./control-settings.component.scss']
})
export class ControlSettingsComponent implements OnInit {

  /** control object */
  @Input('control') control: Control;

  /** readonly mode to disabled all fields */
  @Input('readonly') readonly: boolean;

  /** list of condition operators (private invariants) */
  public conditionsOperators: Array<Invariant>;

  /** list of controls (private invariants) */
  public controls: Array<Invariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService
  ) { }

  ngOnInit() {
    // get the invariants
    this.InvariantService.observableConditionOperList.subscribe(response => { this.conditionsOperators = response; });
    this.InvariantService.observableControlsList.subscribe(response => { this.controls = response; });
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
   * return true if the control has a cross reference object
   * @param control control operator to check
   */
  hasControlCrossReference(control: string): boolean {
    return this.CrossReferenceService.hasCrossReference(control, this.CrossReferenceService.crossReference_ControlValue);
  }

  /**
 * return the cross reference object for a control
 * @param control control operator to filter on
 */
  findControlCrossReference(control: string): ICrossReference {
    return this.CrossReferenceService.findCrossReference(control, this.CrossReferenceService.crossReference_ControlValue);
  }


}
