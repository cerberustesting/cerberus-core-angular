import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column, FILTER_MODE } from 'src/app/shared/model/column.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input('columns') columns: Array<Column>; // list of all available columns to be filtered on
  @Input('page') page: any; // information about pagination
  @Input('servlet') servlet: string; // endpoint to pass to the filters
  @Input('selectedRows') selectedRows: any; // selected rows in the table

  // angular templates declaration
  @Input() filterTemplate: any; // TODO : type TemplateRef
  @Input() massActionTemplate: any; // TODO : type TemplateRef

  @Output() globalSearchContentChange = new EventEmitter<string>(); // emitter used to send the global search value to the parent component

  globalSearch: string; // quick search content

  constructor(private modalService: NgbModal) { }

  ngOnInit() { }

  // return the columns list that are being used as filter
  getActiveFilters(): Array<Column> {
    const ActiveFilters = this.columns.filter(fltr => fltr.filterDisplayed === true);
    return ActiveFilters;
  }

  // return the columns list that are being active: displayed in the table
  getActiveColumns(): Array<Column> {
    const ActiveColumns = this.columns.filter(fltr => fltr.active);
    return ActiveColumns;
  }

  // return the columns list that can be used to filter the content
  getSearchableColumns(): Array<Column> {
    const searchableColumns = this.columns.filter(fltr => fltr.searchable || fltr.filterMode === FILTER_MODE.SEARCH_FIELD);
    return searchableColumns;
  }

  // open the filters modal
  openFiltersModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
      // triggered when modal is closed
      this.sendGlobalSearchContent();
    }, (reason) => {
      // dismiss
    });
  }

  // change the activation of a column
  // activation being if its displayed or not
  toggleColumn(column): void {
    column.active = !column.active;
  }

  // reset the columns default configuration
  // according to the columnsdata file
  resetDefaultColumns() {
    this.columns.forEach(c => c.active = c.defaultActive);
  }

  // send the quick search content (string)
  // to the parent component to refresh the table content
  sendGlobalSearchContent(): void {
    this.globalSearchContentChange.emit(this.globalSearch);
  }

  // process the current global search value
  // is triggered at every keypress on the input
  keypressOnGlobalSearch(): void {
    // send it only if it has more than 2 caracters
    if (this.globalSearch.length > 2) {
      setTimeout(() => this.sendGlobalSearchContent(), 500);
    }
  }

  // enable a filter with no value
  addFilter(column: Column) {
    // toggle the filter display:
    column.filterDisplayed = !column.filterDisplayed;
    // reset its values
    column.sSearch = [];
  }

  // OBSOLETE
  // applyPage(): void {
  //   const a = document.getElementsByClassName('datatable-body')[0];
  //   a.scroll(0, 0);
  //   a.scrollBy(0, (this.page.number - 1) * this.page.size * 50 + 50);
  //   this.pageApply.emit(this.page.number);
  // }

}
