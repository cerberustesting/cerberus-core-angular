import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Input() rows: any[];
  @Input() columns: any[];
  @Input() testcaseslist: boolean;
  selected = [];
  isLoading: boolean;

  ngOnInit() {
  }
  constructor() {
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

/*
  onActivate(event) {
    console.log('Activate Event', event);
  }
*/



}

