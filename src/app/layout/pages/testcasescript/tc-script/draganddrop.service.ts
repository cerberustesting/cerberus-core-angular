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


  constructor() {
    this.controlsIdCount = 0;
    this.controlsIdList = new Array<string>();
  }

  getID(){
    this.controlsIdCount++;
    return this.controlsIdCount;
  }

  addIDToControlList(id: string) {
    this.controlsIdList.push(id);
    this.observableControlsIdList.next(this.controlsIdList);
  }

}
