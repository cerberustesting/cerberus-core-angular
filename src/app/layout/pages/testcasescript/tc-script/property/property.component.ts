import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IProperty, Property } from 'src/app/model/property.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { IInvariant } from 'src/app/model/invariants.model';
import { TestService } from 'src/app/services/crud/test.service';
import { ITestCaseHeader } from 'src/app/model/testcase.model';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit, OnChanges {

  @Input('propertiesByCountry') propertiesByCountry: Array<IProperty>;
  private countriesList: Array<String>;
  private inv_countriesList: Array<IInvariant>;
  private inv_propertyTypeList: Array<IInvariant>;
  private defaultProperty: IProperty;

  private testcaseheader: ITestCaseHeader;

  private selectedCountry: string;
  private showPropertyOptions: boolean;

  constructor(
    private InvariantsService: InvariantsService,
    private TestService: TestService
  ) { }

  ngOnChanges() {
    this.defaultProperty = this.defineDefaultProperty(this.propertiesByCountry);
    this.selectedCountry = 'All';
  }

  ngOnInit() {
    this.TestService.observableTestCase.subscribe(r => { this.testcaseheader = r.info; });
    this.InvariantsService.observableCountriesList.subscribe(r => {
      this.inv_countriesList = r;
      this.countriesList = new Array<string>();
      for (var index in this.inv_countriesList) {
        // check that the country is enabled for the testcase
        if (this.TestService.isCountryDefinedForTestCase(this.testcaseheader, this.inv_countriesList[index].value)) {
          this.countriesList.push(this.inv_countriesList[index].value);
        }
      }
    });
    this.InvariantsService.observablePropertyTypeList.subscribe(r => { this.inv_propertyTypeList = r; });
    this.defaultProperty = this.defineDefaultProperty(this.propertiesByCountry);
    this.selectedCountry = 'All';
    this.showPropertyOptions = false;
  }

  // DIRTY : the model should return it
  defineDefaultProperty(propList: Array<IProperty>): IProperty {
    // get the first most present property (defined in the most countries) 
    var PropsCount = new Array<number>();
    propList.forEach((prop, index) => {
      PropsCount[index] = propList.filter(p => this.isPropertyEquals(p, prop)).length;
    });
    var PropIndex = PropsCount.indexOf(Math.max(...PropsCount));
    var Prop = propList[PropIndex];
    var newProp = new Property();
    newProp.property = Prop.property;
    newProp.description = Prop.description;
    newProp.cacheExpire = Prop.cacheExpire;
    newProp.database = Prop.database;
    newProp.length = Prop.length;
    newProp.nature = Prop.nature;
    newProp.rank = Prop.rank;
    newProp.retryNb = Prop.retryNb;
    newProp.retryPeriod = Prop.retryPeriod;
    newProp.rowLimit = Prop.rowLimit;
    newProp.type = Prop.type;
    newProp.value1 = Prop.value1;
    newProp.value2 = Prop.value2;
    return newProp;
  }

  // DIRTY
  isPropertyEquals(prop1: IProperty, prop2: IProperty) {
    // exclude country
    if (
      prop1.property == prop2.property &&
      prop1.description == prop2.description &&
      prop1.type == prop2.type &&
      prop1.cacheExpire == prop2.cacheExpire &&
      prop1.database == prop2.database &&
      prop1.length == prop2.length &&
      prop1.nature == prop2.nature &&
      prop1.rank == prop2.rank &&
      prop1.retryNb == prop2.retryNb &&
      prop1.retryPeriod == prop2.retryNb &&
      prop1.rowLimit == prop2.rowLimit &&
      prop1.value1 == prop2.value1 &&
      prop1.value2 == prop2.value2
    ) { return true; }
    else { return false; }
  }

  debug() {
    console.log(this.propertiesByCountry);
  }

}
