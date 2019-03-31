import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DraganddropService {
  // service that store the list of IDs that needs to be be linked for drag & drop
  // allow several component to reference ids and access the array(s)

  controlsIdCount: number;
  controlsIdList: Array<string>;
  observableControlsIdList = new BehaviorSubject<string[]>(this.controlsIdList);

  propCountriesIdCount: number;
  propCountriesIdList: Array<string>;
  observablePropCountriesList = new BehaviorSubject<string[]>(this.propCountriesIdList);

  constructor() {
    this.controlsIdCount = 0;
    this.propCountriesIdCount = 0;
    this.propCountriesIdList = new Array<string>();
    this.controlsIdList = new Array<string>();
  }

  getControlsListID() {
    this.controlsIdCount++;
    return this.controlsIdCount;
  }

  addIDToControlList(id: string) {
    this.controlsIdList.push(id);
    this.observableControlsIdList.next(this.controlsIdList);
  }

  addIDToPropCountriesList(id: string) {
    if (!this.propCountriesIdList.includes(id)) { this.propCountriesIdList.push(id); }
    this.observablePropCountriesList.next(this.propCountriesIdList);
  }

  deleteIDFromPropCountriesList(id: string) {
    if (this.propCountriesIdList.includes(id)) { this.propCountriesIdList.splice(this.propCountriesIdList.indexOf(id), 1); }
  }

}
