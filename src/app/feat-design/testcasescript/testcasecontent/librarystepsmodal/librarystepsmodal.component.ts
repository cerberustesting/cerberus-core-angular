import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { Step } from 'src/app/shared/model/back/testcase/step.model';
import { UserService } from 'src/app/core/services/api/user.service';
import { User } from 'src/app/shared/model/back/user/user.model';

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
  private stepsByTest: Step[];

  /** list of selected steps */
  private selectedSteps: any[];

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

    this.librarySteps = undefined;

    this.selectedSteps = [];

    // subscribe to the user changes
    this.userService.observableUser.subscribe(response => {
      this.user = response;
      // get the steps lists (depending on the user system) filtering on the first system
      this.testcaseService.getLibraryStepList(
        (steps: Step[]) => {
          this.librarySteps = steps;
          this.stepsByTest = this.groupStepsByTest();
          // console.log(this.groupStepsByTest());
        }, this.user.defaultSystem[0]);
    });
  }

  /**
   * return all the steps group by test folder names
   */
  groupStepsByTest(): any[] {
    const testFolderNames: string[] = [];
    this.librarySteps.forEach(step => {
      if (!testFolderNames.includes(step.test)) {
        testFolderNames.push(step.test);
      }
    });
    const testFolderGroups: any[] = [];
    testFolderNames.forEach(testfoldername => {
      const newTestFolderGroup = {
        test: '',
        steps: []
      };
      newTestFolderGroup.test = testfoldername;
      newTestFolderGroup.steps = this.librarySteps.filter(step => step.test === testfoldername);
      testFolderGroups.push(newTestFolderGroup);
    });
    return testFolderGroups;
  }

  unselectStep(step: any) {
    const index = this.selectedSteps.findIndex(s => s.test === step.test && s.description === step.description);
    this.selectedSteps.splice(index, 1);
  }

  addStepsAndClose() {
    console.log(this.selectedSteps);
    this.activeModal.close('Save click');
  }
}
