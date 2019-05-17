import { Injectable } from '@angular/core';
import { IStep, IAction, IControl } from 'src/app/shared/model/testcase.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  selectedStep: IStep = null;
  selectedAction: IAction = null;
  selectedControl: IControl = null;
  readOnlyMode: boolean = false;
  parentStepIndex: number;
  parentActionIndex: number;

  observableStep = new BehaviorSubject<IStep>(this.selectedStep);
  observableAction = new BehaviorSubject<IAction>(this.selectedAction);
  observableControl = new BehaviorSubject<IControl>(this.selectedControl);
  observableReadOnlyMode = new BehaviorSubject<boolean>(this.readOnlyMode);
  observableParentStepIndex = new BehaviorSubject<number>(this.parentStepIndex);
  observableParentActionIndex = new BehaviorSubject<number>(this.parentActionIndex);

  constructor() { }

  editStepSettings(step: IStep, ro: boolean): void {
    this.selectedStep = step;
    this.selectedAction = null;
    this.selectedControl = null;
    this.readOnlyMode = ro;
    this.parentStepIndex = null;
    this.parentActionIndex = null;
    this.refreshVariable();
  }

  editActionSettings(action: IAction, ro: boolean, parentStepIndex: number): void {
    this.selectedStep = null;
    this.selectedAction = action;
    this.selectedControl = null;
    this.readOnlyMode = ro;
    this.parentStepIndex = parentStepIndex;
    this.parentActionIndex = null;
    this.refreshVariable();
  }

  editControlSettings(control: IControl, ro: boolean, parentStepIndex: number, parentActionIndex: number): void {
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
