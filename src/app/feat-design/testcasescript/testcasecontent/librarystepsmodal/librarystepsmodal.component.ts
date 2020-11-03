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

  /** reference list of all the library steps grouped by test available for the user system */
  private initialStepsByTest: StepsByTest[];

  /** list of all the library RAW steps available for the user system */
  public librarySteps: Step[];

  /** list of all the library steps grouped by test available for the user system */
  private stepsByTest: StepsByTest[];

  /** list of selected steps */
  public selectedSteps: Step[];

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
      this.refreshLibrayStepsList(this.user.defaultSystem[0]);
    });
  }

  /**
   * update the list of available library steps filtered on a keyword
   * @param event keyup event
   */
  filterSteps(event: any): void {
    const keyword = event.target.value;
    // if there is a keyword
    if (keyword !== '') {
      const res = new Array<StepsByTest>();
      this.initialStepsByTest.forEach(stepgroup => {
        const filterResult = this.keywordMatchStep(keyword, stepgroup.steps);
        if (filterResult.length > 0) {
          const newStepGroup = new StepsByTest(stepgroup.test);
          newStepGroup.steps = filterResult;
          res.push(newStepGroup);
        }
      });
      this.stepsByTest = res;
    } else {
      // if no keyword is passed, reset the step group list
      this.stepsByTest = this.groupStepsByTest();
    }
  }

  /**
   * return the list of step that match a keyword
   * @param keyword to filter on
   * @param steps list of steps to filter
   */
  keywordMatchStep(keyword: string, steps: Step[]): Step[] {
    keyword = keyword.toLowerCase();
    const res: Step[] = new Array<Step>();
    steps.forEach(step => {
      if (
        step.description.toLowerCase().includes(keyword) ||
        step.testcase.toLowerCase().includes(keyword) ||
        step.tcdesc.toLowerCase().includes(keyword) ||
        step.test.toLowerCase().includes(keyword)
      ) {
        res.push(step);
      }
    });
    return res;
  }

  /**
  * return all the steps grouped by test folder names
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
    if (this.selectedSteps.length > 0) {
      this.selectedSteps.forEach(step => {
        // add the correct test folder & test case id
        step.test = this.testcase.test;
        step.testcase = this.testcase.testcase;
        step.isUsingLibraryStep = true;
        step.isLibraryStep = false;
        // remove the stepId attribute since it's a new step
        step.stepId = undefined;
        step.tcdesc = undefined;
        step.sort = undefined;
        this.testcase.steps.push(step);
      });
      this.stepsAddedEvent.emit(this.selectedSteps);
      this.closeModal('save');
    }
  }

  /**
   * close the modal
   * @param reason reason of closure ('save', 'close', 'dismiss')
   */
  closeModal(reason: string): void {
    this.activeModal.close(reason);
  }

  /**
  * drop function (for drag and drop)
  * @param event the event..
  */
  drop(event: CdkDragDrop<Step[]>): void {
    moveItemInArray(this.selectedSteps, event.previousIndex, event.currentIndex);
  }

  /**
   * fetch the corresponding list of libray steps for a system
   * @param system name of the system to fetch the steps from
   */
  refreshLibrayStepsList(system: string): void {
    // get the steps lists (depending on the user system) filtering on the first system
    this.testcaseService.getLibraryStepList(
      (steps: Step[]) => {
        this.librarySteps = steps;
        this.stepsByTest = this.groupStepsByTest();
        // save the step groups in another variable as a reference
        this.initialStepsByTest = this.stepsByTest;
      }, system);
  }

}
