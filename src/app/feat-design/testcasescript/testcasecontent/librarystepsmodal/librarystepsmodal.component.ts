import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { Step } from 'src/app/shared/model/back/testcase/step.model';
import { UserService } from 'src/app/core/services/api/user.service';
import { User } from 'src/app/shared/model/back/user/user.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
  * remove a step from the list of selected steps
  * @param step object to remove
  */
  unselectStep(step: Step): void {
    const index = this.selectedSteps.findIndex(s => s.test === step.test && s.description === step.description);
    this.selectedSteps.splice(index, 1);
  }

  /**
  * add the steps to the test case script and close the modal
  * @param step object to remove
  */
  addStepsAndClose(): void {
    this.activeModal.close('Save click');
  }

  /**
  * drop function (for drag and drop)
  * @param event the event..
  */
  drop(event: CdkDragDrop<Step[]>): void {
    moveItemInArray(this.selectedSteps, event.previousIndex, event.currentIndex);
  }

}
