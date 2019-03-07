import { Component, OnInit, Input } from '@angular/core';
import { IStep, IAction } from 'src/app/model/testcase.model';
import { SettingsService } from '../settings/settings.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input('step') step: IStep;
  @Input('isfirstStep') isFirstStep: boolean;
  showActionList: boolean;
  stepIsReadOnly: boolean;
  showControls: boolean;

  constructor(
    private SettingsService: SettingsService
  ) { }

  ngOnInit() {
    this.showActionList = false;
    this.showControls = true;
    // if (this.isFirstStep) { this.showActionList = true; }
    // cause some misleading UI problem
    // solution A : ask for a API for accordion 
    // solution B : go full Angular with only *ngIf but the sweet animation will disappear
    this.step.toDelete = false;
    this.stepIsReadOnly = false;
  }

  focusOnStep(): void {
    // send the step to the settings service and thus, to the settings component
    this.SettingsService.editStepSettings(this.step, this.stepIsReadOnly);
  }

  // Depedending on the combination of useStep and inLibrary,
  // return a state used by the view for rendering
  libraryState(): string {
    if (this.step.useStep == 'Y' && this.step.inLibrary == 'N') {
      this.stepIsReadOnly = true;
      return "locked"
    } else if (this.step.useStep == 'N' && this.step.inLibrary == 'Y') {
      return "reference"
    } else if (this.step.useStep == 'N' && this.step.inLibrary == 'N') {
      return "clear"
    } else {
      console.log("ERROR on libraryState() call");
      return null;
    }
  }

  clearFocus(): void {
    console.log("focus out");
    //this.SettingsService.clearFocus();
  }

  dropAction(event: CdkDragDrop<IAction[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // todo: update the array sequence
  }

}
