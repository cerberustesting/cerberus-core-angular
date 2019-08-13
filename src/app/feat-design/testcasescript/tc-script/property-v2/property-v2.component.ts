import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IProperty } from 'src/app/shared/model/property.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITestCaseHeader } from 'src/app/shared/model/testcase.model';
import { TestService } from 'src/app/core/services/crud/test.service';


@Component({
  selector: 'app-property-v2',
  templateUrl: './property-v2.component.html',
  styleUrls: ['./property-v2.component.scss']
})
export class PropertyV2Component implements OnInit {
  @Input('properties') propertiesList: Array<any>;
  @ViewChild('myTable', { static: false }) table: any;

  constructor(private invariantService: InvariantsService, private formBuilder: FormBuilder, private testService: TestService) { }
  properties = [
    { name: 'name 1', properties: [{ index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }] },
    { name: 'name 2', properties: [{ index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }] },
    { name: 'name 3', properties: [{ index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }] },
    { name: 'name 4', properties: [{ index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }] },
    { name: 'name 5', properties: [{ index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }] },
    { name: 'name 6', properties: [{ index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }] },
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
  countryList: Array<any>;
  private testcaseheader: ITestCaseHeader;
  onActivate(event) {
    if (event.type == 'click') {
      this.table.rowDetail.toggleExpandRow(event.row);
    }
  }

  ngOnInit() {
    console.log(this.propertiesList);
    this.testService.observableTestCase.subscribe(r => { this.testcaseheader = r.info; });
    this.propertyType = this.invariantService.propertyTypeList;
    this.propertyDatabase = this.invariantService.propertyDatabaseList;
    this.propertyNature = this.invariantService.propertyNatureList;
    this.countryList = this.invariantService.countriesList; // TODO : remove countries outside TC header
    this.editing = this.propertiesList.map(e => false);
    this.countryList = this.testService.convertCountriesList(this.testcaseheader);
    this.propertyForms = this.propertiesList.map(e => {
      return this.formBuilder.group({
        type: e.type,
        database: e.database,
        value: e.value1,
        description: e.description,
        length: e.length,
        nature: e.nature,
        cacheExpire: e.cacheExpire,
        rank: e.rank
      })
    });
    let temp = {};
    let tempCountry = {};



    for (let property of this.propertiesList) {
      if (!temp[property.property]) temp[property.property] = { properties: [], countries: [] };      
      temp[property.property].properties.push(property);
      temp[property.property].countries.concat(property.country);
    }
    for (let property in temp) {
      this.mapProperties.push({ name: property, properties: temp[property].properties, country: temp[property].countries.filter((item, index)=> 
               temp[property].countries.indexOf(item)===index
      )});
    }
  }
  updateValue(rowIndex) {
    this.editing[rowIndex] = false;
  }

  toggleChk(property, country) {
    if (property.country.includes(country)) property.country.splice(property.country.indexOf(country));
    else property.country.push(country);
  }

  // getPropertyCountryList(property) {
  //   let rep = this.countryList;
  //   this.propertiesList.filter(p => p.property === property.property).forEach((p, i) => {
        
  //       p.country.forEach(c => {
  //         if (rep.includes(c)) {
  //           console.log("splice",c)
  //           rep.splice(i,1)
  //         }
  //       })
      
  //   });
    
  //   return rep.concat(property.country).filter((c, i, list) => list.indexOf(c)===i);
  // }

}
