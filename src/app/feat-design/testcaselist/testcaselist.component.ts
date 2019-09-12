import { Component, OnInit } from '@angular/core';
import { TestService } from '../../core/services/crud/test.service';
import { ITestCaseHeader } from '../../shared/model/testcase.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { Column } from 'src/app/shared/model/column.model';
import { LabelfilteringPipe } from 'src/app/shared/pipes/labelfiltering.pipe';
import { Filter } from 'src/app/shared/model/filter.model';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';
import { TestCasesColumnsData } from './testcaselist.columnsdata';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';
import { Subject } from 'rxjs';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/crud/sidecontent.service';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { TestcaseInteractionComponent} from './testcase-interaction/testcase-interaction.component';
import { CustomModalComponent } from 'src/app/shared/custom-modal/custom-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {


  columns: Array<Column> = TestCasesColumnsData; // column list from `testcaselist.columnsdata.ts`  
  defaultPageSort = [{dir: "asc", prop : "testCase"}];
  selectedRows: Array<any> = []; // the selected rows in the table
  servlet :string = '/ReadTestCase'; //const : the api to call to refresh datatable results
  refreshResultsEvent: Subject<void> = new Subject<void>(); //the observable to refresh the table
  
  constructor(
    private headerTitleService: HeaderTitleService,
    private sideContentService: SidecontentService,
    private modalService: NgbModal,
    private testService: TestService,
    private NotificationService: NotificationService) { 
    this.headerTitleService.setTitle("Testcase List");
  }

  ngOnInit() {
  }

  /** refreshResults
   * * refresh datatable results
   */
  refreshResults(): void {
    this.refreshResultsEvent.next()
  }
  
  /** editTestCaseHeader
   * * Open sde content in edition mode for the selected testcase
   * @param testcase the test to edit
   */
  editTestCaseHeader(testcase: any): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testCase: testcase,
      mode: INTERACTION_MODE.EDIT,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  /** duplicateTestCaseHeader
   * * Open sde content in duplicate mode for the selected testcase
   * @param testcase the test to duplicate
   */
  duplicateTestCaseHeader(testcase: any): void {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testCase: testcase,
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
    modalRef.componentInstance.text = "Do you want to delete Test Case " + testcase.test + "' - '" + testcase.testCase + "' ?";
    modalRef.componentInstance.fct = () => {
      this.testService.deleteTestCase(
        testcase.test,
        testcase.testCase,
        () => {
          this.refreshResults();
          this.NotificationService.createANotification('The testCase '+ testcase.test +' - ' + testcase.testCase + ' has been successfully deleted', NotificationStyle.Success);
        }
      );
    };
  }
}
