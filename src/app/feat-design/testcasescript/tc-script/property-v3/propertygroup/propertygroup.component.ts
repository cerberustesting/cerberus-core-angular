import { Component, OnInit, Input } from '@angular/core';
import { ITestCase } from 'src/app/shared/model/testcase.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { PropertyByName } from '../property-v3.component';

@Component({
  selector: 'app-propertygroup',
  templateUrl: './propertygroup.component.html',
  styleUrls: ['./propertygroup.component.scss']
})
export class PropertygroupComponent implements OnInit {

  // boolean to handle the display of the property values list
  public propertyValuesDisplayed: boolean;

  @Input('propertygroup') propertygroup: PropertyByName; // property grouped by name
  @Input('testcase') testcase: ITestCase; // full testcase object

  constructor(private testService: TestService) { }

  ngOnInit() {
    // hide the property values by default
    this.propertyValuesDisplayed = false;
  }

  // use the format function from test service
  formatCountryList(rawList: any) {
    return this.testService.formatCountryList(rawList);
  }

  // check in all the property values if the country is selected
  // returns true if the country is fetched
  // return false if not
  isACountrySelected(country: string): boolean {
    const countryPresent = (propvalue) => propvalue.country.includes(country);
    return this.propertygroup.values.some(countryPresent);
  }

}
