import { Component, OnInit, Input } from '@angular/core';
import { Step, Action, TestCase } from 'src/app/shared/model/back/testcase.model';
import { SettingsService } from '../../settings/settings.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  /** step object */
  @Input('step') step: Step;

  /** step index in the array of steps */
  // TODO: to remove
  @Input('stepIndex') stepIndex: number;

  /** full testcase object */
  @Input('testcase') testcase: TestCase;

  /** boolean to handle the display of the actions */
  public showActionList: boolean;

  /** boolean to prevent the edition of the step attributes */
  private stepIsReadOnly: boolean;

  /** boolean to display the controls of the actions */
  private showControls: boolean;

  /** boolean to handle the display of the step if it's focused */
  public isFocused: boolean;

  constructor(
    private settingsService: SettingsService,
    private testService: TestcaseService
  ) { }

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
   * @param index position of the desired step
   */
  addAction(index: number) {
    // create the new action object (with default values)
    const newAction = new Action(this.step.test, this.step.testCase, index);
    // insert the action at the correct index
    this.step.actions.splice(index, 0, newAction);
    // reorder the sort attributes
    this.testService.refreshActionsSort(this.step.actions);
  }

  /** sends the step to the setting comp to display its information */
  focusOnStep(): void {
    // send the step to the settings service and thus, to the settings component
    this.settingsService.editStepSettings(this.step, this.stepIsReadOnly);
    // TODO : handle this differently
    //    this.showActionList = !this.showActionList;
  }

  /** return a state used by the view to display an icon depedending on the combination of useStep and inLibrary */
  libraryState(): string {
    if (this.step.useStep === 'Y' && this.step.inLibrary === 'N') {
      this.stepIsReadOnly = true;
      return 'locked';
    } else if (this.step.useStep === 'N' && this.step.inLibrary === 'Y') {
      return 'reference';
    } else if (this.step.useStep === 'N' && this.step.inLibrary === 'N') {
      return 'clear';
    } else {
      console.log('WARN: ERROR on libraryState() call, please report this issue on github');
      return null;
    }
  }

  /** on the drop of an action somewhere in the actions list */
  dropAction(event: CdkDragDrop<Action[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // reorder the sort attributes
    this.testService.refreshActionsSort(this.step.actions);
  }

}
