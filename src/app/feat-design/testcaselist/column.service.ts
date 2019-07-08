import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  columns = [
    { name: 'testCase', grow: 1, active: true },
    { name: 'status', grow: 1, active: true },
    { name: 'application', grow: 1, active: true },
    { name: 'description', grow: 3, active: true },
    { name: 'system', grow: 1, active: true },
    { name: 'tcActive', grow: 1, active: true },
    { name: 'priority', grow: 1, active: true },
    { name: 'countryList', grow: 2, active: true },
    { name: 'LABELS', grow: 1, active: true },
  ];

  constructor() { 

  }
}
