import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IProperty } from 'src/app/shared/model/property.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-property-v2',
  templateUrl: './property-v2.component.html',
  styleUrls: ['./property-v2.component.scss']
})
export class PropertyV2Component implements OnInit {
  @Input('properties') propertiesList: Array<any>;
  @ViewChild('myTable', { static: false }) table: any;

  constructor(private invariantService: InvariantsService, private formBuilder: FormBuilder) { }
  properties = [
    {name: 'name 1', properties: [{index: 1},{index: 2},{index: 3},{index: 4}]},
    {name: 'name 2', properties: [{index: 1},{index: 2},{index: 3},{index: 4}]},
    {name: 'name 3', properties: [{index: 1},{index: 2},{index: 3},{index: 4}]},
    {name: 'name 4', properties: [{index: 1},{index: 2},{index: 3},{index: 4}]},
    {name: 'name 5', properties: [{index: 1},{index: 2},{index: 3},{index: 4}]},
    {name: 'name 6', properties: [{index: 1},{index: 2},{index: 3},{index: 4}]},
  ]
  mapProperties = [];
  editing: Array<boolean>;
  propertyForms: Array<any>;

  columns = [
    {
      name: 'Name',
      bindValue: 'property',
    },
    {
      name: 'Type',
      bindValue: 'type',
    },
    {
      name: 'Value',
      bindValue: 'value1', //I suppose
    },
  ];
  propertyType: Array<any>;
  propertyDatabase: Array<any>;
  propertyNature: Array<any>;
  onActivate(event) {
    if(event.type == 'click') {
      this.table.rowDetail.toggleExpandRow(event.row);
    }
  }

  ngOnInit() {
    this.propertyType = this.invariantService.propertyTypeList;
    this.propertyDatabase = this.invariantService.propertyDatabaseList;
    this.propertyNature = this.invariantService.propertyNatureList;
    this.editing = this.propertiesList.map(e=>false);
    this.propertyForms = this.propertiesList.map(e => {
      return this.formBuilder.group({
        type: e.type,
        database: e.database,
        countryList: e.countryList,
        value: e.value1,
        description: e.description,
        length: e.length,
        nature: e.nature,
        cacheExpire: e.cacheExpire,
        rank: e.rank
      })
    });
    let temp = {};
    for (let property of this.propertiesList) {
      if (!temp[property.property]) temp[property.property] = {properties: []};
      temp[property.property].properties.push(property);
    }
    for (let property in temp) {
      this.mapProperties.push({name: property, properties: temp[property].properties});
    }
  }
  updateValue(rowIndex) {
    this.editing[rowIndex] = false;
  }

}
