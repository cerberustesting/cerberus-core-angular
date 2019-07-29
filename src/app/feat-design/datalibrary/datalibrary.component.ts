import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { LabelfilteringPipe } from 'src/app/shared/pipes/labelfiltering.pipe';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';
import { Filter } from 'src/app/shared/model/filter.model';

@Component({
  selector: 'app-datalibrary',
  templateUrl: './datalibrary.component.html',
  styleUrls: ['./datalibrary.component.scss']
})
export class DatalibraryComponent implements OnInit {

  columns: Array<Column> = [
    {
      displayName: "ID",
      contentName: 'testDataLibID',
      active: true,
      sSearch: [],
      databaseName: 'tdl.TestDataLibID'
    },
    {
      displayName: "Name",
      contentName: 'name',
      active: true, 
      sSearch: [],
      databaseName: 'tdl.Name'
    },
    {
      displayName: "System",
      contentName: 'system',
      active: true, 
      sSearch: [],
      databaseName: 'tdl.System'
    },
    {
      displayName: "Environment",
      contentName: 'environment',
      active: true, 
      sSearch: [],
      databaseName : 'tdl.Environment'
    },
    {
      displayName: "Country",
      contentName: 'country',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.Country'
    },
    {
      displayName: "Group",
      contentName: 'group',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.Group'
    },
    {
      displayName: "Description",
      contentName: 'description',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.Description'
    },
    {
      displayName: "Type",
      contentName: 'type',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.Type'
    },
    {
      displayName: "Value",
      contentName: 'subDataValue',
      active: false, 
      sSearch: [],
      databaseName : 'tdd.value'
    },
    {
      displayName: "Database",
      contentName: 'database',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.Database'
    },
    {
      displayName: "Script",
      contentName: 'script',
      active: false,
      width: 300, 
      sSearch: [],
      databaseName : 'tdl.Script'
    },
    {
      displayName: "Database",
      contentName: 'databaseUrl',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.DatabaseUrl'
    },
    {
      displayName: "Service",
      contentName: 'service',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.Service'
    },
    {
      displayName: "Service Path",
      contentName: 'servicePath',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.ServicePath'
    },
    {
      displayName: "Operation",
      contentName: 'method',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.method'
    },
    {
      displayName: "Envelope",
      contentName: 'envelope',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.envelope'
    },
    {
      displayName: "Database CSV",
      contentName: 'tdl.databaseCsv',
      active: false, 
      sSearch: [],
      databaseName : 'DatabaseCsv'
    },
    {
      displayName: "C SV URL",
      contentName: 'csvUrl',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.csvUrl'
    },
    {
      displayName: "Separator",
      contentName: 'separator',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.separator'
    },
    {
      displayName: "Creation Date",
      contentName: 'created',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.Created'
    },
    {
      displayName: "Creator",
      contentName: 'creator',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.Creator'
    },
    {
      displayName: "Modification Date",
      contentName: 'lastModified',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.LastModified'
    },
    {
      displayName: "Last Modifier",
      contentName: 'lastModifier',
      active: false, 
      sSearch: [],
      databaseName : 'tdl.LastModifier'
    },
    {
      displayName: "Column",
      contentName: 'subDataColumn',
      active: false, 
      sSearch: [],
      databaseName : 'tdd.column'
    },
    {
      displayName: "Parsing Answer",
      contentName: 'subDataParsingAnswer',
      active: false, 
      sSearch: [],
      databaseName : 'tdd.ParsingAnswer'
    },
    {
      displayName: "Column Position",
      contentName: 'subDataColumnPosition',
      active: false, 
      sSearch: [],
      databaseName : 'tdd.ColumnPosition'
    }
  ];
  page = {
    size: 10, //maximum element per page
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
