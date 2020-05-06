import { Component, OnInit, Input } from '@angular/core';
import { Step } from 'src/app/shared/model/back/testcase/step.model';
import { SettingsService } from './settings.service';
import { Control } from 'src/app/shared/model/back/testcase/control.model';
import { Action } from 'src/app/shared/model/back/testcase/action.model';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  /** full testcase object */
  @Input('testcase') testcase: TestCase;

  // currently selected object
  step: Step;
  action: Action;
  control: Control;

  // read onyl status of the current object
  private readonly: boolean;

  // only relevant for action & control
  private parentStepIndex: number;

  // only relevant for control
  private parentActionIndex: number;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.step = undefined;
    this.action = undefined;
    this.control = undefined;
    this.settingsService.observableStep.subscribe(response => { this.step = response; });
    this.settingsService.observableAction.subscribe(response => { this.action = response; });
    this.settingsService.observableControl.subscribe(response => { this.control = response; });
    this.settingsService.observableParentStepIndex.subscribe(response => { this.parentStepIndex = response; });
    this.settingsService.observableParentActionIndex.subscribe(response => { this.parentActionIndex = response; });
    this.settingsService.observableReadOnlyMode.subscribe(response => { this.readonly = response; });
  }

  /**
   * return the setting tab title
  */
  getTitle(): string {
    if (this.step) {
      return 'Step';
    } else if (this.action) {
      return 'Action';
    } else {
      return 'Control';
    }
  }

  /**
   * return the setting tab title
  */
  getBackgroundColorClass(): string {
    if (this.step) {
      return 'step-bg-color';
    } else if (this.action) {
      return 'action-bg-color';
    } else {
      return 'control-bg-color';
    }
  }

}
