import { Component, OnInit, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/model/front/column.model';
import { TestFoldersColumnsData } from 'src/app/feat-design/testfolders/testfolders.columnsdata';
import { TestFolder } from 'src/app/shared/model/back/testfolder/test.model';
import { Subject } from 'rxjs';
import { DatatablePageComponent } from 'src/app/shared/datatable-page/datatable-page.component';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/api/sidecontent.service';
import { TestfolderInteractionComponent } from './testfolder-interaction/testfolder-interaction.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent, ModalType } from 'src/app/shared/custom-modal/custom-modal.component';
import { TestService } from 'src/app/core/services/api/test/test.service';
import { NotificationService } from 'src/app/core/services/utils/notification.service';

@Component({
  selector: 'app-testfolders',
  templateUrl: './testfolders.component.html',
  styleUrls: ['./testfolders.component.scss']
})
export class TestfoldersComponent implements OnInit {

  /** list of columns (defined on a another file: `testcaselist.columnsdata.ts`) */
  public columns: Array<Column> = TestFoldersColumnsData;

  /** default sort direction and property */
  public defaultPageSort = [{ dir: 'asc', prop: 'test' }];

  public selectedRows: Array<TestFolder> = [];

  /** API endpoint to fetch the table information */
  public servlet: string;

  /** the observable to refresh the table */
  public refreshResultsEvent: Subject<void> = new Subject<void>();

  /** child datatable component */
  @ViewChild(DatatablePageComponent, { static: false }) private datatablepageComponent: DatatablePageComponent;

  constructor(
    private headerTitleService: HeaderTitleService,
    private sideContentService: SidecontentService,
    private modalService: NgbModal,
    private testService: TestService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.servlet = '/ReadTest';
    this.headerTitleService.setTitle('Testcase List', 'tcList');
  }

  /**
  * refresh datatable results
  */
  refreshResults(): void {
    this.refreshResultsEvent.next();
  }

  /**
  * open the side content in creation mode
  */
  createTestFolder(): void {
    this.sideContentService.addComponentToSideBlock(TestfolderInteractionComponent, {
      mode: INTERACTION_MODE.CREATE,
      testfolder: new TestFolder(),
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  /**
   * open the side content in edition mode with the test folder object to edit
   * @param testfolder object to edit
   */
  editTestFolder(testfolder: TestFolder): void {
    this.sideContentService.addComponentToSideBlock(TestfolderInteractionComponent, {
      mode: INTERACTION_MODE.EDIT,
      testfolder: testfolder,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  /**
   * open a modal to confirm the deletion of a test folder
   * @param testfolder object to delete
   */
  deleteTestFolder(testfolder: TestFolder): void {

    // create and open the modal object
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Delete Test Folder';
    modalRef.componentInstance.subtitle = 'Are you sure to delete ' + testfolder.test + '?';
    modalRef.componentInstance.subtitle2 = 'All corresponding test cases will be deleted as well';
    modalRef.componentInstance.modalType = ModalType.Confirm;
    modalRef.componentInstance.confirmFunction = () => {
      this.testService.deleteTestFolder(
        testfolder.test,
        (response) => {
          this.notificationService.cerberusAPINotification(response.messageType, response.message);
          this.refreshResults();
        }
      );
    };
  }
}
