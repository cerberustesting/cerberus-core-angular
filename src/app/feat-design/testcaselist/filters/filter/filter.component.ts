import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() dataList: any;
  @Input() field: any;
  @Output() dataSelected = new EventEmitter<string>();
  data: any;

  @Input() param : {
              multiple: boolean,
              field: any,
              placeholder: any,
              bindLabel: any,
              bindValue: any,
          };

  constructor() { }

  sendValues(data) {
    this.dataSelected.emit(data);
    console.log(this.dataSelected);
  }

  ngOnInit() {
  }

}
