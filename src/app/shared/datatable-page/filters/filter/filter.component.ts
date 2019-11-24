import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column, FILTER_MODE } from 'src/app/shared/model/column.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  dataList: any;
  @Input() field: any;
  @Input() column: Column; // information about the column that the filter is based on
  @Input() servlet: string; // endpoint to get the options list (for dropdown)
  @Input() request: string;
  @Output() remove = new EventEmitter<string>();
  @Output() applyFilterOutput = new EventEmitter<void>();
  data: any;
  model: any;
  searchItems = [];

  private mouseOverOnFilter: boolean;

  constructor(private testService: TestService, private systemService: SystemService, private filterService: FilterService) { }

  applyFilter() {
    this.column.sSearch = (this.column.multiple) ? this.model : [this.model];
    this.applyFilterOutput.emit();
  }

  // send the selected values of the filter to the service
  sendFilterValues(values: Array<any>) {
    const key = this.column.contentName;
    this.filterService.addAFilter(key, values, '', this.column.filterMode);
  }

  // send the selected values of the filter to the service
  sendFilterTerm(term: string) {
    const key = this.column.contentName;
    this.filterService.addAFilter(key, [], term, this.column.filterMode);
  }

  removeAFilter() {
    const key = this.column.contentName;
    this.filterService.removeAFilter(key);
  }

  onAdd(value) {
    this.column.sSearch.push(value);
  }

  onChange(values) {
    if (this.column.multiple) {
      this.column.sSearch = values;
    } else if (values !== '') {
      this.column.sSearch = [values];
    } else {
      this.column.sSearch = [];
    }
  }

  updateModel() {
    /*get current filters*/
    this.model = this.column.sSearch;
    this.searchItems = [];
  }

  onKeyUpEnter() {
    /*when the field is validate*/
    this.model = this.searchItems;
    this.column.sSearch = this.searchItems;
  }

  ngOnInit() {
    this.mouseOverOnFilter = false;
    /*use a different request to get label because need label AND color*/

    if (!this.column.filterMode) { this.column.filterMode = FILTER_MODE.DROPDOWN; }

    if (this.column.type === 'label') {
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
      this.testService.getColumnData(this.servlet, this.column.apiName).subscribe(response => {
        if (response) {
          if (response.distinctValues.length > 0) {
            this.dataList = response.distinctValues;
          }
        } else {
          this.dataList = null;
        }
      });
    }

    // get the active filter values from the service list
    this.filterService.observableActiveFiltersList.subscribe(r => {
      if (r) {
        const filter_name = this.column.contentName;
        const filter = r.filter(f => f.filter === filter_name);
        // ensure that we get only one filter object (because we should)
        if (filter.length > 1) {
          console.error('Error when getting filter values');
        } else if (filter[0]) {
          // update the values for the select / search filed
          console.log(filter[0]);
          this.model = filter[0].values;
          this.data = filter[0].term;
          if (filter[0].mode === 'SEARCH_FIELD') {
            this.column.sSearch = [this.data];
          } else if (filter[0].mode === 'DROPDOWN') {
            this.column.sSearch = this.model;
          }
        }
      }
    });

  }
  onSelectAll() {
    /*Select all element that correspond to the search*/
    const selectedElements = (this.searchItems.length > 0) ? this.searchItems : this.dataList;
    this.model = selectedElements;
  }
  onClearAll() {
    /*Reset the model*/
    this.model = [];
  }

  onSearch(event) {
    /*everytime a key is pressed*/
    this.searchItems = event.items;
  }
  removeFilter() {
    this.column.filterDisplayed = false;
    this.model = [];
    this.remove.emit(this.column.contentName);
    this.applyFilter();
  }

  validField(): void {
    this.sendFilterTerm(this.data);
    this.applyFilterOutput.emit();
  }

}
