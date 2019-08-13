import { Component, OnInit } from '@angular/core';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';

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

  // *** selzct options list ***
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
  

  constructor(private invariantService: InvariantsService) { }

  ngOnInit() {
    console.log(this.datalib);
    this.systemsList = this.invariantService.systemsList;
    this.countriesList = this.invariantService.countriesList;
  }

}
