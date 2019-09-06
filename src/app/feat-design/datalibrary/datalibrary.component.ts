import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { DataLibColumnsData } from './datalibrary.columnsdata';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';
import { DatalibInteractionComponent, MODE } from './datalib-interaction/datalib-interaction.component';
import { SidecontentService } from 'src/app/core/services/crud/sidecontent.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent } from 'src/app/shared/custom-modal/custom-modal.component';
import { DatalibTclistComponent } from './datalib-interaction/datalib-tclist/datalib-tclist.component';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';

@Component({
  selector: 'app-datalibrary',
  templateUrl: './datalibrary.component.html',
  styleUrls: ['./datalibrary.component.scss']
})
export class DatalibraryComponent implements OnInit {

  columns: Array<Column> = DataLibColumnsData; // get all columns from `datalibrary.columnsdata.ts`

  // *** parameters for the `datatable-page` component ***

  defaultPageSort = [{ dir: "asc", prop: "testDataLibID" }];
  servlet = '/ReadTestDataLib'; // the api to call to get datalib list
  refreshResultsEvent: Subject<void> = new Subject<void>(); // the event to emit to refresh the table

  refreshResults() {
    this.refreshResultsEvent.next()
  }

  constructor(
    private headerTitleService: HeaderTitleService,
    private sideContentService: SidecontentService,
    private modalService: NgbModal,
    private testService: TestService,
    private NotificationService: NotificationService
  ) {
    headerTitleService.setTitle("Data Library");
  }

  ngOnInit() { }

  /** createDatalib
   * * Open side content for datalib creation
   */
  createDatalib() {
    this.sideContentService.addComponentToSideBlock(DatalibInteractionComponent, {
      datalib: {},
      mode: MODE.CREATE,
      exit: () => {
        this.refreshResults();
        this.NotificationService.createANotification('The datalib has been successfully created', NotificationStyle.Success);
      }
    });
    this.sideContentService.openSideBlock();
  }

  // *********************************
  // *** End Row buttons functions ***  
  // *********************************

  /**
   * editDataLib
   * * open side content to edit this datalib
   * @param row datalib to edit
   */
  editDataLib(row: any): void {
    this.sideContentService.addComponentToSideBlock(DatalibInteractionComponent, {
      datalib: row,
      mode: MODE.EDIT,
      exit: () => {
        this.refreshResults();
        this.NotificationService.createANotification('The datalib has been successfully edited', NotificationStyle.Success);
      }
    });
    this.sideContentService.openSideBlock();
  }

  /**
   * duplicateDataLib
   * * open side content to duplpicate this datalib
   * @param row datalib to duplicate
   */
  duplicateDataLib(row: any): void {
    this.sideContentService.addComponentToSideBlock(DatalibInteractionComponent, {
      datalib: row,
      mode: MODE.DUPLICATE,
      exit: () => {
        this.refreshResults();
        this.NotificationService.createANotification('The datalib has been successfully duplicated', NotificationStyle.Success);
      }
    });
    this.sideContentService.openSideBlock();
  }

  /**
   * deleteDataLib
   * * open modal to delete datalib
   * @param row datalib to delete
   */
  deleteDataLib(row: any) {
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Delete Test Data Library Entry';
    modalRef.componentInstance.text = "Do you want to delete Test Data Library '" + row.name + "' \
    of system '" + row.system + "' (ID : " + row.testDataLibID + ") ?";
    modalRef.componentInstance.fct = () => {
      this.testService.deleteTestDataLib(
        row.testDataLibID,
        () => { this.refreshResults() }
      );
      this.NotificationService.createANotification('The datalib ' + row.name + ' (ID :' + row.testDataLibID + ') has been successfully deleted', NotificationStyle.Success);
    };
  }

  /** openTCList
   * * open the testcase list link wich use the datalib in the side content
   * @param datalib the selected datalib 
   */
  openTCList(datalib): void {
    this.sideContentService.addComponentToSideBlock(DatalibTclistComponent, {
      id: datalib.testDataLibID,
      name: datalib.name,
      country: datalib.country
    });
    this.sideContentService.openSideBlock();
  }



}
