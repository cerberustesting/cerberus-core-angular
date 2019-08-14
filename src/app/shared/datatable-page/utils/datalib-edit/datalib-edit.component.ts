import { Component, OnInit } from '@angular/core';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { TestService } from 'src/app/core/services/crud/test.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-datalib-edit',
  templateUrl: './datalib-edit.component.html',
  styleUrls: ['./datalib-edit.component.scss']
})
export class DatalibEditComponent implements OnInit {

  // *** Inputs ***
  datalib: any;
  duplicate: boolean;

  // *** controle property ***
  paneActive = 1;
  serviceCollapse = false;
  sqlCollapse = false;
  csvCollapse = false;
  columns = [
    {name: 'Sub-data', prop: 'subData'},
    {name: 'Encrypt', prop: 'encrypt'},
    {name: 'Value', prop: 'value'},
    {name: 'Column', prop: 'column'},
    {name: 'Parsing Answer', prop: 'parsingAnswer'},
    {name: 'Column Position', prop: 'columnPosition'},
    {name: 'Description', prop: 'description'}
  ]

  // *** select options list ***
  systemsList: any[];
  environmentList: any[] = [ // TODO : set dynamically
    {value: 'DEV', description: 'Developpement'},
    {value: 'QA', description: 'Quality Assurance'},
    {value: 'UAT', description: 'User Acceptance Test'},
    {value: 'PREPROD', description: 'PreProduction'},
    {value: 'DEMO', description: 'Demonstration'},
    {value: 'PROD', description: 'Production'}
  ];
  countriesList: any[];
  databasesList: any[] = [ // TODO : set dynamically && wich property for wich datatable
    {value: "CRB", description: "CERBERUS Database"}
  ];
  serviceList: any[]; // TODO : set dynamically

  // *** datalib properties ***
  data: any[];

  // *** main form ***
  private datalibForm: FormGroup;

  // class="custom-select" formControlName="database"
  // [formGroup]="datalibForm"
  

  constructor(private invariantService: InvariantsService, private testService: TestService,  private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.systemsList = this.invariantService.systemsList;
    this.countriesList = this.invariantService.countriesList;
    this.testService.getDataLibData(this.datalib.testDataLibID, data => {
      this.data = data.contentTable;
    });

    this.datalibForm = this.formBuilder.group({
      testdatalibid: this.datalib.testdatalibID,
      name: this.datalib.name,
      type: this.datalib.type,
      system: this.datalib.system,
      environment: this.datalib.environment,
      country: this.datalib.country,
      databaseUrl: this.datalib.databaseUrl,
      service: this.datalib.service,
      servicepath: this.datalib.servicePath,
      method: this.datalib.method,
      database: this.datalib.database,
      databaseCsv: this.datalib.databaseCsv,
      csvUrl: this.datalib.csvUrl,
      separator: this.datalib.separator,
      group: this.datalib.group,
      libdescription: this.datalib.description,
      created: this.datalib.created,
      creator: this.datalib.creator,
      lastModified: this.datalib.lastModified,
      lastModifier: this.datalib.lastModifier,
      envelope: this.datalib.envelope,
      script: this.datalib.script,
      privateData: (this.datalib.privateData==='Y'),
      file: this.datalib.file,
      subDataList: "[{\"testDataLibDataID\":157,\"subData\":\"\",\"testDataLibID\":60,\"parsingAnswer\":\"\",\"encrypt\":false,\"column\":\"\",\"columnPosition\":\"\",\"description\":\"\",\"value\":\"\",\"toDelete\":false}]"
    });
    
    // TODO : add subdata to request
    
  }
  onSubmit(values) {
    console.log(values);
    if(!values.file) values.file = 'undifined'
    //values.subDataList = []; // TODO : add subdata to request
    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key])
    }

    //let queryString = $.param(values);
    //request edit
    this.testService.updateTestDataLib(formData).subscribe(() => this.refreshTable())
  }
  refreshTable() {

  }

}
