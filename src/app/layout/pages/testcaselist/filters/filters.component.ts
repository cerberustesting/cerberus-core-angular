import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  public applicationSelected: any = { application: ''};
  constructor( ) { }

  ngOnInit() {
  }

  filterApplicationHandler($event: any) {
    this.applicationSelected = $event;
    console.log(this.applicationSelected);
  }
}
