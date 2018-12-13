import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITestCase, ITestCaseHeader } from 'src/app/model/testcase.model';
import { ITest } from 'src/app/model/test.model';
import { TestService } from 'src/app/services/crud/test.service';

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
  @Output() TestCaseChange = new EventEmitter<ITestCase>();

  public testsList: Array<ITest>;
  public testcasesList: Array<ITestCaseHeader>;
  public testcase: ITestCase;

  constructor(private TestService: TestService) {
  }

  ngOnInit() {

    this.TestService.observableTestsList
      .subscribe(response => {
        this.testsList = response;
        if (this.testsList.length != 0) {
          if (this.selectedTest != null) {
            if (!this.TestService.seletectedTestExist(this.selectedTest)) {
              //this.MessageService.displayMessage("The selected Test doesn't exist", false);
              this.cleanSelectedTest();
            }
          }
        }
      });

    this.TestService.observableTestCasesList
      .subscribe(response => {
        this.testcasesList = response;
        if (this.testsList.length != 0) {
          if (this.selectedTest != null) {
            if (this.testcasesList != null) {
              if (this.selectedTestCase != null) {
                if (!this.TestService.selectedTestCaseExist(this.selectedTestCase)) {
                  //this.MessageService.displayMessage("The selected Test Case doesn't exist", false);
                  this.cleanSelectedTestCase();
                }
              }
            }
          }
        }
      });

    this.TestService.observableTestCase.subscribe(response => { this.testcase = response; });
  }

  cleanSelectedTest() {
    this.selectedTest = null;
    this.SelectedTestChange.emit(this.selectedTest);
  }

  cleanSelectedTestCase() {
    this.selectedTestCase = null;
    this.SelectedTestCaseChange.emit(this.selectedTestCase);
  }

  selectedTestChange() {
    this.cleanSelectedTestCase();
    this.SelectedTestChange.emit(this.selectedTest);
    this.TestService.getTestCasesByTest(this.selectedTest);
    this.TestService.cleanTestCase();
  }

  selectedTestCaseChange() {
    this.SelectedTestCaseChange.emit(this.selectedTestCase);
  }

}