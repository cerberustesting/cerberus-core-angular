import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Control } from 'src/app/shared/model/back/testcase/control.model';
import { CrossreferenceService, ICrossReference } from 'src/app/core/services/utils/crossreference.service';
import { SettingsService } from '../../../../settings/settings.service';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { Step } from 'src/app/shared/model/back/testcase/step.model';
import { Action } from 'src/app/shared/model/back/testcase/action.model';

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
  @Input('parentStep') parentStep: Step;

  /** parent step index */
  @Input('parentAction') parentAction: Action;

  /** full testcase object */
  @Input('testcase') testcase: TestCase;

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

  constructor(
    private CrossReferenceService: CrossreferenceService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {

    // by default, the add action/control buttons aren't showed
    this.showControlAddButtons = false;

    this.settingsService.observableControl.subscribe(r => {
      if (this.control === r) {
        this.isFocused = true;
      } else {
        this.isFocused = false;
      }
    });
  }

  /**
  * send the desired position for the new Control to the Action component
  * @param index index of the new control (sort)
  */
  addControl(index: number): void {
    this.controlAdded.emit(index);
  }

  /**
   * send the desired position for the new Action to the Action component
   * @param index index of the new action (sort)
   */
  addAction(index: number) {
    this.actionAddedFromControl.emit(index);
  }

  /**
   * sends the control to the setting comp to display its information
   */
  focusOnControl(): void {
    // send the control object, and the two indexes (step, action) to the settings service
    this.settingsService.editControlSettings(this.control, this.readonly, this.parentStep.sort, this.parentAction.sort);
  }

  hasControlCrossReference(control: string): boolean { return this.CrossReferenceService.hasCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }
  findControlCrossReference(control: string): ICrossReference { return this.CrossReferenceService.findCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }

  getDescriptionWidthClass(): string {
    if (!this.readonly) {
      if (this.showControlAddButtons) {
        return 'desc-collapsed-width';
      } else {
        return 'desc-full-width';
      }
    }
    return 'desc-full-width';
  }
}
