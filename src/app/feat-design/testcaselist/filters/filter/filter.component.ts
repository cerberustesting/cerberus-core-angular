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
  @Output() dataSelected = new EventEmitter<string>();
  @Output() updateFilters = new EventEmitter<Filter>();
  data: any;

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
    if (this.column.filterItem.sSearch) {
      for (let filter of this.column.filterItem.sSearch) {
        // this.filterService.addfilter(this.param.field, filter);
        this.updateFilters.emit({
          name: this.column.filterItem.param.field,
          value: filter,
          like: false
        })
      }
    }
  }

  ngOnInit() {
    // this.filterItem.data = this.data;
    console.log(this.column);
    
    console.log("filterItem [filter.c.ts] :", this.column.filterItem);

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
