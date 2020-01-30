import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ITestCase, ITestCaseHeader } from 'src/app/shared/model/testcase.model';
import { ITest } from 'src/app/shared/model/test.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { SettingsService } from '../tc-script/settings/settings.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/crud/sidecontent.service';
import { TestcaseInteractionComponent } from 'src/app/feat-design/testcaselist/testcase-interaction/testcase-interaction.component';

@Component({
  selector: 'app-tc-selector',
  templateUrl: './tc-selector.component.html',
  styleUrls: ['./tc-selector.component.scss']
})
export class TcSelectorComponent implements OnInit, OnDestroy {

  // selected test folder and testcase
  @Input('test') selectedTest: string;
  @Input('testcase') selectedTestCase: string;

  // event fired when the test and testcase value change
  @Output() SelectedTestChange = new EventEmitter<string>();
  @Output() SelectedTestCaseChange = new EventEmitter<string>();

  // list of test folders
  public testsList: Array<ITest>;
  // list of testcase id corresponding to the selected test folder
  public testcasesList: Array<ITestCaseHeader>;
  // testcase object according to test folder and testcase id
  public testcase: ITestCase;

  constructor(
    private testService: TestService,
    private settingsService: SettingsService,
    private notificationService: NotificationService,
    private sideContentService: SidecontentService
  ) { }

  ngOnDestroy() {
    this.testcase = null;
    this.testService.observableTestCase.next(this.testcase);
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
            if (!this.testService.seletectedTestExist(this.selectedTest)) {
              console.error('the selected test doesn\'t exist');
              this.notificationService.createANotification('The selected test doesn\'t exist', NotificationStyle.Error, true, 5000);
              // this.AlertService.displayMessage(Alert_selectedTestDoesNotExist);
              this.selectedTest = null;
            } else {
              this.SelectedTestChange.emit(this.selectedTest);
              this.testService.getTestCasesList(this.selectedTest);
            }
          }
        }
      } else {
        this.testsList = null;
      }
    });

    // subscription to test case id list changes
    this.testService.observableTestCasesList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.testcasesList = response;
          // secure the parsed test case from URL
          if (this.selectedTestCase != null && this.selectedTest != null) {
            if (!this.testService.selectedTestCaseExist(this.selectedTestCase)) {
              console.error('the selected test case doesn\'t exist');
              this.notificationService.createANotification('The selected test casedoesn\t exist', NotificationStyle.Error, true, 5000);
              // this.AlertService.displayMessage(Alert_selectedTestCaseDoesNotExist);
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
          if (this.testService.seletectedTestExist(this.selectedTest)) {
            console.warn('there is no corresponding test case for this test');
          }
          this.notificationService.createANotification('There is no corresponding test case for this test', NotificationStyle.Warning, true, 5000);
          // this.AlertService.displayMessage(Alert_noTestCaseForATest);
        }
      }
    });

    // subscribe to testcase object (updated when combination of test folder & id changes)
    this.testService.observableTestCase.subscribe(response => { this.testcase = response; });
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
    this.testService.getTestCasesList(this.selectedTest);
    this.testService.clearTestCase();
  }

  // fired when the selected test case id changes
  selectedTestCaseChange() {
    this.SelectedTestCaseChange.emit(this.selectedTestCase);
    this.refreshTestCase();
    this.testService.getTestCase(this.selectedTest, this.selectedTestCase);
    this.settingsService.clearFocus();
  }

  // get the corresponding test case according to the selection
  refreshTestCase() {
    if (this.selectedTest != null && this.testService.seletectedTestExist(this.selectedTest)) {
      if (this.selectedTestCase != null && this.testService.selectedTestCaseExist(this.selectedTestCase)) {
        this.testService.getTestCase(this.selectedTest, this.selectedTestCase);
      }
    } else {
      this.testcase = null;
      this.testService.observableTestCase.next(this.testcase);
    }
  }

  // search function for test case id select
  customSearchFn(term: string, item: ITestCaseHeader) {
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
      test: test,
      testcase: testcase,
      mode: INTERACTION_MODE.DUPLICATE
    });
    this.sideContentService.openSideBlock();
  }

  /** BugTestCaseHeader
   * * Open side content in duplicate mode for the selected testcase (must be one)
   * @param test the test folder to duplicate, information from selection
   * @param testcase the test case id to duplicate, information from selection
   */
  bugTestCaseHeader(test: string, testcase: string): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      test: test,
      testcase: testcase,
      mode: INTERACTION_MODE.EDIT
    });
    this.sideContentService.openSideBlock();
  }

  /** TagTestCaseHeader
  * * Open side content in duplicate mode for the selected testcase (must be one)
  * @param test the test folder to duplicate, information from selection
  * @param testcase the test case id to duplicate, information from selection
  */
  tagTestCaseHeader(test: string, testcase: string): void {
    console.log(test);
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      test: test,
      testcase: testcase,
      mode: INTERACTION_MODE.EDIT
    });
    this.sideContentService.openSideBlock();
  }
}
