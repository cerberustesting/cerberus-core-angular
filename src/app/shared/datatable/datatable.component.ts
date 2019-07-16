import {Component, Input, OnInit, ViewChild, Output, EventEmitter, HostBinding} from '@angular/core';
import { Column } from '../model/column.model';
import * as $ from 'jquery';

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
    totalCount: number
  };
  @Output() pageUpdate = new EventEmitter<number>();
  @Output() addFilterMenu = new EventEmitter<any>();
  selected = [];
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

  setPage(pageInfo){
    this.page.number = pageInfo.offset;
    this.pageUpdate.emit(pageInfo.offset);
  }

  addFilter(column) {
    column.dropActive = !column.dropActive;
    
    //this.addFilterMenu.emit(column);
  }

  addFilterLike(column: Column) {
    column.fieldActive = !column.fieldActive;
  }

/*
  onActivate(event) {
    console.log('Activate Event', event);
  }
*/



}

