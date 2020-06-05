import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { SidecontentService, INTERACTION_MODE } from '../../../core/services/api/sidecontent.service';
import { TestcaseInteractionComponent } from '../testcase-interaction/testcase-interaction.component';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { MassActionField } from './massactions/massactions.model';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  // the array with all the selected rows
  // the object type depends on the table (ex: test case)
  @Input('selectedRows') selectedRows: Array<any>;

  // event that will be triggered when go to script button is clicked
  // sends the correct row to the parent component to use its function
  @Output() redirectToScriptButtonClicked = new EventEmitter<TestCase>();

  /** variable to handle the display of the current mass action field */
  public currentMassAction: MassActionField;

  /** instance of the Mass Actions fields enumeration */
  public MassActionField: typeof MassActionField = MassActionField;

  constructor(
    private sideContentService: SidecontentService,
    private notificationService: NotificationService,
    private testService: TestcaseService
  ) { }

  ngOnInit() {
    this.currentMassAction = null;
  }

  /**
   * toggle the current mass action field (status, executor...)
   * @param key string of the field
   */
  toggleMassActionField(key: MassActionField) {
    // the user is selecting a field already active
    if (this.currentMassAction === key) {
      // hide the mass action field
      this.currentMassAction = null;
    } else {
      // set the current mass action field
      this.currentMassAction = key;
    }
  }

  // return the selected rows to the view
  // returns undefined if the array is empty
  getSelection(): Array<TestCase> {
    if (this.selectedRows) {
      if (this.selectedRows.length > 0) {
        return this.selectedRows;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  /** editTestCaseHeader
 * * Open side content in edition mode for the selected testcase (must be one)
 * * sends only the test folder and test case id to the component
 */
  editTestCaseHeader(): void {
    // execute only if one test case is selected
    if (this.getSelection().length === 1) {
      const testcase = this.selectedRows[0];
      this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
        test: testcase.test,
        testcase: testcase.testCase,
        mode: INTERACTION_MODE.EDIT,
      });
      this.sideContentService.openSideBlock();
    }
  }

  /** duplicateTestCaseHeader
  * * Open side content in duplicate mode for the selected testcase (must be one)
  * * sends only the test folder and test case id to the component
  */
  duplicateTestCaseHeader(): void {
    // execute only if one test case is selected
    if (this.getSelection().length === 1) {
      const testcase = this.selectedRows[0];
      this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
        test: testcase.test,
        testcase: testcase.testCase,
        mode: INTERACTION_MODE.DUPLICATE,
      });
      this.sideContentService.openSideBlock();
    }
  }

  // delete the test case (mass deletion isn't possible)
  deleteTestCase(testcaseheader: TestCase) {
    let notifStyle = NotificationStyle.Info;
    this.testService.deleteTestCase(testcaseheader.test, testcaseheader.testCase, (message, status) => {
      switch (status) {
        case 'OK': { notifStyle = NotificationStyle.Success; break; }
        case 'KO': { notifStyle = NotificationStyle.Error; break; }
      }
      this.notificationService.createANotification(message, notifStyle);
      // TODO: refresh the table content
    });

  }

  // send the row to the testcaselist component
  // to use its redirect function
  redirectToScript(row: TestCase) {
    this.redirectToScriptButtonClicked.emit(row);
  }

  debug() {
    console.log(this.selectedRows);
  }

  runTestCases(selectedRows) {
    this.notificationService.createANotification('This feature hasn\'t been implemented', NotificationStyle.Info, true);
    // work in progress
    // this.sideContentService.addComponentToSideBlock(RunComponent, { testCases: selectedRows });
    // this.sideContentService.openSideBlock();
  }
}
