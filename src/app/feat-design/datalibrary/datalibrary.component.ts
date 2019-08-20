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
import { DatalibEditComponent } from './datalib-edit/datalib-edit.component';
import { SidecontentService } from 'src/app/core/services/crud/sidecontent.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent } from 'src/app/shared/custom-modal/custom-modal.component';
import { DatalibTclistComponent } from './datalib-edit/datalib-tclist/datalib-tclist.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datalibrary',
  templateUrl: './datalibrary.component.html',
  styleUrls: ['./datalibrary.component.scss']
})
export class DatalibraryComponent implements OnInit {

  columns = DataLibColumnsData;
  page = {
    size: 0, //maximum element per page
    number: 1, //number of current page
    sort: [{ dir: "asc", prop: "testDataLibID" }], //sort item
    totalCount: 0 //total count of element in database
  };
  rows = [];
  selectedRows = [];
  filterList: Array<Filter> = [];
  globalSearch = ''; // value in global search field
  filterTest: any; //
  servlet = '/ReadTestDataLib';
  private refreshResultsEvent: Subject<void> = new Subject<void>();
  
  refreshResults() {
    this.refreshResultsEvent.next()
  }

  constructor(
    private headerTitleService: HeaderTitleService,
    private sideContentService: SidecontentService,
    private modalService: NgbModal,
    private testService: TestService
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
    this.sideContentService.addComponentToSideBlock(DatalibEditComponent, {
      datalib: row,
      type: 'EDIT',
      exit: () => this.refreshResults()
    });
    this.sideContentService.openSideBlock();
  }

  /**
   * duplicateDataLib
   * * open side content to duplpicate this datalib
   * @param row datalib to duplicate
   */
  duplicateDataLib(row: any): void {
    this.sideContentService.addComponentToSideBlock(DatalibEditComponent, {
      datalib: row,
      type: 'DUPLICATE',
      exit: () => this.refreshResults()
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
    modalRef.componentInstance.fct = () => { this.testService.deleteTestDataLib(row.testDataLibID, () => this.refreshResults()); };
  }

  /** createDatalib
   * * Open side  content for datalib creation
   */
  createDatalib() {
    this.sideContentService.addComponentToSideBlock(DatalibEditComponent, {
      datalib: {},
      type: 'CREATE',
      exit: () => this.refreshResults()
    });
    this.sideContentService.openSideBlock();
  }

}
