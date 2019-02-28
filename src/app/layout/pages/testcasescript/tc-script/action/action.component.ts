import { Component, OnInit, Input } from '@angular/core';
import { CrossReference } from 'src/app/model/crossreference.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { IAction, ITestCase, Control } from 'src/app/model/testcase.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { CrossreferenceService } from 'src/app/services/utils/crossreference.service';
import { TestService } from 'src/app/services/crud/test.service';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input('action') action: IAction;
  @Input('readonly') readonly: boolean;
  showActionAddButtons: boolean;
  showControlList: boolean;
  testcase: ITestCase;
  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ActionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ConditionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ConditionValue;
  // private invariants
  private inv_action: Array<IInvariant>;
  private inv_condition_oper: Array<IInvariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService,
    private TestService: TestService,
    private SettingsService: SettingsService
  ) { }

  ngOnInit() {
    this.showActionAddButtons = false;
    // @ts-ignore
    if (this.action.controlList.length == 0) { this.showControlList = false; } else { this.showControlList = true; }
    this.InvariantService.observableActionsList.subscribe(response => { this.inv_action = response; });
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.TestService.observableTestCase.subscribe(response => { this.testcase = response; });
  }

  addControl() {
    var newControl = new Control(
      this.testcase.info.test,
      this.testcase.info.testCase,
      this.action.step,
      this.action.controlList.length,
      this.action.controlList.length + 1,
      this.action.sequence
    )
    console.log(newControl);
  }

  focusOnAction(): void {
    // send the action to the settings service and thus, to the settings component
    this.SettingsService.editActionSettings(this.action, this.readonly);
  }

  hasActionCrossReference(action: string): boolean { return this.CrossReferenceService.hasActionCrossReference(action); }
  findActionCrossReference(action: string): CrossReference { return this.CrossReferenceService.findActionCrossReference(action); }
  hasConditionCrossReference(condition: string): boolean { return this.CrossReferenceService.hasConditionCrossReference(condition); }
  findConditionCrossReference(condition: string): CrossReference { return this.CrossReferenceService.findConditionCrossReference(condition); }
  hasControlCrossReference(control: string): boolean { return this.CrossReferenceService.hasControlCrossReference(control); }
  findControlCrossReference(control: string): CrossReference { return this.CrossReferenceService.findControlCrossReference(control); }

  mouseEnter() { this.showActionAddButtons = true; }
  mouseLeave() { this.showActionAddButtons = false; }
}
