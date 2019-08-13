import {Component, Input, OnInit, ViewChild, Output, EventEmitter, HostBinding} from '@angular/core';
import { Column } from '../../model/column.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatalibTclistComponent } from '../utils/datalib-tclist/datalib-tclist.component';
import { SidecontentService } from 'src/app/core/services/crud/sidecontent.service';

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

  constructor(private modalService: NgbModal, private sideContentService: SidecontentService) { }



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

  openTCList(row) {
    this.sideContentService.addComponentToSideBlock(DatalibTclistComponent, {
      id: row.testDataLibID,
      name: row.name,
      country: row.country
    });
    this.sideContentService.openSideBlock();
    // const modalRef = this.modalService.open(DatalibTclistComponent, { size: 'lg' });
    // modalRef.componentInstance.id = row.testDataLibID;
    // modalRef.componentInstance.name = name;
    // modalRef.componentInstance.country = row.country;
  }
  
}

