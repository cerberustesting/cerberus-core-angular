import { Component, OnInit, Input } from '@angular/core';
import { IControl, ITestCase, IAction, Control } from 'src/app/model/testcase.model';
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
  @Input('parentAction') parentAction: IAction;

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
    this.debug();
  }

  flagForDeletion(control: IControl) { this.control.toDelete = !this.control.toDelete; this.debug(); }

  addControl(): void {
    var newControl = new Control(this.testcase.info.test, this.testcase.info.testCase, this.control.sort + 1, this.control.sequence + 1, this.control.controlSequence + 1, this.control.step);
    this.parentAction.controlList.splice(this.control.sort, 0, newControl);
    // TO DO : update the sorts after
    // idea : service method that update all the sorts for an action
    console.log("control added: ");
    console.log(newControl);
  }

  focusOnControl(): void {
    // send the control to the settings service and thus, to the settings component
    this.SettingsService.editControlSettings(this.control, this.readonly);
  }

  hasControlCrossReference(control: string): boolean { return this.CrossReferenceService.hasControlCrossReference(control); }
  findControlCrossReference(control: string): CrossReference { return this.CrossReferenceService.findControlCrossReference(control); }

  mouseEnter() { this.showControlAddButtons = true; }
  mouseLeave() { this.showControlAddButtons = false; }

  debug() { console.log(this.control); }
}
