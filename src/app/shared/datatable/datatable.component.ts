import {Component, Input, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
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
    totalCount: number
  };
  @Output() pageUpdate = new EventEmitter<number>();
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
    console.log(pageInfo.offset);
    
    this.page.number = pageInfo.offset;
    this.pageUpdate.emit(pageInfo.offset);
  }

/*
  onActivate(event) {
    console.log('Activate Event', event);
  }
*/



}

