import { Injectable } from '@angular/core';
import { Filter } from 'src/app/shared/model/filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterList: Array<Filter>;

  constructor() { 
    this.filterList = [];
  }

  addfilter(property: string, value: string, like?: boolean) {
    let filter = {
      name: property,
      value: value,
      like: like
    };
    console.log("findIndex :",this.filterList.findIndex(a => a.name == filter.name && a.value == filter.value ));
    
    if (this.filterList.findIndex(a => a.name == filter.name && a.value == filter.value ) ===-1) {
      this.filterList.push(filter);
    }
    
  }
}
