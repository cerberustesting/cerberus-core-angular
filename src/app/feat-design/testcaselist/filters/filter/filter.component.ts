import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/shared/model/filter.model';
import { filter } from 'rxjs/operators';
import { Column } from 'src/app/shared/model/column.model';
import { TestService } from 'src/app/core/services/crud/test.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  dataList: any;
  @Input() field: any;
  @Input() column: Column;
  data: any;
  model = [];

  // @Input() param: {
  //   multiple: boolean,
  //   field: any,
  //   placeholder: any,
  //   bindLabel: any,
  //   bindValue: any,
  // };

  constructor(private testService: TestService) {
  }

  // sendValues(data) {
  //   this.dataSelected.emit(data);
  //   console.log(this.dataSelected);
  // }
  applyFilter() {
    //this.filterItem.sSearch = this.data;
    console.log(this.column.filterItem.sSearch);
  }
  add(value) {
    this.column.filterItem.sSearch.push(value)
  }
  remove(value) {
    this.column.filterItem.sSearch.splice(this.column.filterItem.sSearch.indexOf(value))
  }
  dbg(smth) {
    this.model = this.column.filterItem.sSearch;
  }

  ngOnInit() {
    this.testService.getColumnData(this.column.databaseName).subscribe(response => {
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
