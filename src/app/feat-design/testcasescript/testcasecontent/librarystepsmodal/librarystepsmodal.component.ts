import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { Step } from 'src/app/shared/model/back/testcase/step.model';
import { UserService } from 'src/app/core/services/api/user.service';
import { User } from 'src/app/shared/model/back/user/user.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';

/**
 * @class Steps By Test
 * @classdesc list of  library steps grouped by test folder
 */
export class StepsByTest {

  /** @description name of the test folder */
  test: string;

  /** @description list of library steps for this test folder */
  steps: Array<Step>;

  constructor(test: string) {
    this.test = test;
    this.steps = [];
  }
}

@Component({
  selector: 'app-librarystepsmodal',
  templateUrl: './librarystepsmodal.component.html',
  styleUrls: ['./librarystepsmodal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class LibraryStepsModalComponent implements OnInit {

  /** list of all the library RAW steps available for the user system */
  public librarySteps: Step[];

  /** list of all the library steps grouped by test available for the user system */
  private stepsByTest: StepsByTest[];

  /** list of selected steps */
  private selectedSteps: Step[];

  /** user information */
  private user: User;

  /** full test case object */
  @Input() testcase: TestCase;

  // TODO : output to send the testcasecontent component that new library steps have been added and it needs to refresh the step sort
  @Output() stepsAddedEvent: EventEmitter<Step[]> = new EventEmitter();

  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private testcaseService: TestcaseService,
    private userService: UserService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

    // instantiate the selected steps array
    this.selectedSteps = [];

    // subscribe to the user changes
    this.userService.observableUser.subscribe(response => {
      this.user = response;
      // get the steps lists (depending on the user system) filtering on the first system
      this.testcaseService.getLibraryStepList(
        (steps: Step[]) => {
          this.librarySteps = steps;
          this.stepsByTest = this.groupStepsByTest();
        }, this.user.defaultSystem[0]);
    });
  }

  /**
  * return all the steps group by test folder names
  */
  groupStepsByTest(): StepsByTest[] {
    const testFolderNames: string[] = [];
    this.librarySteps.forEach(step => {
      if (!testFolderNames.includes(step.test)) {
        testFolderNames.push(step.test);
      }
    });
    const testFolderGroups: StepsByTest[] = [];
    testFolderNames.forEach(testfoldername => {
      const newTestFolderGroup = new StepsByTest(testfoldername);
      newTestFolderGroup.steps = this.librarySteps.filter(step => step.test === testfoldername);
      testFolderGroups.push(newTestFolderGroup);
    });
    return testFolderGroups;
  }

  /**
  * add the step(s) to the test case script and close the modal
  */
  addStepsAndClose(): void {
    console.log(this.selectedSteps);
    if (this.selectedSteps.length > 0) {
      this.selectedSteps.forEach(step => {
        step.useStep = true;
        step.useStepTest = step.test;
        step.useStepTestCase = step.testCase;
        step.useStepStepId = step.useStepStepId;
        step.inLibrary = false;
        step.actions = [];
        // remove the 'step' attributes of the fetched steps since it not used for saving
        step.stepId = undefined;
        step.test = undefined;
        step.testCase = undefined;
        this.testcase.steps.push(step);
      });
      this.stepsAddedEvent.emit(this.selectedSteps);
      this.activeModal.close('Save click');
    }
  }

  /**
  * drop function (for drag and drop)
  * @param event the event..
  */
  drop(event: CdkDragDrop<Step[]>): void {
    moveItemInArray(this.selectedSteps, event.previousIndex, event.currentIndex);
  }

}
