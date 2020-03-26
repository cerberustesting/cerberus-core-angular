import { Component, Input, OnInit } from '@angular/core';
import { Column, FILTER_MODE } from 'src/app/shared/model/front/column.model';
import { SystemService } from 'src/app/core/services/api/system.service';
import { FilterService } from 'src/app/core/services/api/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  /** column object that the filter is based on */
  @Input() column: Column;

  /** endpoint to fetch the options list (for dropdown only) */
  @Input() servlet: string;

  /** list of options list for dropdown typed field */
  public dataList: any;

  constructor(
    private systemService: SystemService,
    private filterService: FilterService
  ) { }

  ngOnInit() {

    // set by default to DROPDOWN type filter
    if (!this.column.filterMode) {
      console.error('No filter type defined for filter: "' + this.column.displayName + '" : please open an issue on github');
      this.column.filterMode = FILTER_MODE.DROPDOWN;
    }

    // DROPDOWN type filter : options list fetching
    if (this.column.type === 'label') {
      // use a different request to get labels because it needs label data
      this.systemService.getLabelsFromSystem('');
      this.systemService.observableLabelsList.subscribe(response => {
        if (response) {
          if (response.length > 0) {
            this.dataList = response;
          }
        } else {
          this.dataList = null;
        }
      });
    } else {
      this.filterService.getOptionsListForColumnsFiltering(this.servlet, this.column.apiName).subscribe(response => {
        if (response) {
          // @ts-ignore
          if (response.distinctValues.length > 0) {
            // @ts-ignore
            this.dataList = response.distinctValues;
          }
        } else {
          this.dataList = null;
        }
      });
    }
  }

  /** empty the filter value(s) for this column */
  clearFilterValues() {
    this.column.sSearch = [];
  }

  /** remove the filter from the filter selection and empty the previous value(s) */
  removeFilter() {
    this.column.filterDisplayed = false;
    this.clearFilterValues();
  }

  /** set a unique value for the filter values */
  setUniqueFilterValue(filtervalue: string) {
    this.column.sSearch = [];
    this.column.sSearch.push(filtervalue);
  }

  isFilterValueSelected(filtervalue: string) {
    return this.column.sSearch.includes(filtervalue);
  }
}
