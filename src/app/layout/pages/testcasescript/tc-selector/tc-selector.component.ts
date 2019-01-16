import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITestCase, ITestCaseHeader } from 'src/app/model/testcase.model';
import { ITest } from 'src/app/model/test.model';
import { TestService } from 'src/app/services/crud/test.service';
import { AlertService, Alert } from 'src/app/services/utils/alert.service';

const Alert_selectedTestDoesNotExist: Alert = { message: "The selected test doesn't exist", style: "alert-danger", duration: 5000, animationIn: "shake" }
const Alert_selectedTestCaseDoesNotExist: Alert = { message: "The selected test case doesn't exist", style: "alert-danger", duration: 5000, animationIn: "shake" }
const Alert_noTestCaseForATest: Alert = { message: "There is no corresponding test case for this test", style: "alert-warning", duration: 5000 }

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
    private AlertService: AlertService
  ) {}

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
              console.log("the selected test doesn't exist");
              this.AlertService.displayMessage(Alert_selectedTestDoesNotExist);
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
              console.log("the selected test case doesn't exist");
              this.AlertService.displayMessage(Alert_selectedTestCaseDoesNotExist);
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
            console.log("there is no corresponding test case for this test");
          this.AlertService.displayMessage(Alert_noTestCaseForATest);
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

  debug() {
    console.log("Test: " + this.selectedTest + " Testcase: " + this.selectedTestCase);
  }

}