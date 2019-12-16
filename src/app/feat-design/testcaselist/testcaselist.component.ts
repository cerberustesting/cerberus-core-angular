import { Component, OnInit } from '@angular/core';
import { TestService } from '../../core/services/crud/test.service';
import { Column } from 'src/app/shared/model/column.model';
import { TestCasesColumnsData } from './testcaselist.columnsdata';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';
import { Subject } from 'rxjs';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/crud/sidecontent.service';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { TestcaseInteractionComponent } from './testcase-interaction/testcase-interaction.component';
import { CustomModalComponent } from 'src/app/shared/custom-modal/custom-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ITestCaseHeader } from 'src/app/shared/model/testcase.model';

@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {


  columns: Array<Column> = TestCasesColumnsData; // column list from `testcaselist.columnsdata.ts`
  defaultPageSort = [{ dir: 'asc', prop: 'testCase' }];
  selectedRows: Array<any> = []; // the selected rows in the table
  servlet: string;  // const : the api to call to refresh datatable results
  refreshResultsEvent: Subject<void> = new Subject<void>(); // the observable to refresh the table

  constructor(
    private headerTitleService: HeaderTitleService,
    private sideContentService: SidecontentService,
    private modalService: NgbModal,
    private testService: TestService,
    private notificationService: NotificationService,
    private router: Router) {
  }

  ngOnInit() {
    this.servlet = '/ReadTestCase';
    this.headerTitleService.setTitle('Testcase List', 'tcList');
  }

  /** refreshResults
   * * refresh datatable results
   */
  refreshResults(): void {
    this.refreshResultsEvent.next();
  }

  /** editTestCaseHeader
   * * Open side content in edition mode for the selected testcase (must be one)
   * * sends only the test folder and test case id to the component
   * @param testcase the testcase to edit, information from table row
   */
  editTestCaseHeader(testcase: any): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      test: testcase.test,
      testcase: testcase.testCase,
      mode: INTERACTION_MODE.EDIT,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  /** duplicateTestCaseHeader
   * * Open side content in duplicate mode for the selected testcase (must be one)
   * @param testcase the testcase to duplicate, information from table row
   */
  duplicateTestCaseHeader(testcase: any): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      test: testcase.test,
      testcase: testcase.testCase,
      mode: INTERACTION_MODE.DUPLICATE,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  /** createTestCaseHeader
   * * Open sde content in create mode for the selected testcase
   * @param testcase the test to create
   */
  createTestCaseHeader(): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testCase: {},
      mode: INTERACTION_MODE.CREATE,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  /** deleteTestCase
   * * Open custom modal to delete testCase
   * @param testcase the TestCase to delete
   */
  deleteTestCase(testcase: any): void {
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Delete Test Case';
    modalRef.componentInstance.text = 'Do you want to delete Test Case ' + testcase.test + '" - "' + testcase.testCase + '" ?';
    modalRef.componentInstance.fct = () => {
      this.testService.deleteTestCase(
        testcase.test,
        testcase.testCase,
        () => {
          this.refreshResults();
          this.notificationService.createANotification('The testCase ' + testcase.test + ' - ' + testcase.testCase + ' has been successfully deleted', NotificationStyle.Success);
        }
      );
    };
  }

  // redirect to the corresponding script page
  redirectToTestCaseScript(row: ITestCaseHeader) {
    const test = encodeURIComponent(row.test);
    const testcase = encodeURIComponent(row.testCase);
    this.router.navigate(['/design/testcasescript/' + test + '/' + testcase]);
  }

}


