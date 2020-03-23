import { Component, Input, OnInit } from '@angular/core';
import { Column, FILTER_MODE } from 'src/app/shared/model/front/column.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { SystemService } from 'src/app/core/services/api/system.service';
import { FilterService } from 'src/app/core/services/api/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() column: Column; // information about the column that the filter is based on
  @Input() servlet: string; // endpoint to get the options list (for dropdown only)
  public dataList: any; // list of options list for dropdown typed field

  constructor(
    private testService: TestcaseService,
    private systemService: SystemService,
    private filterService: FilterService
  ) { }

  ngOnInit() {

    // set by default to DROPDOWN type filter
    // TODO: check columns data files and remove it
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
          if (response.length > 0) { this.dataList = response; }
        } else {
          this.dataList = null;
        }
      });
    } else {
      this.filterService.getOptionsListForColumnsFiltering(this.servlet, this.column.apiName).subscribe(response => {
        if (response) {
          // @ts-ignore
          if (response.distinctValues.length > 0) { this.dataList = response.distinctValues; }
        } else {
          this.dataList = null;
        }
      });
    }
  }

  // clear all filter values
  clearFilterValues() {
    this.column.sSearch = [];
  }

  // remove the filter :
  // destroy the component
  removeFilter() {
    this.column.filterDisplayed = false;
  }

}
