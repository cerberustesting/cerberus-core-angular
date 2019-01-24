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

  observableStep = new BehaviorSubject<IStep>(this.selectedStep);
  observableAction = new BehaviorSubject<IAction>(this.selectedAction);
  observableControl = new BehaviorSubject<IControl>(this.selectedControl);

  constructor() { }

  editStepSettings(step: IStep): void {
    this.selectedStep = step;
    this.selectedAction = null;
    this.selectedControl = null;
    this.refreshVariable();
  }

  editActionSettings(action: IAction): void {
    this.selectedStep = null;
    this.selectedAction = action;
    this.selectedControl = null;
    this.refreshVariable();
  }

  editControlSettings(control: IControl): void {
    this.selectedStep = null;
    this.selectedAction = null;
    this.selectedControl = control;
    this.refreshVariable();
  }

  refreshVariable(): void {
    this.observableStep.next(this.selectedStep);
    this.observableAction.next(this.selectedAction);
    this.observableControl.next(this.selectedControl);
  }

  clearFocus(): void {
    this.selectedStep = null;
    this.selectedAction = null;
    this.selectedControl = null;
    this.refreshVariable();
  }

}
