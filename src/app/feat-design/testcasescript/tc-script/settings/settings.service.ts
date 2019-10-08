import { Injectable } from '@angular/core';
import { Step, Action, Control } from 'src/app/shared/model/testcase.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  selectedStep: Step = null;
  selectedAction: Action = null;
  selectedControl: Control = null;
  readOnlyMode: boolean;
  parentStepIndex: number;
  parentActionIndex: number;

  observableStep = new BehaviorSubject<Step>(this.selectedStep);
  observableAction = new BehaviorSubject<Action>(this.selectedAction);
  observableControl = new BehaviorSubject<Control>(this.selectedControl);
  observableReadOnlyMode = new BehaviorSubject<boolean>(this.readOnlyMode);
  observableParentStepIndex = new BehaviorSubject<number>(this.parentStepIndex);
  observableParentActionIndex = new BehaviorSubject<number>(this.parentActionIndex);

  constructor() {
    this.readOnlyMode = false;
  }

  editStepSettings(step: Step, ro: boolean): void {
    this.selectedStep = step;
    this.selectedAction = null;
    this.selectedControl = null;
    this.readOnlyMode = ro;
    this.parentStepIndex = null;
    this.parentActionIndex = null;
    this.refreshVariable();
  }

  editActionSettings(action: Action, ro: boolean, parentStepIndex: number): void {
    this.selectedStep = null;
    this.selectedAction = action;
    this.selectedControl = null;
    this.readOnlyMode = ro;
    this.parentStepIndex = parentStepIndex;
    this.parentActionIndex = null;
    this.refreshVariable();
  }

  editControlSettings(control: Control, ro: boolean, parentStepIndex: number, parentActionIndex: number): void {
    this.selectedStep = null;
    this.selectedAction = null;
    this.selectedControl = control;
    this.readOnlyMode = ro;
    this.parentStepIndex = parentStepIndex;
    this.parentActionIndex = parentActionIndex;
    this.refreshVariable();
  }

  refreshVariable(): void {
    this.observableStep.next(this.selectedStep);
    this.observableAction.next(this.selectedAction);
    this.observableControl.next(this.selectedControl);
    this.observableReadOnlyMode.next(this.readOnlyMode);
    this.observableParentStepIndex.next(this.parentStepIndex);
    this.observableParentActionIndex.next(this.parentActionIndex);
  }

  clearFocus(): void {
    this.selectedStep = null;
    this.selectedAction = null;
    this.selectedControl = null;
    this.parentStepIndex = null;
    this.parentActionIndex = null;
    this.refreshVariable();
  }

}
