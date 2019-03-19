import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IControl, ITestCase } from 'src/app/model/testcase.model';
import { CrossReference } from 'src/app/model/crossreference.model';
import { CrossreferenceService } from 'src/app/services/utils/crossreference.service';
import { IInvariant } from 'src/app/model/invariants.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { TestService } from 'src/app/services/crud/test.service';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  @Input('control') control: IControl;
  @Input('readonly') readonly: boolean;
  @Input('parentStepIndex') parentStepIndex: number;
  @Input('parentActionIndex') parentActionIndex: number;
  @Input('controlIndex') controlIndex: number;

  // the component doens't have access to any List (Action or Step)
  // so it will call the corresponding add() method from Step component (for Action List) or Action component (for Control List)
  @Output() controlAdded = new EventEmitter<number>();
  @Output() actionAddedFromControl = new EventEmitter<number>();

  showControlAddButtons: boolean;
  testcase: ITestCase;
  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ActionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ConditionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ConditionValue;
  // private invariants
  private inv_condition_oper: Array<IInvariant>;
  private inv_control: Array<IInvariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService,
    private TestService: TestService,
    private SettingsService: SettingsService
  ) { }

  ngOnInit() {
    this.showControlAddButtons = false;
    this.control.toDelete = false;
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.InvariantService.observableControlsList.subscribe(response => { this.inv_control = response; });
    this.TestService.observableTestCase.subscribe(response => { this.testcase = response; });
  }

  flagForDeletion(control: IControl) { this.control.toDelete = !this.control.toDelete; this.debug(); }

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
    this.SettingsService.editControlSettings(this.control, this.readonly, this.parentStepIndex, this.parentActionIndex);
  }

  hasControlCrossReference(control: string): boolean { return this.CrossReferenceService.hasControlCrossReference(control); }
  findControlCrossReference(control: string): CrossReference { return this.CrossReferenceService.findControlCrossReference(control); }

  mouseEnter() { this.showControlAddButtons = true; }
  mouseLeave() { this.showControlAddButtons = false; }

  debug() { console.log(this.control); }
}
