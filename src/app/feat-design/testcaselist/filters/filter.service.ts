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
    this.filterList.push({
      name: property,
      value: value,
      like: like
    })
  }
}
