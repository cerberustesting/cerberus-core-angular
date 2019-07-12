import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FilterService } from '../filter.service';
import { Filter } from 'src/app/shared/model/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() dataList: any;
  @Input() field: any;
  @Output() dataSelected = new EventEmitter<string>();
  @Output() updateFilters = new EventEmitter<Filter>();
  data: any;

  @Input() param : {
              multiple: boolean,
              field: any,
              placeholder: any,
              bindLabel: any,
              bindValue: any,
          };

  constructor(private filterService: FilterService) { }

  // sendValues(data) {
  //   this.dataSelected.emit(data);
  //   console.log(this.dataSelected);
  // }
  applyFilter() {
    console.log(this.data);
    
    for(let filter of this.data) {
      // this.filterService.addfilter(this.param.field, filter);
      this.updateFilters.emit({
        name: this.param.field,
        value: filter,
        like: false
      })
    }
    
  }

  ngOnInit() {
  }

}
