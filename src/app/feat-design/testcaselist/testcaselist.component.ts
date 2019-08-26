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
import { HeaderTitleService } from 'src/app/core/services/crud/header-title.service';
import { Subject } from 'rxjs';
import { SidecontentService } from 'src/app/core/services/crud/sidecontent.service';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { TestcaseInteractionComponent, TESTCASE_INTERACTION_MODE } from './testcase-interaction/testcase-interaction.component';
import { CustomModalComponent } from 'src/app/shared/custom-modal/custom-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {


  columns: Array<Column> = TestCasesColumnsData; // column list
  
  
  page = {
    size: 0, //maximum element per page
    number: 1, //number of current page
    sort: [{dir: "asc", prop : "testCase"}], //sort item
    totalCount: 0 //total count of element in database
  };
  selectedRows: Array<any> = [];
  servlet :string = '/ReadTestCase'

  userPreferences: string;
  private refreshResultsEvent: Subject<void> = new Subject<void>();
  
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

  refreshResults() {
    this.refreshResultsEvent.next()
  }
  
  editTestCaseHeader(testcase) {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testCase: testcase,
      mode: TESTCASE_INTERACTION_MODE.EDIT,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }
  duplicateTestCaseHeader(testcase) {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testCase: testcase,
      mode: TESTCASE_INTERACTION_MODE.DUPLICATE,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }
  createTestCaseHeader() {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testCase: {},
      mode: TESTCASE_INTERACTION_MODE.CREATE,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  deleteTestCase(row) {
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Delete Test Case';
    modalRef.componentInstance.text = "Do you want to delete Test Case " + row.test + "' - '" + row.testCase + "' ?";
    modalRef.componentInstance.fct = () => {
      this.testService.deleteTestCase(
        row.test,
        row.testCase,
        () => {
          this.refreshResults();
          this.NotificationService.createANotification('The testCase '+ row.test +' - ' + row.testCase + ' has been successfully deleted', NotificationStyle.Success);
        }
      );
    };
  }

  

}
