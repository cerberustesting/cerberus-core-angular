import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-table-new',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Input() rows: any[];
  @Input() columns: any[];
  selected = [];
  isLoading: boolean;

  ngOnInit() {
  }
  constructor() {
/*    this.fetch((data) => {
      this.rows = data;
    });*/
  }


  /*  fetch(cb) {
      const req = new XMLHttpRequest();
      req.open('GET', `assets/data/company.json`);

      req.onload = () => {
        cb(JSON.parse(req.response));
      };

      req.send();
    }*/

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }



}

