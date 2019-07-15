import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SystemService } from '../../../core/services/crud/system.service';
import { ILabel } from '../../../shared/model/label.model';
import { IApplication } from '../../../shared/model/application.model';
import { InvariantsService } from '../../../core/services/crud/invariants.service';
import { IInvariant } from '../../../shared/model/invariants.model';
import { TestService } from '../../../core/services/crud/test.service';
import { ITest } from '../../../shared/model/test.model';
import { Column } from 'src/app/shared/model/column.model';
import { FilterService } from './filter.service';
import { Filter } from 'src/app/shared/model/filter.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input('columns') columns: Array<Column>;
  @Input('page') page: any;
  @Input('filterList') filterList: Array<Filter>;

  @Output() test = new EventEmitter<string>();
  @Output() searchTerm = new EventEmitter<string>();
  @Output() systemApply = new EventEmitter<string>();
  @Output() searchServe = new EventEmitter<string>();

  resetColumnDrop() {
    this.columnActive = null;
  }

  labelList: Array<ILabel>;
  applicationList: Array<IApplication>;
  applicationSelected: any;
  statusList: Array<IInvariant>;
  statusSelected: any;
  testList: Array<ITest>;
  testSelected: any;
  userSearch: any;
  columnActive: number;
  searchableColumns: Array<Column>

  labelFilter = {
    multiple: true,
    field: 'label',
    placeholder: 'Select labels',
    bindLabel: 'label',
    bindValue: 'label',
  };

  applicationFilter = {
    multiple: true,
    field: 'application',
    placeholder: 'Select applications',
    bindLabel: 'application',
    bindValue: 'application',
  };

  statusFilter = {
    multiple: true,
    field: 'status',
    placeholder: 'Select status',
    bindLabel: '',
    bindValue: 'value',
  };

  testFilter = {
    multiple: true,
    field: 'test',
    placeholder: 'Select test',
    bindLabel: 'test',
    bindValue: 'test',
  };

  list = ['System', 'Active'];

  constructor(private systemService: SystemService,
    private invariantService: InvariantsService,
    private testService: TestService) { 
      this.filterList = [];      
    }

  

  addfilter(property: string, value: string, like?: boolean) {
    let filter = {
      name: property,
      value: value,
      like: like
    };
    console.log("findIndex :",this.filterList.findIndex(a => a.name == filter.name && a.value == filter.value ));
    
    if (this.filterList.findIndex(a => a.name == filter.name && a.value == filter.value ) ===-1) {
      this.filterList.push(filter);
    }
  }

  // sendMyFilter() {
  //   this.testService.getTestCasesFilterList().subscribe(response => {
  //     console.log("server response: ", response);      
  //   });
  //   //this.testService.getTestCasesList();
  // }

  ngOnInit() {

    this.columnActive = this.columns.filter(a => a.active).length;
    this.searchableColumns = this.columns.filter(a => a.searchable);

    this.systemService.getLabelsFromSystem('DEFAULT');
    this.systemService.getApplicationList();
    this.invariantService.getTcStatus();
    this.testService.getTestsList();

    this.systemService.observableLabelsList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.labelList = response;
          console.log(response[0]);
        }
      } else {
        this.labelList = null;
      }
    });
    this.systemService.observableApplicationList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.applicationList = response;
          console.log("application : ", this.applicationList);
          
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

  updateFilters(data) {
    console.log("update : ", data);
    let filter = {
      name: data.name,
      value: data.value,
      like: data.like
    };
    console.log("findIndex :",this.filterList.findIndex(a => a.name == filter.name && a.value == filter.value ));
    
    if (this.filterList.findIndex(a => a.name == filter.name && a.value == filter.value ) ===-1) {
      this.filterList.push(filter);
    }
    
    //this.filterList.push(data)
  }

  toggleColumn(column): void {
    column.active = !column.active;
    this.columnActive = this.columns.filter(a => a.active).length;
    console.log('Active columns', this.columnActive);

  }

  sendFilter(data) {
    data = this.testSelected;
    this.test.emit(data);
  }


  applySystem() {
    this.systemApply.emit('');
  }

  triggerFilter() {
    this.searchServe.emit('');
  }

  remove(filter) {
    const index = this.filterList.indexOf(filter, 0);
    if (index > -1) {
      this.filterList.splice(index, 1);
    }
  }
}
