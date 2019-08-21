import { Component, OnInit } from '@angular/core';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { TestService } from 'src/app/core/services/crud/test.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import { SidecontentService } from 'src/app/core/services/crud/sidecontent.service';

export enum MODE {
  EDIT = 'EDIT',
  DUPLICATE = 'DUPLICATE',
  CREATE = 'CREATE'
}

@Component({
  selector: 'app-datalib-interaction',
  templateUrl: './datalib-interaction.component.html',
  styleUrls: ['./datalib-interaction.component.scss']
})
export class DatalibInteractionComponent implements OnInit {
  
  // *** Inputs ***
  datalib: any; // datalib to edit
  mode: MODE; // EDIT / DUPLICATE / 
  MODES:MODE;
  exit: (n: void) => void; //function to execute when press submit button

  // *** main form ***
  private datalibForm: FormGroup;

  // *** controle property ***
  paneActive = 1;
  serviceCollapse = false;
  sqlCollapse = false;
  csvCollapse = false;
  columns: Array<any>

  // *** select options list ***
  systemsList: any[];
  environmentList: any[] = [ // TODO : set dynamically
    { value: 'DEV', description: 'Developpement' },
    { value: 'QA', description: 'Quality Assurance' },
    { value: 'UAT', description: 'User Acceptance Test' },
    { value: 'PREPROD', description: 'PreProduction' },
    { value: 'DEMO', description: 'Demonstration' },
    { value: 'PROD', description: 'Production' }
  ];
  editing = {};

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.data[rowIndex][cell] = event.target.value;
    this.data = [...this.data];
    console.log('UPDATED!', this.data[rowIndex][cell]);
  }

  countriesList: any[];
  databasesList: any[];

  serviceList: any[]; // TODO : set dynamically

  // *** datalib properties ***
  data: any[];




  constructor(
    private invariantService: InvariantsService,
    private testService: TestService,
    private formBuilder: FormBuilder,
    private sidecontentService: SidecontentService) { }

  ngOnInit() {
    this.invariantService.getCountriesList(); // TODO : remove to place at the top of project
    this.invariantService.getPropertyDatabaseList(); // TODO : remove to place at the top of project
    this.systemsList = this.invariantService.systemsList;
    this.invariantService.observableCountriesList
      .subscribe(rep => this.countriesList = rep);

    this.invariantService.observablePropertyDatabaseList
      .subscribe(rep => this.databasesList = rep);

    if (this.datalib.testDataLibID) {
      this.testService.getDataLibData(this.datalib.testDataLibID, data => {
        this.data = data.contentTable;
      });
    }

    this.datalibForm = this.formBuilder.group({
      testdatalibid: (this.mode === MODE.DUPLICATE) ? '' : this.datalib.testDataLibID,
      name: this.datalib.name,
      type: this.datalib.type || 'INTERNAL',
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
      privateData: (this.datalib.privateData === 'Y'),
      file: this.datalib.file,
    });
    this.datalibForm.valueChanges.subscribe(rep => this.setColumns());
    this.setColumns();
  }

  /** setColumns
   * * set columns property and activation depending of the selected type
   * * Called each time the form change
   */
  setColumns(): void {
    this.columns = [
      { name: 'Sub-data', prop: 'subData', condition: "true" },
      { name: 'Encrypt', prop: 'encrypt', condition: "true" },
      { name: 'Value', prop: 'value', condition: this.datalibForm.value.type === 'INTERNAL' },
      { name: 'Column', prop: 'column', condition: this.datalibForm.value.type === 'SQL' },
      { name: 'Parsing Answer', prop: 'parsingAnswer', condition: this.datalibForm.value.type === 'SERVICE' },
      { name: 'Column Position', prop: 'columnPosition', condition: this.datalibForm.value.type === 'CSV' },
      { name: 'Description', prop: 'description', condition: "true" }
    ]
  }

  /** onSubmit
   * * submit values and call the API
   * @param values values to submit
   */
  onSubmit(values: any): void {
    for (let row in this.data) {
      this.data[row]['toDelete'] = false;
      this.data[row].encrypt = (this.data[row].encrypt === 'Y') ? true : false
    }
    values['subDataList'] = JSON.stringify(this.data);
    if (!values.file) values.file = 'undifined'

    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key] || '');
    }
    if (this.mode === MODE.CREATE) {
      this.testService.updateTestDataLib(formData).subscribe(() => this.refreshTable());
    } else {
      this.testService.createTestDataLib(formData).subscribe(() => this.refreshTable());
    }
  }

  /** refreshTable
   * * close SideBlock and execute exit
   */
  refreshTable(): void {
    this.sidecontentService.closeSideBlock();
    this.exit(); //reload rows in datatable
  }

}
