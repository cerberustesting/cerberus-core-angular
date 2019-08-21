import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { LabelfilteringPipe } from 'src/app/shared/pipes/labelfiltering.pipe';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';
import { Filter } from 'src/app/shared/model/filter.model';
import { DataLibColumnsData } from './datalibrary.columnsdata';
import { HeaderTitleService } from 'src/app/core/services/crud/header-title.service';
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

  columns = DataLibColumnsData;
  // TODO : create gloabl method
  page = {
    size: 0, //maximum element per page
    number: 1, //number of current page
    sort: [{ dir: "asc", prop: "testDataLibID" }], //sort item
    totalCount: 0 //total count of element in database
  };
  selectedRows = [];
  filterList: Array<Filter> = [];
  globalSearch = ''; // value in global search field
  servlet = '/ReadTestDataLib';
  private refreshResultsEvent: Subject<void> = new Subject<void>();

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


  // *** Datalib Methods ***

  openTCList(row): void {
    this.sideContentService.addComponentToSideBlock(DatalibTclistComponent, {
      id: row.testDataLibID,
      name: row.name,
      country: row.country
    });
    this.sideContentService.openSideBlock();
  }

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
        () => {this.refreshResults()}
      );
      this.NotificationService.createANotification('The datalib '+ row.name +' (ID :'+ row.testDataLibID +') has been successfully deleted', NotificationStyle.Success);
    };
  }

  /** createDatalib
   * * Open side  content for datalib creation
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

}
