import { Component, Input } from '@angular/core';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LibraryStepsModalComponent } from '../librarystepsmodal/librarystepsmodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Step } from 'src/app/shared/model/back/testcase/step.model';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent {

  /** @description full test case object */
  @Input('testcase') testcase: TestCase;

  constructor(
    private testcaseService: TestcaseService,
    private modalService: NgbModal
  ) {
  }

  openLibraryStepsModal() {
    const modalRef = this.modalService.open(LibraryStepsModalComponent, { size: 'xl' });
    // bind the testcase object to the modal
    modalRef.componentInstance.testcase = this.testcase;
    // subscribe to the event the modal will send if a step is added
    modalRef.componentInstance.stepsAddedEvent.subscribe((response) => {
      this.testcaseService.refreshStepSort(this.testcase.steps);
    });
  }

  dropStep(event: CdkDragDrop<Step[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.testcaseService.refreshStepSort(this.testcase.steps);
  }

  addAStep() {
    const newStep = new Step(this.testcase.testcase, this.testcase.test, this.testcase.steps.length + 1);
    this.testcase.steps.push(newStep);
    // useless to refresh the step sort here since we can only add at the end.
    // if later modification (e.g. adding a step after any step), please consider
    // - using splice() instead of push
    // - call TestService.refreshStepSort(this.testcase.stepList)
  }
}
