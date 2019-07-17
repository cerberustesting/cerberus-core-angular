import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/shared/model/filter.model';
import { filter } from 'rxjs/operators';
import { Column } from 'src/app/shared/model/column.model';
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
  data: any;
  model = [];

  // @Input() param: {
  //   multiple: boolean,
  //   field: any,
  //   placeholder: any,
  //   bindLabel: any,
  //   bindValue: any,
  // };

  constructor(private testService: TestService, private systemService: SystemService) {
  }

  // sendValues(data) {
  //   this.dataSelected.emit(data);
  //   console.log(this.dataSelected);
  // }
  applyFilter() {
    //this.filterItem.sSearch = this.data;
    console.log(this.column.sSearch);
  }
  add(value) {
    this.column.sSearch.push(value);
  }
  remove(value) {
    this.column.sSearch.splice(this.column.sSearch.indexOf(value))
  }
  dbg(smth) {
    this.model = this.column.sSearch;
  }

  ngOnInit() {
    if(this.column.type==='label'){
      this.systemService.getLabelsFromSystem('DEFAULT');
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

}
