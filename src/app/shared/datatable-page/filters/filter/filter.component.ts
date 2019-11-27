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

  @Input() field: any;
  @Input() column: Column; // information about the column that the filter is based on
  @Input() servlet: string; // endpoint to get the options list (for dropdown)
  dataList: any; // list of options list for dropdown type field
  @Input() request: string;
  @Output() applyFilterOutput = new EventEmitter<void>();

  constructor(
    private testService: TestService,
    private systemService: SystemService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    /*use a different request to get label because need label AND color*/
    if (!this.column.filterMode) {
      console.error('No filter type defined for filter ' + this.column.displayName + ' : please open a issue on github');
      this.column.filterMode = FILTER_MODE.DROPDOWN;
    }

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

  }

  // applyFilter() {
  //   this.column.sSearch = (this.column.multiple) ? this.model : [this.model];
  //   this.applyFilterOutput.emit();
  // }

  // send the selected values of the filter to the service
  debug() {
    console.log(this.column);
  }

  // send the selected values of the filter to the service
  // sendFilterTerm(term: string) {
  //   const key = this.column.contentName;
  //   this.filterService.addAFilter(key, [], term, this.column.filterMode);
  // }

  // removeAFilter() {
  //   const key = this.column.contentName;
  //   this.filterService.removeAFilter(key);
  // }

  // onAdd(value) {
  //   this.column.sSearch.push(value);
  // }

  // onChange(values) {
  //   if (this.column.multiple) {
  //     this.column.sSearch = values;
  //   } else if (values !== '') {
  //     this.column.sSearch = [values];
  //   } else {
  //     this.column.sSearch = [];
  //   }
  // }

  // updateModel() {
  //   /*get current filters*/
  //   this.model = this.column.sSearch;
  //   this.searchItems = [];
  // }

  // onSelectAll() {
  //   /*Select all element that correspond to the search*/
  //   const selectedElements = (this.searchItems.length > 0) ? this.searchItems : this.dataList;
  //   this.model = selectedElements;
  // }

  // clear all filter values
  clearFilterValues() {
    this.column.sSearch = [];
  }

  // onSearch(event) {
  //   /*everytime a key is pressed*/
  //   this.searchItems = event.items;
  // }

  // set the column flag to false
  // filter component will be destroyed
  // and model updated
  removeFilter() {
    this.column.filterDisplayed = false;
  }

  // validField(): void {
  //   this.sendFilterTerm(this.data);
  //   this.applyFilterOutput.emit();
  // }

}
