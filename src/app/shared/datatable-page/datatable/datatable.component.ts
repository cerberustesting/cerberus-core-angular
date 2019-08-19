import { Component, Input, OnInit, ViewChild, Output, EventEmitter, HostBinding } from '@angular/core';
import { Column } from '../../model/column.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatalibTclistComponent } from '../utils/datalib-tclist/datalib-tclist.component';
import { SidecontentService } from 'src/app/core/services/crud/sidecontent.service';
import { DatalibEditComponent } from '../utils/datalib-edit/datalib-edit.component';
import { CustomModalComponent } from '../../custom-modal/custom-modal.component';
import { TestService } from 'src/app/core/services/crud/test.service';

@Component({
  selector: 'app-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Input() rows: any[];
  @Input() columns: Array<Column>
  @Input() testcaseslist: boolean;
  @Input() massAction: boolean;
  @Input() selection: boolean;
  @Input() page: {
    size: number,
    number: number,
    sort: number,
    totalCount: number
  };
  @Input() selected: Array<any>;
  @Output() pageUpdate = new EventEmitter<number>();
  @Output() sort = new EventEmitter<void>();
  @ViewChild("dataTable", { static: true }) table: any;
  @Input() name?: string;
  columnActive: number;

  constructor(
    private modalService: NgbModal,
    private sideContentService: SidecontentService,
    private testService: TestService) { }

  ngOnInit() {
    this.columnActive = this.columns.filter(a => a.active).length;
  }

  /**
   * toggleColumn
   * * toggle colmn display from column selector
   * @param column column to toggle
   */
  toggleColumn(column: Column): void {
    column.active = !column.active;
    this.columnActive = this.columns.filter(a => a.active).length;
  }

  /**
   * applyChange
   * * Update changes
   */
  applyChange(): void {
    this.pageUpdate.emit(this.page.number);
  }

  /**
   * onSelect
   * * Add new selected event to the list
   * @param param0 ?
   */
  onSelect({ selected }): void {
    if (selected) {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
    }
  }

  /**
   * addFilter
   * * Add a select filter corresponding to the column
   * @param column column to filter
   */
  addFilter(column: Column): void {
    column.dropActive = !column.dropActive;
  }

  /**
   * addFilterLike
   * * Add a like filter corresponding to the column
   * @param column column to filter
   */
  addFilterLike(column: Column): void {
    column.fieldActive = !column.fieldActive;
  }

  /**
   * onSort
   * * emit column to sort and direction
   * @param event (generate by angular)
   */
  onSort(event): void {
    this.page.sort = event.sorts;
    this.sort.emit();
  }

  /**
   * selectAll
   * * Select all charged columns
   */
  selectAll(): void {
    for (let row of this.rows) {
      if (!this.selected.includes(row)) {
        this.selected.push(row);
      }
    }

  }

  /**
   * onPage
   * * Change current page informations
   * @param pageInfo 
   */
  onPage(pageInfo: any): void {
    this.page.number = pageInfo.offset;
    this.page.size = pageInfo.pageSize;
    this.applyChange();
  }

  // *** TestCase Methods ***

  openTCList(row): void {
    this.sideContentService.addComponentToSideBlock(DatalibTclistComponent, {
      id: row.testDataLibID,
      name: row.name,
      country: row.country
    });
    this.sideContentService.openSideBlock();
  }

  // *** Datalib Methods ***

  /**
   * editDataLib
   * * open side content to edit this datalib
   * @param row datalib to edit
   */
  editDataLib(row: any): void {
    this.sideContentService.addComponentToSideBlock(DatalibEditComponent, {
      datalib: row,
      type: 'EDIT',
      exit: () => this.sort.emit()
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
      exit: () => this.sort.emit()
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
    modalRef.componentInstance.fct = () => { this.testService.deleteTestDataLib(row.testDataLibID, () => this.sort.emit()); };
  }

}

