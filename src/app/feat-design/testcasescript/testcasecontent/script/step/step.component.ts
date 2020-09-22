import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { SettingsService } from '../../settings/settings.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { Action } from 'src/app/shared/model/back/testcase/action.model';
import { Step } from 'src/app/shared/model/back/testcase/step.model';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit, OnChanges {

  /** step object */
  @Input('step') step: Step;

  /** full testcase object */
  @Input('testcase') testcase: TestCase;

  /** boolean to handle the display of the actions */
  public showActionList: boolean;

  /** boolean to prevent the edition of the step attributes */
  public stepIsReadOnly: boolean;

  /** boolean to display the controls of the actions */
  private showControls: boolean;

  /** boolean to handle the display of the step if it's focused */
  public isFocused: boolean;

  constructor(
    private settingsService: SettingsService,
    private testcaseService: TestcaseService
  ) { }

  /**
   * catch any changes in the inputted step
   * @param changes simple changes
   */
  ngOnChanges(changes: SimpleChanges) {
    // refresh the library state
    this.libraryState();
  }

  ngOnInit() {
    // by default, the step is not focused when loaded
    this.isFocused = false;

    // by default, the actions aren't shown
    this.showActionList = false;

    // by default, the action controls are all expanded
    this.showControls = true;

    // according to the step information, set the read only mode
    this.libraryState();

    // subscribe to the settings service
    this.settingsService.observableStep.subscribe(r => {
      // if the focused step is the one from this comp
      if (this.step === r) {
        this.isFocused = true;
      } else {
        this.isFocused = false;
      }
    });
  }

  /** add an action in the step
   * @param index position of the desired action (in the step)
   */
  addAction(index: number) {
    // create the new action object (with default values)
    const newAction = new Action(this.testcase.test, this.testcase.testcase, index, this.step.stepId);
    // insert the action at the correct index
    this.step.actions.splice(index, 0, newAction);
    // reorder the sort attributes
    this.testcaseService.refreshActionsSort(this.step.actions);
  }

  /**
   * sends the step to the setting comp to display its information
   */
  focusOnStep(): void {
    // send the step to the settings service and thus, to the settings component
    this.settingsService.editStepSettings(this.step);
    // TODO : handle this differently
    //    this.showActionList = !this.showActionList;
  }

  /**
   * return a state used by the view to display an icon depedending on the combination of useStep and inLibrary
   */
  libraryState(): string {
    if (this.step.useStep === true) {
      this.step.readonly = true;
      return 'locked';
    } else if (this.step.inLibrary === true) {
      this.step.readonly = false;
      return 'reference';
    } else {
      this.step.readonly = false;
      return 'clear';
    }
  }

  /**
   * on the drop of an action somewhere in the actions list
   */
  dropAction(event: CdkDragDrop<Action[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // reorder the sort attributes
    this.testcaseService.refreshActionsSort(this.step.actions);
  }

  /**
   * return true if any of the step actions has a control, false if no control is found
   */
  hasControls(): boolean {
    let res: boolean;
    this.step.actions.forEach(action => {
      if (action.controls.length > 0) {
        res = true;
        return true;
      }
    });
    if (res !== true) {
      return false;
    } else {
      return true;
    }
  }

  debug() {
    console.log(this.hasControls());
  }

}
