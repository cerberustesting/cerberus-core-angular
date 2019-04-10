import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SystemService} from '../../../../../services/crud/system.service';
import {IApplication} from '../../../../../model/application.model';

@Component({
  selector: 'app-application-filter',
  templateUrl: './application-filter.component.html',
  styleUrls: ['./application-filter.component.scss']
})
export class ApplicationFilterComponent implements OnInit {

  public applicationList: Array<IApplication>;
  @Output() applicationSelected = new EventEmitter<any>();
  appliSelect: any = { application: ''};

  constructor( private systemService: SystemService) { }

  ngOnInit() {
    this.systemService.getApplicationList();

    this.systemService.observableApplicationList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.applicationList = response;
          console.log(this.applicationList);
        }
      } else {
        this.applicationList = null;
      }
    });
    console.log('applicationSelected:', this.applicationSelected);
  }

}
