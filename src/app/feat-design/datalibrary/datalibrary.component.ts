import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { LabelfilteringPipe } from 'src/app/shared/pipes/labelfiltering.pipe';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';
import { Filter } from 'src/app/shared/model/filter.model';
import { DataLibColumnsData } from './datalibrary.columnsdata';

@Component({
  selector: 'app-datalibrary',
  templateUrl: './datalibrary.component.html',
  styleUrls: ['./datalibrary.component.scss']
})
export class DatalibraryComponent implements OnInit {

  columns = DataLibColumnsData;
  page = {
    size: 0, //maximum element per page
    number: 1, //number of current page
    sort: [{ dir: "asc", prop: "testDataLibID" }], //sort item
    totalCount: 0 //total count of element in database
  };
  rows = [];
  selectedRows = [];
  filterList: Array<Filter> = [];
  globalSearch = ''; // value in global search field
  filterTest: any; //
  servlet = '/ReadTestDataLib';

  constructor(private testService: TestService, private invariantsService: InvariantsService, private labelfilteringPipe: LabelfilteringPipe, private systemService: SystemService, private filterService: FilterService) { }

  ngOnInit() { }

}
