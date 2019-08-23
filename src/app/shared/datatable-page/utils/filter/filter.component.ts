import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column, FILTER_MODE } from 'src/app/shared/model/column.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { SystemService } from 'src/app/core/services/crud/system.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  dataList: any;
  @Input() field: any;
  @Input() column: Column;
  @Input() servlet: string;
  @Input() request: string;
  @Output() remove = new EventEmitter<string>();
  @Output() applyFilterOutput = new EventEmitter<void>();
  data: any;
  model = [];
  searchItems = [];

  private mouseOverOnFilter: boolean = false;

  constructor(private testService: TestService, private systemService: SystemService) { }

  applyFilter() {
    this.column.sSearch = (this.column.multiple) ? this.model : [this.model];
    this.applyFilterOutput.emit();
  }

  onAdd(value) {
    this.column.sSearch.push(value);
  }

  onChange(values) {
    if (this.column.multiple) this.column.sSearch = values;
    else if (values != '') this.column.sSearch = [values];
    else this.column.sSearch = [];
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
    /*use a different request to get label because need label AND color*/

    if (!this.column.filterMode) this.column.filterMode = FILTER_MODE.DROPDOWN

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
  onSelectAll() {
    /*Select all element that correspond to the search*/
    let selectedElements = (this.searchItems.length > 0) ? this.searchItems : this.dataList;
    this.model = selectedElements;
    this.column.sSearch = this.model;
  }
  onClearAll() {
    /*Reset the model*/
    this.model = [];
    this.column.sSearch = [];
  }

  onSearch(event) {
    /*everytime a key is pressed*/
    this.searchItems = event.items;
  }
  removeFilter() {
    this.column.filterDisplayed = false;
    this.model = [];
    this.remove.emit(this.column.contentName);
    this.applyFilter()
  }

  validField(): void {
    this.column.sSearch = [this.data];
    this.applyFilterOutput.emit();
  }

}
