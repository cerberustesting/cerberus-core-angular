import { Component, OnInit, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/model/front/column.model';
import { TestCasesColumnsData } from './testcaselist.columnsdata';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';
import { Subject } from 'rxjs';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/api/sidecontent.service';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { TestcaseInteractionComponent } from './testcase-interaction/testcase-interaction.component';
import { Router } from '@angular/router';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { DatatablePageComponent } from 'src/app/shared/datatable-page/datatable-page.component';

@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {

  /** list of columns (defined on a another file: `testcaselist.columnsdata.ts`) */
  public columns: Array<Column> = TestCasesColumnsData;

  /** default sort direction and property */
  public defaultPageSort = [{ dir: 'asc', prop: 'testCase' }];

  /** the selected rows in the table */
  public selectedRows: Array<TestCase> = [];

  /** API endpoint to fetch the table information */
  public servlet: string;

  /** the observable to refresh the table */
  public refreshResultsEvent: Subject<void> = new Subject<void>();

  /** child datatable component */
  @ViewChild(DatatablePageComponent, { static: false }) private datatablepageComponent: DatatablePageComponent;

  constructor(
    private headerTitleService: HeaderTitleService,
    private sideContentService: SidecontentService,
    private notificationService: NotificationService,
    private router: Router) {
  }

  ngOnInit() {
    this.servlet = '/ReadTestCase';
    this.headerTitleService.setTitle('Testcase List', 'tcList');
  }

  /**
   * refresh datatable results
   */
  refreshResults(): void {
    this.refreshResultsEvent.next();
  }

  /**
   * open the side content in creation mode,
   * get the first row in the table to use as a template for the new test case
   */
  createTestCaseHeader(): void {
    // get the first row from the table content
    const firstRowInTable = this.datatablepageComponent.getFirstRow();
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testcaseheader: firstRowInTable,
      mode: INTERACTION_MODE.CREATE,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  /**
   * open side content in edition mode for the selected testcase,
   * sends only the test folder and test case id to the component,
   * fetch the latest information for the test case
   * @param testcase object from the table row
   */
  editTestCaseHeader(testcase: TestCase): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      test: testcase.test,
      testcase: testcase.testcase,
      mode: INTERACTION_MODE.EDIT,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  /** duplicateTestCaseHeader
   * open side content in duplication mode for the selected testcase
   * sends only the test folder and test case id to the component,
   * fetch the latest information for the test case
   * @param testcase object from the table row
   */
  duplicateTestCaseHeader(testcase: TestCase): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      test: testcase.test,
      testcase: testcase.testcase,
      mode: INTERACTION_MODE.DUPLICATE,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  /**
   * redirect to the corresponding script page
   * @param testcase object from the table row
  */
  redirectToTestCaseScript(testcase: TestCase) {
    const test = encodeURIComponent(testcase.test);
    const testcaseid = encodeURIComponent(testcase.testcase);
    this.router.navigate(['/design/testcasescript/' + test + '/' + testcaseid]);
  }

  // TODO
  runSingleTestCase(): void {
    this.notificationService.createANotification('This feature hasn\'t been implemented', NotificationStyle.Info, undefined, true);
  }
}
