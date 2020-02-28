import { Component, OnInit, Input } from '@angular/core';
import { Step, Action } from 'src/app/shared/model/testcase.model';
import { SettingsService } from '../settings/settings.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input('step') step: Step;
  @Input('stepIndex') stepIndex: number;
  // @Input('isfirstStep') isFirstStep: boolean;
  showActionList: boolean;
  private stepIsReadOnly: boolean;
  private showControls: boolean;
  isFocused: boolean;

  constructor(
    private settingsService: SettingsService,
    private testService: TestcaseService
  ) { }

  ngOnInit() {
    this.isFocused = false;
    this.showActionList = false;
    this.showControls = true;
    // if (this.isFirstStep) { this.showActionList = true; }
    // cause some misleading UI problem
    // solution A : ask for a API for accordion
    // solution B : go full Angular with only *ngIf but the sweet animation will disappear
    this.step.toDelete = false;
    this.stepIsReadOnly = false;
    this.settingsService.observableStep.subscribe(r => {
      if (this.step === r) {
        this.isFocused = true;
      } else {
        this.isFocused = false;
      }
    });
  }

  addAction(destinationIndex: number) {
    const newAction = new Action(this.step.test, this.step.testCase, destinationIndex);
    this.step.actionList.splice(destinationIndex, 0, newAction);
    this.testService.refreshActionSort(this.step.actionList);
  }

  focusOnStep(): void {
    // send the step to the settings service and thus, to the settings component
    this.settingsService.editStepSettings(this.step, this.stepIsReadOnly);
    this.showActionList = !this.showActionList;
  }

  // Depedending on the combination of useStep and inLibrary,
  // return a state used by the view for rendering
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

  dropAction(event: CdkDragDrop<Action[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.testService.refreshActionSort(this.step.actionList);
  }

}
