import {Component, Input, OnInit, ViewChild, Output, EventEmitter, HostBinding} from '@angular/core';
import { Column } from '../../model/column.model';

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
  @ViewChild("dataTable", {static: true}) table: any;
  @Input() name?: string;
  
  isLoading: boolean;
  columnActive: number;



  toggleColumn(column): void {
    column.active = !column.active;
    this.columnActive = this.columns.filter(a => a.active).length;
  }
  
  applyChange() {
    this.pageUpdate.emit(this.page.number);
  }
  

  ngOnInit() {
    this.columnActive = this.columns.filter(a => a.active).length;
  }
  constructor() {
  }

  onSelect({ selected }) {
    if(selected) {
      console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    }
    
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
    this.sort.emit();
    this.isLoading = false;
  }

  resetColumnDrop() {
    this.columnActive = null;
  }

  selectAll() {
    for(let row of this.rows) {
      if(!this.selected.includes(row)) {
        this.selected.push(row);
      }
    }
    
  }

  onPage(pageInfo) {
    this.page.number = pageInfo.offset;
    this.page.size = pageInfo.pageSize;
    this.applyChange();
  }
  
}

