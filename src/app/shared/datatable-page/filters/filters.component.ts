import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { SystemService } from '../../../core/services/crud/system.service';
import { ILabel } from '../../../shared/model/label.model';
import { IApplication } from '../../../shared/model/application.model';
import { InvariantsService } from '../../../core/services/crud/invariants.service';
import { IInvariant } from '../../../shared/model/invariants.model';
import { TestService } from '../../../core/services/crud/test.service';
import { ITest } from '../../../shared/model/test.model';
import { Column, FILTER_MODE } from 'src/app/shared/model/column.model';
import { SidecontentService } from 'src/app/core/services/crud/sidecontent.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  private filterSectionToggle: boolean = true;
  private filterSectionMouseOver: boolean = false;
  private test: Array<string> = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'];

  @Input('columns') columns: Array<Column>;
  @Input('page') page: any;
  @Input('selectedRows') selectedRows: any;
  @Input('servlet') servlet: string;
  @Input('selection') selection: boolean;
  @Input() name?: string;
  @Input() filterTemplate: any; // TODO : type TemplateRef
  @Input() massActionTemplate: any; // TODO : type TemplateRef
  @Output() systemApply = new EventEmitter<string>();
  @Output() pageApply = new EventEmitter<number>();

  resetColumnDrop() {
    this.columnActive = null;
  }

  private labelList: Array<ILabel>;
  private userSearch: any;
  private columnActive: number;
  private searchableColumns: Array<Column>;
  private gloabalSearchModel: string;
  private activeFilters: Array<string> = [];

  constructor(private systemService: SystemService,
    private invariantService: InvariantsService,
    private testService: TestService,
    private sideContentService: SidecontentService) { }

  ngOnInit() {
    this.columnActive = this.columns.filter(a => a.active).length;
    this.searchableColumns = this.columns.filter(a => a.searchable || a.filterMode === FILTER_MODE.SEARCH_FIELD);
  }

  /**
   * toggleColumn
   * * Change colmun activation from column selector
   * @param column column to toggle
   */
  toggleColumn(column): void {
    column.active = !column.active;
    this.columnActive = this.columns.filter(a => a.active).length;
  }

  /** applySystem
   * * emit filters
   */
  applySystem(): void {
    this.systemApply.emit(this.gloabalSearchModel);
  }

  /** applyPage
   * * emit page modifications
   */
  applyPage(): void {
    let a = document.getElementsByClassName("datatable-body")[0];
    a.scroll(0, 0);
    a.scrollBy(0, (this.page.number - 1) * this.page.size * 50 + 50);
    this.pageApply.emit(this.page.number);
  }

  /** onKeyUp
   * * In the gloabl search field, start search if there are more than 2 caracters and after 1/2 second
   */
  onKeyUp(): void {
    if (this.gloabalSearchModel.length > 2) {
      setTimeout(() => this.applySystem(), 500);
    }
  }

  /** addFilter
   * * Add select filter for that column
   * @param column  column to filter
   */
  addFilter(column: Column) {
    if (column.filterDisplayed) {
      column.sSearch = [];
      this.activeFilters.splice(this.activeFilters.indexOf(column.contentName), 1)
    } else {
      this.activeFilters.push(column.contentName)
    }
    column.filterDisplayed = !column.filterDisplayed;

  }

  /** addFilterLike
   * * Add search field for that column
   * @param column column to filter
   * TODO : remove
   */
  // addFilterLike(column: Column) {
  //   column.fieldActive = !column.fieldActive;
  // }

  /** resetDefaultColumns
   * * rest default column to display
   */
  resetDefaultColumns() {
    this.columns.forEach(c => c.active = c.defaultActive);
    this.columnActive = this.columns.filter(a => a.active).length;
  }

  removeFilter(columnContent: string) {
    this.activeFilters.splice(this.activeFilters.indexOf(columnContent), 1)
  }



}
