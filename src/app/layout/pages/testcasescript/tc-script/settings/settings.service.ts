import { Injectable } from '@angular/core';
import { IStep, IAction, IControl } from 'src/app/model/testcase.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  selectedStep: IStep = null;
  selectedAction: IAction = null;
  selectedControl: IControl = null;
  readOnlyMode: boolean = false;

  observableStep = new BehaviorSubject<IStep>(this.selectedStep);
  observableAction = new BehaviorSubject<IAction>(this.selectedAction);
  observableControl = new BehaviorSubject<IControl>(this.selectedControl);
  observableReadOnlyMode = new BehaviorSubject<boolean>(this.readOnlyMode);

  constructor() { }

  editStepSettings(step: IStep, ro: boolean): void {
    this.selectedStep = step;
    this.selectedAction = null;
    this.selectedControl = null;
    this.readOnlyMode = ro;
    this.refreshVariable();
  }

  editActionSettings(action: IAction, ro: boolean): void {
    this.selectedStep = null;
    this.selectedAction = action;
    this.selectedControl = null;
    this.readOnlyMode = ro;
    this.refreshVariable();
  }

  editControlSettings(control: IControl, ro: boolean): void {
    this.selectedStep = null;
    this.selectedAction = null;
    this.selectedControl = control;
    this.readOnlyMode = ro;
    this.refreshVariable();
  }

  refreshVariable(): void {
    this.observableStep.next(this.selectedStep);
    this.observableAction.next(this.selectedAction);
    this.observableControl.next(this.selectedControl);
    this.observableReadOnlyMode.next(this.readOnlyMode);
  }

  clearFocus(): void {
    this.selectedStep = null;
    this.selectedAction = null;
    this.selectedControl = null;
    this.refreshVariable();
  }

}
