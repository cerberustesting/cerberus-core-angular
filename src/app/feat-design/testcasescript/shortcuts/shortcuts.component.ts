import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/api/sidecontent.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestcaseInteractionComponent } from '../../testcaselist/testcase-interaction/testcase-interaction.component';
import { CustomModalComponent, ModalType } from 'src/app/shared/custom-modal/custom-modal.component';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss']
})
export class ShortcutsComponent {

  /** full test case object */
  @Input('testcase') testcase: TestCase;

  /** event to send to the parent component to refresh the test case object after saving */
  @Output() sendRefreshEvent = new EventEmitter<TestCase>();

  constructor(
    private notificationService: NotificationService,
    private sideContentService: SidecontentService,
    private modalService: NgbModal,
    private testcaseService: TestcaseService
  ) { }

  /**
  * open side content in duplicate mode for the selected testcase (must be one)
  * @param test the test folder to duplicate, information from selection
  * @param testcase the test case id to duplicate, information from selection
  */
  duplicateTestCaseHeader(test: string, testcase: string): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      test: test,
      testcase: testcase,
      mode: INTERACTION_MODE.DUPLICATE,
      selectedTab: 'Definition',
    });
    this.sideContentService.openSideBlock();
  }

  /**
   * open side content in edit mode for the selected testcase (must be one)
   * @param test the test folder to edit, information from selection
   * @param testcase the test case id to edit, information from selection
   */
  bugsTestCaseHeader(test: string, testcase: string): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      test: test,
      testcase: testcase,
      mode: INTERACTION_MODE.EDIT,
      selectedTab: 'Bugs',
    });
    this.sideContentService.openSideBlock();
  }

  /**
  * open side content in edit mode for the selected testcase (must be one)
  * @param test the test folder to edit, information from selection
  * @param testcase the test case id to edit, information from selection
  */
  tagTestCaseHeader(test: string, testcase: string): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      test: test,
      testcase: testcase,
      mode: INTERACTION_MODE.EDIT,
      selectedTab: 'Labels',
    });
    this.sideContentService.openSideBlock();
  }

  /**
  * open side content in edit mode for the selected testcase (must be one)
  * @param test the test folder to edit, information from selection
  * @param testcase the test case id to edit, information from selection
  */
  settingTestCaseHeader(test: string, testcase: string): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      test: test,
      testcase: testcase,
      mode: INTERACTION_MODE.EDIT,
      selectedTab: 'Settings',
    });
    this.sideContentService.openSideBlock();
  }

  /**
   * open delete modal confirmation
  * @param test the test folder to delete, information from selection
  * @param testcase the test case id to delete, information from selection
  */
  deleteTestCase(test: string, testcase: string): void {
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Delete Test Case';
    modalRef.componentInstance.subtitle = 'Do you want to delete Test Case ' + test + ' - ' + testcase + '" ?';
    modalRef.componentInstance.subtitle2 = 'This action cannot be undone';
    modalRef.componentInstance.modalType = ModalType.Confirm;
    modalRef.componentInstance.confirmFunction = () => {
      this.testcaseService.deleteTestCase(
        test,
        testcase,
        () => {
          this.notificationService.createANotification('The testCase ' + test + ' - ' + testcase + ' has been successfully deleted', NotificationStyle.Success);
        }
      );
    };
  }

  /**
   * send the current test case object to the API
   */
  saveScript() {
    this.testcaseService.saveTestCase(this.testcase, ((resp: any) => {
      this.sendRefreshEvent.emit(this.testcase);
    }));
  }

  debug() {
    console.log(this.testcase);
  }

}
