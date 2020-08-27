import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Column } from '../../model/front/column.model';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';

@Component({
  selector: 'app-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Input() rows: any[];
  @Input() columns: Array<Column>; // list of all available columns to be used in the table
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
  @Input() endLineActionTemplate: any; // TODO : type TemplateRef

  @Output() pageUpdate = new EventEmitter<number>();
  @Output() sort = new EventEmitter<void>();
  @Output() columnAddedForFiltering = new EventEmitter<void>();

  @ViewChild('dataTable', { static: true }) table: any;
  @Input() name?: string;
  columnActive: number;

  constructor(private notificationService: NotificationService) { }

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

  // enable a new filter passing by parent component
  addFilter(column: Column): void {
    // add the filter only if it isn't already added
    if (column.filterDisplayed === false) {
      column.filterDisplayed = true;
      // send the event to open the filters modal
      this.columnAddedForFiltering.emit();
    } else {
      this.notificationService.createANotification('The filter is already active and accessible on the filters section.', NotificationStyle.Info, undefined, true, 2500);
    }
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
    for (const row of this.rows) {
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

  /** onActivate
   * * toggle end row buttons
   * @param event generate with angular
   */
  onActivate(event: any) {
    this.rows.forEach(r => r.activate = false);
    event.row.activate = true;
  }
}

