import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor() { }

  // boolean to define
  // if darker mode is enabled
  nightMode = false;
  observableNightMode = new BehaviorSubject<boolean>(this.nightMode);

  toggleNightMode() {
    this.nightMode = !this.nightMode;
    this.observableNightMode.next(this.nightMode);
  }
}
