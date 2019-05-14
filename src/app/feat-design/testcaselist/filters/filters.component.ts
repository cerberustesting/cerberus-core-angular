import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SystemService} from '../../../services/crud/system.service';
import {ILabel} from '../../../model/label.model';
import {IApplication} from '../../../model/application.model';
import {InvariantsService} from '../../../services/crud/invariants.service';
import {IInvariant} from '../../../model/invariants.model';
import {TestService} from '../../../services/crud/test.service';
import {ITest} from '../../../model/test.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() test = new EventEmitter<string>();
  @Output() searchTerm = new EventEmitter<string>();
  labelList: Array<ILabel>;
  applicationList: Array<IApplication>;
  applicationSelected: any;
  statusList: Array<IInvariant>;
  statusSelected: any;
  testList: Array<ITest>;
  testSelected: any;
  userSearch: any;

  constructor( private systemService: SystemService,
               private invariantService: InvariantsService,
               private testService: TestService ) { }

  ngOnInit() {

    this.systemService.getLabelsFromSystem('DEFAULT');
    this.systemService.getApplicationList();
    this.invariantService.getTcStatus();
    this.testService.getTestsList();


    this.systemService.observableLabelsList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.labelList = response;
        }
      } else {
        this.labelList = null;
      }
    });
    this.systemService.observableApplicationList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.applicationList = response;
        }
      } else {
        this.applicationList = null;
      }
    });
    this.invariantService.observableTcStatus.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.statusList = response;
        }
      } else {
        this.statusList = null;
      }
    });
    this.testService.observableTestsList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.testList = response;
          console.log(this.testList);
        }
      } else {
        this.testList = null;
      }
    });
  }

  updateStatus(statusSelected) {
    this.statusSelected = statusSelected;
  }
  updateApplication(applicationSelected) {
    this.applicationSelected = applicationSelected;
  }
  updateTest(testSelected) {
    this.testSelected = testSelected;
  }
  updateSearch() {
      this.searchTerm.emit(this.userSearch);
  }


  sendFilter(data) {
    data = this.testSelected;
    this.test.emit(data);
  }
}
