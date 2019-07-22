import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';
import { TestService } from 'src/app/core/services/crud/test.service';

@Component({
  selector: 'app-filterlike',
  templateUrl: './filterlike.component.html',
  styleUrls: ['./filterlike.component.scss']
})
export class FilterlikeComponent implements OnInit {

  @Input() column: Column;
  @Output() applyFilterOutput = new EventEmitter<void>();
  data: string;

  constructor(private testService: TestService) { }

  ngOnInit() { }

  validField() : void {  
    if(this.data.length > 2) {
      if (!this.column.sSearch.includes(this.data)) {
        this.column.sSearch = [this.data];
      }
      this.applyFilterOutput.emit();
    }    
  }
}
