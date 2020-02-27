import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ITestCase, Step } from 'src/app/shared/model/testcase.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LibraryStepsModalComponent } from '../librarystepsmodal/librarystepsmodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements OnInit {

  @Input('testcase') testcase: ITestCase;

  constructor(private testService: TestService, private modalService: NgbModal) {
  }

  ngOnInit() { }

  openLibraryStepsModal() {
    this.modalService.open(LibraryStepsModalComponent);
  }

  dropStep(event: CdkDragDrop<Step[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.testService.refreshStepSort(this.testcase.stepList);
  }

  addAStep() {
    const newStep = new Step(this.testcase.info.testCase, this.testcase.info.test, this.testcase.stepList.length + 1);
    this.testcase.stepList.push(newStep);
    // useless to refresh the step sort here since we can only add at the end.
    // if later modification (e.g. adding a step after any step), please consider
    // - using splice() instead of push
    // - call TestService.refreshStepSort(this.testcase.stepList)
  }
}
