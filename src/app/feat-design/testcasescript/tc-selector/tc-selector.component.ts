import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITestCase, ITestCaseHeader } from 'src/app/shared/model/testcase.model';
import { ITest } from 'src/app/shared/model/test.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { SettingsService } from '../tc-script/settings/settings.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { NotificationService } from 'src/app/core/services/utils/notification.service';

@Component({
  selector: 'app-tc-selector',
  templateUrl: './tc-selector.component.html',
  styleUrls: ['./tc-selector.component.scss']
})
export class TcSelectorComponent implements OnInit {

  @Input('test') selectedTest: string;
  @Input('testcase') selectedTestCase: string;

  @Output() SelectedTestChange = new EventEmitter<string>();
  @Output() SelectedTestCaseChange = new EventEmitter<string>();

  public testsList: Array<ITest>;
  public testcasesList: Array<ITestCaseHeader>;
  public testcase: ITestCase;

  constructor(
    private TestService: TestService,
    private SettingsService: SettingsService,
    private Notification: NotificationService
  ) { }

  ngOnDestroy() {
    this.testcase = null;
    this.TestService.observableTestCase.next(this.testcase);
    this.selectedTest = null;
    this.selectedTestCase = null;
  }

  ngOnInit() {
    this.TestService.observableTestsList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.testsList = response;
          if (this.selectedTest != null) {
            // secure the parsed test from URL
            if (!this.TestService.seletectedTestExist(this.selectedTest)) {
              console.error("the selected test doesn't exist");
              this.Notification.createANotification("The selected test doesn't exist", NotificationStyle.Error, true, 5000);
              // this.AlertService.displayMessage(Alert_selectedTestDoesNotExist);
              this.selectedTest = null;
            } else {
              this.SelectedTestChange.emit(this.selectedTest);
              this.TestService.getTestCasesList(this.selectedTest);
            }
          }
        }
      } else {
        this.testsList = null;
      }
    });

    this.TestService.observableTestCasesList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.testcasesList = response;
          // secure the parsed test case from URL
          if (this.selectedTestCase != null && this.selectedTest != null) {
            if (!this.TestService.selectedTestCaseExist(this.selectedTestCase)) {
              console.error("the selected test case doesn't exist");
              this.Notification.createANotification("The selected test casedoesn't exist", NotificationStyle.Error, true, 5000);
              // this.AlertService.displayMessage(Alert_selectedTestCaseDoesNotExist);
              this.selectedTestCase = null;
            } else {
              //this.SelectedTestChange.emit(this.selectedTest);
              this.refreshTestCase();
            }
          }
        }
      } else {
        this.testcasesList = null;
        if (this.selectedTest != null) {
          if (this.TestService.seletectedTestExist(this.selectedTest))
            console.warn("there is no corresponding test case for this test");
          this.Notification.createANotification("There is no corresponding test case for this test", NotificationStyle.Warning, true, 5000);
          // this.AlertService.displayMessage(Alert_noTestCaseForATest);
        }
      }
    });
    this.TestService.observableTestCase.subscribe(response => { this.testcase = response; });
  }

  clearSelectedTestCase() {
    this.selectedTestCase = null;
    this.SelectedTestCaseChange.emit(this.selectedTestCase);
  }

  selectedTestChange() {
    this.clearSelectedTestCase();
    this.SelectedTestChange.emit(this.selectedTest);
    this.TestService.getTestCasesList(this.selectedTest);
    this.TestService.clearTestCase();
  }

  selectedTestCaseChange() {
    this.SelectedTestCaseChange.emit(this.selectedTestCase);
    this.refreshTestCase();
    this.TestService.getTestCase(this.selectedTest, this.selectedTestCase);
    console.log("selectedTestCaseChange");
    this.SettingsService.clearFocus();
  }

  refreshTestCase() {
    if (this.selectedTest != null && this.TestService.seletectedTestExist(this.selectedTest)) {
      if (this.selectedTestCase != null && this.TestService.selectedTestCaseExist(this.selectedTestCase)) {
        this.TestService.getTestCase(this.selectedTest, this.selectedTestCase);
      }
    } else {
      this.testcase = null;
      this.TestService.observableTestCase.next(this.testcase);
    }
  }

  customSearchFn(term: string, item: ITestCaseHeader) {
    term = term.toLocaleLowerCase();
    return item.testCase.toLocaleLowerCase().indexOf(term) > -1 || item.description.toLocaleLowerCase().indexOf(term) > -1 || item.status.toLocaleLowerCase() === term;
  }

  debug() {
    console.log("Test: " + this.selectedTest + " Testcase: " + this.selectedTestCase);
  }

}
