import { Component, OnInit } from '@angular/core';
import { IStep, IAction, IControl } from 'src/app/model/testcase.model';
import { SettingsService } from './settings.service';
import { CrossreferenceService, ICrossReference } from 'src/app/services/utils/crossreference.service';
import { IInvariant } from 'src/app/model/invariants.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private step: IStep;
  private action: IAction;
  private control: IControl;
  private readonly: boolean;
  private parentStepIndex: number;
  private parentActionIndex: number;
  // private invariants
  private inv_condition_oper: Array<IInvariant>;
  private inv_step_loop: Array<IInvariant>;
  private inv_control: Array<IInvariant>;
  private inv_action: Array<IInvariant>;
  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ConditionValue: Array<ICrossReference> = this.CrossReferenceService.crossReference_ConditionValue;
  private crossReference_ActionValue: Array<ICrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ControlValue: Array<ICrossReference> = this.CrossReferenceService.crossReference_ControlValue;

  constructor(
    private InvariantService: InvariantsService,
    private SettingsService: SettingsService,
    private CrossReferenceService: CrossreferenceService
  ) { }

  ngOnInit() {
    this.step = null;
    this.action = null;
    this.control = null;
    this.SettingsService.observableStep.subscribe(response => { this.step = response; });
    this.SettingsService.observableAction.subscribe(response => { this.action = response; });
    this.SettingsService.observableControl.subscribe(response => { this.control = response; });
    this.SettingsService.observableParentStepIndex.subscribe(response => { this.parentStepIndex = response; });
    this.SettingsService.observableParentActionIndex.subscribe(response => { this.parentActionIndex = response; });
    // invariants subscription
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.InvariantService.observableStepLoopList.subscribe(response => { this.inv_step_loop = response; });
    this.InvariantService.observableControlsList.subscribe(response => { this.inv_control = response; });
    this.InvariantService.observableActionsList.subscribe(response => { this.inv_action = response; });
    this.SettingsService.observableReadOnlyMode.subscribe(response => { this.readonly = response; });
  }

  hasConditionCrossReference(condition: string): boolean { return this.CrossReferenceService.hasCrossReference(condition, this.CrossReferenceService.crossReference_ConditionValue); }
  findConditionCrossReference(condition: string): ICrossReference { return this.CrossReferenceService.findCrossReference(condition, this.CrossReferenceService.crossReference_ConditionValue); }
  hasActionCrossReference(action: string): boolean { return this.CrossReferenceService.hasCrossReference(action, this.CrossReferenceService.crossReference_ActionValue); }
  findActionCrossReference(action: string): ICrossReference { return this.CrossReferenceService.findCrossReference(action, this.CrossReferenceService.crossReference_ActionValue); }
  hasControlCrossReference(control: string): boolean { return this.CrossReferenceService.hasCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }
  findControlCrossReference(control: string): ICrossReference { return this.CrossReferenceService.findCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }

}
