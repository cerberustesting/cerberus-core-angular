import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Control } from 'src/app/shared/model/back/testcase.model';
import { CrossreferenceService, ICrossReference } from 'src/app/core/services/utils/crossreference.service';
import { Invariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { SettingsService } from '../../../../settings/settings.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  /** control object */
  @Input('control') control: Control;

  /** readonly mode from parent */
  @Input('readonly') readonly: boolean;

  /** parent step index */
  @Input('parentStepIndex') parentStepIndex: number;

  /** parent step index */
  @Input('parentActionIndex') parentActionIndex: number;

  // the component doens't have access to any List (Action or Step)
  // so it will call the corresponding add() method from Step component (for Action List) or Action component (for Control List)
  @Output() controlAdded = new EventEmitter<number>();
  @Output() actionAddedFromControl = new EventEmitter<number>();

  /** boolean to handle add action/control buttons */
  private showControlAddButtons: boolean;

  /** boolean to handle the display of the control if it's focused in settings comp */
  private isFocused: boolean;

  // cross reference array to display the correct input fields according to the selected condition
  private crossReference_ActionValue: Array<ICrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ConditionValue: Array<ICrossReference> = this.CrossReferenceService.crossReference_ConditionValue;

  // private invariants
  private inv_condition_oper: Array<Invariant>;
  private inv_control: Array<Invariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService,
    private testService: TestcaseService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    // by default, the add action/control buttons aren't showed
    this.showControlAddButtons = false;

    // get invariants list
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.InvariantService.observableControlsList.subscribe(response => { this.inv_control = response; });

    this.settingsService.observableControl.subscribe(r => {
      if (this.control === r) {
        this.isFocused = true;
      } else {
        this.isFocused = false;
      }
    });
  }

  /** send the desired position for the new Control to the Action component */
  addControl(destinationIndex: number): void {
    this.controlAdded.emit(destinationIndex);
  }

  /** send the desired position for the new Action to the Action component */
  addAction(destinationIndex: number) {
    this.actionAddedFromControl.emit(destinationIndex);
  }

  /** sends the control to the setting comp to display its information */
  focusOnControl(): void {
    this.settingsService.editControlSettings(this.control, this.readonly, this.parentStepIndex, this.parentActionIndex);
  }

  hasControlCrossReference(control: string): boolean { return this.CrossReferenceService.hasCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }
  findControlCrossReference(control: string): ICrossReference { return this.CrossReferenceService.findCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }

}
