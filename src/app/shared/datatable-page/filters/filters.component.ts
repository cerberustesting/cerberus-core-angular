import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SystemService } from '../../../core/services/crud/system.service';
import { ILabel } from '../../../shared/model/label.model';
import { IApplication } from '../../../shared/model/application.model';
import { InvariantsService } from '../../../core/services/crud/invariants.service';
import { IInvariant } from '../../../shared/model/invariants.model';
import { TestService } from '../../../core/services/crud/test.service';
import { ITest } from '../../../shared/model/test.model';
import { Column } from 'src/app/shared/model/column.model';
import { Filter } from 'src/app/shared/model/filter.model';
import { SidecontentService } from 'src/app/core/services/crud/sidecontent.service';
import { DatalibEditComponent } from '../utils/datalib-edit/datalib-edit.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input('columns') columns: Array<Column>;
  @Input('page') page: any;
  @Input('selectedRows') selectedRows: any;
  @Input('servlet') servlet: string;
  @Input('selection') selection: boolean;
  @Input() name?: string;
  @Output() systemApply = new EventEmitter<string>();
  @Output() pageApply = new EventEmitter<number>();

  resetColumnDrop() {
    this.columnActive = null;
  }

  labelList: Array<ILabel>;
  userSearch: any;
  columnActive: number;
  searchableColumns: Array<Column>;
  gloabalSearchModel: string;
  filterList = [];

  constructor(private systemService: SystemService,
    private invariantService: InvariantsService,
    private testService: TestService,
    private sideContentService: SidecontentService) { }

  ngOnInit() {    
    this.columnActive = this.columns.filter(a => a.active).length;
    this.searchableColumns = this.columns.filter(a => a.searchable || a.like);
  }

  toggleColumn(column): void {
    column.active = !column.active;
    this.columnActive = this.columns.filter(a => a.active).length;
  }

  applySystem() {
    this.filterList = [];
    this.columns.forEach(e => {
      if(e.sSearch && e.contentName!=='description') {
        e.sSearch.forEach(a => {
          this.filterList.push({name: e.contentName, value: a});
        });
      }      
    });
    this.systemApply.emit(this.gloabalSearchModel);
  }
  applyPage() {
    let a = document.getElementsByClassName("datatable-body")[0];
    a.scroll(0,0);
    a.scrollBy(0, (this.page.number-1) * this.page.size * 50 + 50);
    this.pageApply.emit(this.page.number);
  }

  remove(name: string, value: string) {    
    const columnIndex = this.columns.map(c => c.contentName).indexOf(name);
    const index = this.columns[columnIndex].sSearch.indexOf(value);
    if (index > -1) {
      this.columns[columnIndex].sSearch.splice(index, 1);
    }
    this.applySystem();
  }

  onKeyUp() {
    if (this.gloabalSearchModel.length > 2){
      setTimeout(() => this.applySystem(), 500);
    }
  }

  addFilter(column) {
    if (!column.like) column.dropActive = !column.dropActive;
    else column.fieldActive = !column.fieldActive;
  }

  addFilterLike(column: Column) {
    column.fieldActive = !column.fieldActive;
  }
  resetDefaultColumns() {
    this.columns.forEach(c => c.active = c.defaultActive);
    this.columnActive = this.columns.filter(a => a.active).length;
  }

  createDatalib() {
    this.sideContentService.addComponentToSideBlock(DatalibEditComponent, {
      datalib: {},
      type: 'CREATE',
      exit: () => this.applySystem()
    });
    this.sideContentService.openSideBlock();
  }

}
