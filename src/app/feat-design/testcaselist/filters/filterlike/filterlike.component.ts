import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';

@Component({
  selector: 'app-filterlike',
  templateUrl: './filterlike.component.html',
  styleUrls: ['./filterlike.component.scss']
})
export class FilterlikeComponent implements OnInit {

  @Input() column: Column;
  @Output() applyFilterOutput = new EventEmitter<void>();
  data: string;

  constructor() { }

  ngOnInit() {
  }

  validField() : void {  
    if (!this.column.sSearch.includes(this.data)) {
      this.column.sSearch.push(this.data)
    }
    this.applyFilterOutput.emit();
  }

}
