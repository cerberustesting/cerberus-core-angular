import { Component, EventEmitter, Input, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { Column } from 'src/app/shared/model/front/column.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  /** modal template used to be able to call the openModal method from outside (without the template ref) */
  @ViewChild('content', { static: false }) private filtersModalTemplate: TemplateRef<any>;

  /** list of all available columns to be filtered on */
  @Input('columns') columns: Array<Column>;

  /** information about pagination */
  @Input('page') page: any;

  /** endpoint (to fetch the options list) sent to the filters */
  @Input('servlet') servlet: string;

  /** preferences for columns filters and search */
  @Input() userHasPreferencesSetted: boolean;

  /** preferences for search */
  @Input() initialSearch: string;

  // angular templates declaration
  @Input() filterTemplate: any; // TODO : type TemplateRef
  @Input() massActionTemplate: any; // TODO : type TemplateRef

  @Output() globalSearchContentChange = new EventEmitter<string>(); // emitter used to send the global search value to the parent component

  @Output() resetPreferencesEmitter = new EventEmitter<string>(); // emitter used to alert reset preferences to the parent component

  @Output() columnChangeEmitter = new EventEmitter<string>(); // emitter used to alert that column visibility changed to the parent component

  globalSearch: string; // quick search content

  defaultColumns: Array<Column>; // default and initial columns

  constructor(private modalService: NgbModal) { }

  ngOnInit() { 
    if(this.initialSearch != ""){
      this.globalSearch = this.initialSearch;
      this.sendGlobalSearchContent();
    }  
    this.defaultColumns = JSON.parse(JSON.stringify(this.columns));
  }

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
  getFilterableColumns(): Array<Column> {
    const searchableColumns = this.columns.filter(fltr => fltr.filterable === true);
    return searchableColumns;
  }

  // open the filters modal
  openFiltersModal() {
    this.modalService.open(this.filtersModalTemplate, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
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
    this.columnChangeEmitter.emit();
  }

  // reset the columns default configuration
  // according to the columnsdata file
  resetDefaultColumns() {
    this.columns.forEach(c => c.active = c.defaultActive);
    this.columnChangeEmitter.emit();
  }

  // reset all configuration
  // according to the columnsdata file
  resetPreferences() {
    this.globalSearch = "";
    this.columns = JSON.parse(JSON.stringify(this.defaultColumns));
    this.resetPreferencesEmitter.emit();
  }

  /**
   * send the quick search keyword to the parent component
   */
  sendGlobalSearchContent(): void {
    this.globalSearchContentChange.emit(this.globalSearch);
  }

  /**
   * pre processing on the quick search keyword
   *  * only send the value if it reach the min length
   *  * adds a slight wait to send the search term
   */
  keypressOnGlobalSearch(): void {
    // send it after 800ms
    setTimeout(() => this.sendGlobalSearchContent(), 800);
  }

  // enable a filter with no value
  addFilter(column: Column) {
    // toggle the filter display:
    column.filterDisplayed = !column.filterDisplayed;
    // reset its values
    column.sSearch = [];
  }

}
