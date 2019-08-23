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
  @Output() remove = new EventEmitter<string>();
  data: string;

  private mouseOverOnFilter: boolean = false;

  constructor(private testService: TestService) { }

  ngOnInit() { }

  validField(): void {
    this.column.sSearch = [this.data];
    this.applyFilterOutput.emit();
  }

  removeFilter() {
    this.column.fieldActive = false;
    this.data = '';
    this.remove.emit(this.column.contentName);
    this.validField()
  }

}
