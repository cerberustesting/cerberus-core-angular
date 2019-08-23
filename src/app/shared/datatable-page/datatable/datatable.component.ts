import { Component, Input, OnInit, ViewChild, Output, EventEmitter, HostBinding } from '@angular/core';
import { Column } from '../../model/column.model';
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
  @Input() endLineActionTemplate: any; // TODO : type TemplateRef

  @Output() pageUpdate = new EventEmitter<number>();
  @Output() sort = new EventEmitter<void>();
  @ViewChild("dataTable", { static: true }) table: any;
  @Input() name?: string;
  columnActive: number;

  constructor() { }

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
    column.filterDisplayed = !column.filterDisplayed;
  }
  
  /** 
   * addFilterLike
   * * Add a like filter corresponding to the column
   * @param column column to filter
   * TODO : Remove
   */
  // addFilterLike(column: Column): void {
  //   column.fieldActive = !column.fieldActive;
  // }

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

}

