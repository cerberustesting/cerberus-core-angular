import { Component, Input, EventEmitter, Output } from '@angular/core';
import { RunComponent } from '../../../shared/run/run.component';
import { SidecontentService, INTERACTION_MODE } from '../../../core/services/crud/sidecontent.service';
import { TestcaseInteractionComponent } from '../testcase-interaction/testcase-interaction.component';
import { ITestCaseHeader } from 'src/app/shared/model/testcase.model';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { TestService } from 'src/app/core/services/crud/test.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  // the array with all the selected rows
  // the object type depends on the table (ex: test case)
  @Input('selectedRows') selectedRows: Array<any>;

  // event that will be triggered when go to script button is clicked
  // sends the correct row to the parent component to use its function
  @Output() redirectToScriptButtonClicked = new EventEmitter<ITestCaseHeader>();

  constructor(
    private sideContentService: SidecontentService,
    private notificationService: NotificationService,
    private testService: TestService
  ) { }

  // return the selected rows to the view
  // returns undefined if the array is empty
  getSelection(): Array<any> {
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
  deleteTestCase(testcaseheader: ITestCaseHeader) {
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
  redirectToScript(row: ITestCaseHeader) {
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
