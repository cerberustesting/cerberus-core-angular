import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { TestFolder } from 'src/app/shared/model/back/testfolder/test.model';
import { TestService } from 'src/app/core/services/api/test/test.service';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { SettingsService } from '../testcasecontent/settings/settings.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { NotificationService } from 'src/app/core/services/utils/notification.service';

@Component({
  selector: 'app-testcaseselector',
  templateUrl: './testcaseselector.component.html',
  styleUrls: ['./testcaseselector.component.scss']
})
export class TestCaseSelectorComponent implements OnInit, OnDestroy {

  /** currently selected test folder */
  @Input('selectedTest') selectedTest: string;

  /** currently selected test case id */
  @Input('selectedTestCase') selectedTestCase: string;

  // testcase object according to test folder and testcase id
  @Input('testcase') testcase: TestCase;

  // events fired when the test folder and test case id values change
  @Output() SelectedTestChange = new EventEmitter<string>();
  @Output() SelectedTestCaseChange = new EventEmitter<string>();

  // list of test folders
  public testsList: Array<TestFolder>;

  // list of testcase id corresponding to the selected test folder
  public testcasesList: Array<TestCase>;

  constructor(
    private testService: TestService,
    private testcaseService: TestcaseService,
    private settingsService: SettingsService,
    private notificationService: NotificationService
  ) { }

  ngOnDestroy() {
    // empty the testcase object (to avoid old values to be displayed when getting back on the page)
    this.testcase = undefined;
    this.selectedTest = undefined;
    this.selectedTestCase = undefined;
  }

  ngOnInit() {

    // refresh the test folders list
    this.testService.refreshTestFolders();

    // instantiate the test case array
    this.testcasesList = new Array<TestCase>();

    // subscription to test folder list
    this.testService.observableTestsList.subscribe(response => {
      if (response) {
        this.testsList = response;
        // if the selected test folder isn't null, it has been passed in URL
        if (this.selectedTest != null) {
          if (!this.testService.testExists(this.selectedTest, this.testsList)) {
            console.error('the selected test doesn\'t exist');
            this.notificationService.createANotification('The selected test doesn\'t exist', NotificationStyle.Error, undefined, true, 5000);
            this.selectedTest = null;
          } else {
            // refresh the test case id list to choose from
            this.testcaseService.refreshTestCasesForATestFolder(this.selectedTest);
          }
        }
      }
    });

    // subscription to test case id list
    this.testcaseService.observableTestCasesList.subscribe(response => {
      if (response) {
        // update the test cases list
        this.testcasesList = response;
        // if test cases id have been found for the test folder
        if (this.testcasesList.length > 0) {
          // if the selected test case id isn't null, it has been passed in URL
          if (this.selectedTestCase != null && this.selectedTest != null) {
            if (!this.testcaseService.selectedTestCaseExist(this.selectedTestCase, this.testcasesList)) {
              console.log('the selected test case doesn\'t exist');
              this.notificationService.createANotification('The selected test case doesn\t exist', NotificationStyle.Error, undefined, true, 5000);
              this.selectedTestCase = null;
            }
          }
        } else {
          // if no test case id have been found for the selected test folder
          if (this.selectedTest != null) {
            console.log('there is no corresponding test case for this test');
            // this.notificationService.createANotification('There is no corresponding test case for this test', NotificationStyle.Warning, true, 5000);
          }
        }
      }
    });
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
    this.testcaseService.refreshTestCasesForATestFolder(this.selectedTest);
  }

  // fired when the selected test case id changes
  selectedTestCaseChange() {
    this.SelectedTestCaseChange.emit(this.selectedTestCase);
    // make sure to clear the focus of the script/settings comp
    this.settingsService.clearFocus();
  }

  // search function for test case id select
  customSearchFn(term: string, item: TestCase) {
    term = term.toLocaleLowerCase();
    return item.testCase.toLocaleLowerCase().indexOf(term) > -1 || item.description.toLocaleLowerCase().indexOf(term) > -1 || item.status.toLocaleLowerCase() === term;
  }

}
