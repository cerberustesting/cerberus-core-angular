import { Component, OnInit } from '@angular/core';
import {ILabel} from '../../../../../model/label.model';
import {SystemService} from '../../../../../services/crud/system.service';

@Component({
  selector: 'app-label-filter',
  templateUrl: './label-filter.component.html',
  styleUrls: ['./label-filter.component.scss']
})
export class LabelFilterComponent implements OnInit {
  public labelList: Array<ILabel>;

  constructor( private systemService: SystemService) { }

  ngOnInit() {
    this.systemService.getLabelsFromSystem('DEFAULT');

    this.systemService.observableLabelsList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.labelList = response;
          console.log(this.labelList);
        }
      } else {
        this.labelList = null;
      }
    });
  }
}
