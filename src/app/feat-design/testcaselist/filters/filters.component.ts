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

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input('columns') columns: Array<Column>;
  @Input('page') page: any;

  @Output() test = new EventEmitter<string>();
  @Output() searchTerm = new EventEmitter<string>();
  @Output() systemApply = new EventEmitter<string>();
  @Output() searchServe = new EventEmitter<string>();
  @Output() preferenceLoad = new EventEmitter<string>();
  @Output() preferenceSave = new EventEmitter<string>();

  resetColumnDrop() {
    this.columnActive = null;
  }

  labelList: Array<ILabel>;
  userSearch: any;
  columnActive: number;
  searchableColumns: Array<Column>;
  gloabalSearchModel: string;


  constructor(private systemService: SystemService,
    private invariantService: InvariantsService,
    private testService: TestService) { }

  ngOnInit() {

    this.columnActive = this.columns.filter(a => a.active).length;
    this.searchableColumns = this.columns.filter(a => a.searchable);
  }

  toggleColumn(column): void {
    column.active = !column.active;
    this.columnActive = this.columns.filter(a => a.active).length;
  }

  applySystem() {
    this.systemApply.emit(this.gloabalSearchModel);
  }

  triggerFilter() {
    this.searchServe.emit('');
  }

  remove(column: Column, value: string) {
    const columnIndex = this.columns.indexOf(column);
    const index = column.sSearch.indexOf(value);
    if (index > -1) {
      this.columns[columnIndex].sSearch.splice(index, 1);
    }
  }
  save() {
    this.preferenceSave.emit('');
  }
  load() {
    this.preferenceLoad.emit('');
  }
  onKeyUp() {
    if (this.gloabalSearchModel.length > 2){
      setTimeout(() => this.applySystem(), 500);
    }
  }
  // validGlobalSearchField() {
  //   console.log("search for : ", this.gloabalSearchModel);    
  //   this.globalSearch = this.gloabalSearchModel;
  //   this.applySystem();
  // }
}
