import {Component, Input, OnInit, ViewChild, Output, EventEmitter, HostBinding} from '@angular/core';
import { Column } from '../model/column.model';

@Component({
  selector: 'app-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Input() rows: any[];
  @Input() columns: Array<Column>
  @Input() testcaseslist: boolean;
  @Input() page: {
    size: number,
    number: number,
    sort: number,
    totalCount: number
  };
  @Input() selected: Array<any>;
  @Output() pageUpdate = new EventEmitter<number>();
  @Output() addFilterMenu = new EventEmitter<any>();
  
  isLoading: boolean;

  

  ngOnInit() {
  }
  constructor() {
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  addFilter(column) {
    column.dropActive = !column.dropActive;
  }

  addFilterLike(column: Column) {
    column.fieldActive = !column.fieldActive;
  }
  onSort(event) {
    this.isLoading = true;
    this.page.sort = event.sorts;  
    this.pageUpdate.emit(this.page.number);
    this.isLoading = false;
  }



}

