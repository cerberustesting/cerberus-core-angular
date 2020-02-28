import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ITestCase, TestCaseHeader } from 'src/app/shared/model/testcase.model';
import { TestFolder } from 'src/app/shared/model/back/test.model';
import { TestService } from 'src/app/core/services/api/test/test.service';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { SettingsService } from '../tc-script/settings/settings.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/api/sidecontent.service';
import { TestcaseInteractionComponent } from 'src/app/feat-design/testcaselist/testcase-interaction/testcase-interaction.component';
import { CustomModalComponent } from 'src/app/shared/custom-modal/custom-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tc-selector',
  templateUrl: './tc-selector.component.html',
  styleUrls: ['./tc-selector.component.scss']
})
export class TcSelectorComponent implements OnInit, OnDestroy {

  @Input('test') selectedTest: string;
  @Input('testcase') selectedTestCase: string;

  // event fired when the test and testcase value change
  @Output() SelectedTestChange = new EventEmitter<string>();
  @Output() SelectedTestCaseChange = new EventEmitter<string>();
  @Output() SaveScriptEvent = new EventEmitter<void>();

  // list of test folders
  public testsList: Array<TestFolder>;
  // list of testcase id corresponding to the selected test folder
  public testcasesList: Array<TestCaseHeader>;
  // testcase object according to test folder and testcase id
  public testcase: ITestCase;

  // TODO: add a comment
  tabs: any;

  constructor(
    private testService: TestService,
    private testcaseService: TestcaseService,
    private settingsService: SettingsService,
    private notificationService: NotificationService,
    private sideContentService: SidecontentService,
    private modalService: NgbModal,
  ) { }

  ngOnDestroy() {
    this.testcase = null;
    this.testcaseService.observableTestCase.next(this.testcase);
    this.selectedTest = null;
    this.selectedTestCase = null;
  }

  ngOnInit() {

    // subscription to test folder list changes
    this.testService.observableTestsList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.testsList = response;
          if (this.selectedTest != null) {
            // secure the parsed test from URL
            if (!this.testService.testExists(this.selectedTest)) {
              console.error('the selected test doesn\'t exist');
              this.notificationService.createANotification('The selected test doesn\'t exist', NotificationStyle.Error, true, 5000);
              // this.AlertService.displayMessage(Alert_selectedTestDoesNotExist);
              this.selectedTest = null;
            } else {
              this.SelectedTestChange.emit(this.selectedTest);
              this.testcaseService.getTestCasesList(this.selectedTest);
            }
          }
        }
      } else {
        this.testsList = null;
      }
    });

    // subscription to test case id list changes
    this.testcaseService.observableTestCasesList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.testcasesList = response;
          // secure the parsed test case from URL
          if (this.selectedTestCase != null && this.selectedTest != null) {
            if (!this.testcaseService.selectedTestCaseExist(this.selectedTestCase)) {
              console.error('the selected test case doesn\'t exist');
              this.notificationService.createANotification('The selected test case doesn\t exist', NotificationStyle.Error, true, 5000);
              this.selectedTestCase = null;
            } else {
              // this.SelectedTestChange.emit(this.selectedTest);
              this.refreshTestCase();
            }
          }
        }
      } else {
        this.testcasesList = null;
        if (this.selectedTest != null) {
          if (this.testcaseService.seletectedTestExist(this.selectedTest)) {
            console.warn('there is no corresponding test case for this test');
          }
          this.notificationService.createANotification('There is no corresponding test case for this test', NotificationStyle.Warning, true, 5000);
          // this.AlertService.displayMessage(Alert_noTestCaseForATest);
        }
      }
    });

    // subscribe to testcase object (updated when combination of test folder & id changes)
    this.testcaseService.observableTestCase.subscribe(response => { this.testcase = response; });

  }

  // set to null the test case id
  clearSelectedTestCase() {
    this.selectedTestCase = null;
    this.SelectedTestCaseChange.emit(this.selectedTestCase);
  }

  // fired when the selected test folder changes
  selectedTestChange() {
    this.clearSelectedTestCase();
    this.SelectedTestChange.emit(this.selectedTest);
    this.testcaseService.getTestCasesList(this.selectedTest);
    this.testcaseService.clearTestCase();
  }

  // fired when the selected test case id changes
  selectedTestCaseChange() {
    this.SelectedTestCaseChange.emit(this.selectedTestCase);
    this.refreshTestCase();
    this.testcaseService.getTestCase(this.selectedTest, this.selectedTestCase);
    this.settingsService.clearFocus();
  }

  // get the corresponding test case according to the selection
  refreshTestCase() {
    if (this.selectedTest != null && this.testService.testExists(this.selectedTest)) {
      if (this.selectedTestCase != null && this.testcaseService.selectedTestCaseExist(this.selectedTestCase)) {
        this.testcaseService.getTestCase(this.selectedTest, this.selectedTestCase);
      }
    } else {
      this.testcase = null;
      this.testcaseService.observableTestCase.next(this.testcase);
    }
  }

  // search function for test case id select
  customSearchFn(term: string, item: TestCaseHeader) {
    term = term.toLocaleLowerCase();
    return item.testCase.toLocaleLowerCase().indexOf(term) > -1 || item.description.toLocaleLowerCase().indexOf(term) > -1 || item.status.toLocaleLowerCase() === term;
  }

  /** duplicateTestCaseHeader
   * * Open side content in duplicate mode for the selected testcase (must be one)
   * @param test the test folder to duplicate, information from selection
   * @param testcase the test case id to duplicate, information from selection
   */
  duplicateTestCaseHeader(test: string, testcase: string): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testcaseheader: this.testcase.info,
      mode: INTERACTION_MODE.DUPLICATE,
      selectedTab: 'Definition',
    });
    this.sideContentService.openSideBlock();
  }

  /** BugTestCaseHeader
   * * Open side content in edit mode for the selected testcase (must be one)
   * @param test the test folder to edit, information from selection
   * @param testcase the test case id to edit, information from selection
   */
  bugTestCaseHeader(test: string, testcase: string): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testcaseheader: this.testcase.info,
      mode: INTERACTION_MODE.EDIT,
      selectedTab: 'Bugs',
    });
    this.sideContentService.openSideBlock();
  }

  /** TagTestCaseHeader
  * * Open side content in edit mode for the selected testcase (must be one)
  * @param test the test folder to edit, information from selection
  * @param testcase the test case id to edit, information from selection
  */

  tagTestCaseHeader(test: string, testcase: string): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testcaseheader: this.testcase.info,
      mode: INTERACTION_MODE.EDIT,
      selectedTab: 'Labels',
    });
    this.sideContentService.openSideBlock();
  }

  /** SettingTestCaseHeader
  * * Open side content in edit mode for the selected testcase (must be one)
  * @param test the test folder to edit, information from selection
  * @param testcase the test case id to edit, information from selection
  */
  settingTestCaseHeader(test: string, testcase: string): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testcaseheader: this.testcase.info,
      mode: INTERACTION_MODE.EDIT,
      selectedTab: 'Settings',
    });
    this.sideContentService.openSideBlock();
  }

  /** DeleteTestCaseHeader
  * @param test the test folder to delete, information from selection
  * @param testcase the test case id to delete, information from selection
  */
  deleteTestCase(test: string, testcase: string): void {
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Delete Test Case';
    modalRef.componentInstance.text = 'Do you want to delete Test Case ' + test + '" - "' + testcase + '" ?';
    modalRef.componentInstance.fct = () => {
      this.testcaseService.deleteTestCase(
        test,
        testcase,
        () => {
          this.notificationService.createANotification('The testCase ' + test + ' - ' + testcase + ' has been successfully deleted', NotificationStyle.Success);
        }
      );
    };
  }

  // send an event to the parent component to save the script
  sendSaveScriptEvent() {
    this.SaveScriptEvent.emit();
  }
}
