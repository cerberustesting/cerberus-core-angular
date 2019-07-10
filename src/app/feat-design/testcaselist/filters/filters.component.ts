import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SystemService} from '../../../core/services/crud/system.service';
import {ILabel} from '../../../shared/model/label.model';
import {IApplication} from '../../../shared/model/application.model';
import {InvariantsService} from '../../../core/services/crud/invariants.service';
import {IInvariant} from '../../../shared/model/invariants.model';
import {TestService} from '../../../core/services/crud/test.service';
import {ITest} from '../../../shared/model/test.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input('columns') columns: Array<any>;
  @Input('page') page: any;

  @Output() test = new EventEmitter<string>();
  @Output() searchTerm = new EventEmitter<string>();
  @Output() systemApply = new EventEmitter<string>();

  labelList: Array<ILabel>;
  applicationList: Array<IApplication>;
  applicationSelected: any;
  statusList: Array<IInvariant>;
  statusSelected: any;
  testList: Array<ITest>;
  testSelected: any;
  userSearch: any;
  columnActive: any;

  labelFilter = {
    multiple:  true,
    field: 'label',
    placeholder: 'Select labels',
    bindLabel: 'label',
    bindValue: 'label',
  };

  applicationFilter = {
    multiple:  true,
    field: 'application',
    placeholder: 'Select applications',
    bindLabel: 'application',
    bindValue: 'application',
  };

  statusFilter = {
    multiple:  true,
    field: 'status',
    placeholder: 'Select status',
    bindLabel: '',
    bindValue: 'value',
  };

  testFilter = {
    multiple:  true,
    field: 'test',
    placeholder: 'Select test',
    bindLabel: 'test',
    bindValue: 'test',
  };

  list = ['System','Active'];

  constructor( private systemService: SystemService,
               private invariantService: InvariantsService,
               private testService: TestService ) { }

  
  sendMyFilter() {
    this.testService.getTestCasesFilterList().subscribe(response => {
      console.log("server response: ", response);      
    });
    //this.testService.getTestCasesList();
  }

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

  updateStatus(statusSelected): void {
    this.statusSelected = statusSelected;
  }
  updateApplication(applicationSelected): void {
    this.applicationSelected = applicationSelected;
  }
  updateTest(testSelected): void {
    this.testSelected = testSelected;
  }
  updateSearch() {
      this.searchTerm.emit(this.userSearch);
  }

  toggleColumn(column): void {
    column.active = !column.active;
  }

  sendFilter(data) {
    data = this.testSelected;
    this.test.emit(data);
  }
  applySystem() {
    
    this.systemApply.emit('nouveaux systems');
  }
}
