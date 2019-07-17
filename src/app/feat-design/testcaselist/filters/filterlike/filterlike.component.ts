import { Component, OnInit, Input } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';

@Component({
  selector: 'app-filterlike',
  templateUrl: './filterlike.component.html',
  styleUrls: ['./filterlike.component.scss']
})
export class FilterlikeComponent implements OnInit {

  @Input() column: Column;
  data: string;

  constructor() { }

  ngOnInit() {
  }

  validField() : void {  
    this.column.sSearch.push(this.data);
  }

}
