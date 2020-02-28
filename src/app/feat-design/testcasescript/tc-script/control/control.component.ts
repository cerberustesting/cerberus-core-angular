import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Control, ITestCase } from 'src/app/shared/model/testcase.model';
import { CrossreferenceService, ICrossReference } from 'src/app/core/services/utils/crossreference.service';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  @Input('control') control: Control;
  @Input('readonly') readonly: boolean;
  @Input('parentStepIndex') parentStepIndex: number;
  @Input('parentActionIndex') parentActionIndex: number;
  @Input('controlIndex') controlIndex: number;

  // the component doens't have access to any List (Action or Step)
  // so it will call the corresponding add() method from Step component (for Action List) or Action component (for Control List)
  @Output() controlAdded = new EventEmitter<number>();
  @Output() actionAddedFromControl = new EventEmitter<number>();

  private showControlAddButtons: boolean;
  private isFocused: boolean;
  private testcase: ITestCase;
  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ActionValue: Array<ICrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ConditionValue: Array<ICrossReference> = this.CrossReferenceService.crossReference_ConditionValue;
  // private invariants
  private inv_condition_oper: Array<IInvariant>;
  private inv_control: Array<IInvariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService,
    private testService: TestcaseService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.showControlAddButtons = false;
    this.control.toDelete = false;
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.InvariantService.observableControlsList.subscribe(response => { this.inv_control = response; });
    this.testService.observableTestCase.subscribe(response => { this.testcase = response; });
    this.settingsService.observableControl.subscribe(r => {
      if (this.control === r) {
        this.isFocused = true;
      } else {
        this.isFocused = false;
      }
    });
  }

  flagForDeletion(control: Control) { this.control.toDelete = !this.control.toDelete; this.debug(); }

  addControl(destinationIndex: number): void {
    // send the desired position for the new Control to the Action component
    this.controlAdded.emit(destinationIndex);
  }

  addAction(destinationIndex: number) {
    // send the desired position for the new Action to the Action component
    this.actionAddedFromControl.emit(destinationIndex);
  }

  focusOnControl(): void {
    // send the control to the settings service and thus, to the settings component
    this.settingsService.editControlSettings(this.control, this.readonly, this.parentStepIndex, this.parentActionIndex);
  }

  hasControlCrossReference(control: string): boolean { return this.CrossReferenceService.hasCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }
  findControlCrossReference(control: string): ICrossReference { return this.CrossReferenceService.findCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }

  mouseEnter() { this.showControlAddButtons = true; }
  mouseLeave() { this.showControlAddButtons = false; }

  debug() { console.log(this.control); }
}
