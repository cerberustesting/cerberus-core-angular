import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IProperty } from 'src/app/shared/model/property.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITestCaseHeader, ITestCase } from 'src/app/shared/model/testcase.model';
import { TestService } from 'src/app/core/services/crud/test.service';


@Component({
  selector: 'app-property-v2',
  templateUrl: './property-v2.component.html',
  styleUrls: ['./property-v2.component.scss']
})
export class PropertyV2Component implements OnInit {
  @Input('properties') propertiesList: Array<any>;
  @Input('testcase') testcase: ITestCase;
  @ViewChild('propertyTable', { static: false }) table: any;

  constructor(
    private invariantService: InvariantsService, 
    private formBuilder: FormBuilder, 
    private testService: TestService) { }
  
  
  private editing: Array<boolean>;
  private propertyForms: Array<any>;
  private propertyType: Array<any>;
  private propertyDatabase: Array<any>;
  private propertyNature: Array<any>;
  private countryList: Array<any>;
  private testcaseheader: ITestCaseHeader;
  private testCaseCountryList: Array<String>;
  private columnsList = [
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

  ngOnInit(): void {
    this.testService.observableTestCase.subscribe(response => { this.testcaseheader = response.info; }); //get current TC header
    this.propertyType = this.invariantService.propertyTypeList;
    this.propertyDatabase = this.invariantService.propertyDatabaseList;
    this.propertyNature = this.invariantService.propertyNatureList;
    this.editing = this.propertiesList.map(e => false);
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
    // get countries from testcase
    this.testCaseCountryList = [];
    for (let country in this.testcase.info.countryList) {
      this.testCaseCountryList.push(country);
    }
    this.updateSelectableCountries();
  }

  /**
   * updateValue
   * * Disable edition in the table row
   * TODO : Save new value
   * @param rowIndex 
   */
  updateValue(rowIndex): void {
    this.editing[rowIndex] = false;
  }

  /**
   * updateSelectableCountries
   * * update selectable countries in property edition depended of already selected countries
   */
  updateSelectableCountries(): void {
    let selectedCountriesByPropertyName = {};
    // fill selectedCountriesByPropertyName with selected countries split by property name
    this.propertiesList.forEach(property => {
      if (!selectedCountriesByPropertyName[property.property]) selectedCountriesByPropertyName[property.property] = [];
      selectedCountriesByPropertyName[property.property] = selectedCountriesByPropertyName[property.property].concat(property.country);
    });
    // set selectableCountries with countries of the testcase minus the already selected 
    // countries from selectedCountriesByPropertyName and add country from that property
    this.propertiesList.forEach(property => {
      property.selectableCountries = this.testCaseCountryList.filter(country => !selectedCountriesByPropertyName[property.property].includes(country)).concat(property.country).sort();
    });
  }
  
  /**
   * onActivate
   * * Call for each event on a row
   * * Toggle rowDetail on click
   * @param event (generate by angular)
   */
  onActivate(event): void {
    if (event.type == 'click') {
      this.table.rowDetail.toggleExpandRow(event.row);
    }
  }

  /**
   * toggleChk
   * * call on checkbox selection in property countries list
   * * Push the country in the property countries list or remove it
   * @param property Property to change
   * @param country Country pressed
   */
  toggleChk(property, country): void {
    if (property.country.includes(country)) property.country.splice(property.country.indexOf(country));
    else property.country.push(country);
    this.updateSelectableCountries()
  }

  /**
   * toggleExpandGroup
   * * toggle collapse of this group in table
   * @param group the group to expand/collapse
   */
  toggleExpandGroup(group): void {
    this.table.groupHeader.toggleExpandGroup(group);
  }

}
