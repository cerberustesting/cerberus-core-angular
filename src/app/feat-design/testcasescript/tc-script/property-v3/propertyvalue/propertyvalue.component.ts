import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'src/app/shared/model/property.model';
import { ITestCase } from 'src/app/shared/model/testcase.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { PropertyByName } from '../property-v3.component';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';

@Component({
  selector: 'app-propertyvalue',
  templateUrl: './propertyvalue.component.html',
  styleUrls: ['./propertyvalue.component.scss']
})
export class PropertyvalueComponent implements OnInit {

  @Input('propertyvalue') propertyvalue: Property; // property value
  @Input('propertyvalueIndex') index: number; // index to build ids
  @Input('testcase') testcase: ITestCase; // full testcase object
  @Input('propertygroup') propertygroup: PropertyByName; // property group object will all values from others properties values

  // boolean to handle property value detail display
  public propertyValueDetailsDisplay: boolean;

  constructor(
    private testService: TestService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    // hide details by default
    this.propertyValueDetailsDisplay = false;
  }

  // call the format functino from test service
  formatCountryList(rawList: any): Array<string> {
    return this.testService.formatCountryList(rawList);
  }

  // return true if the country is selected in the property value
  isACountrySelected(country: string): boolean {
    return this.propertyvalue.country.includes(country);
  }

  // return true if the country is selected in the property group
  isACountrySelectedInPropertyGroup(country: string): boolean {
    const countryPresent = (propvalue) => propvalue.country.includes(country);
    return this.propertygroup.values.some(countryPresent);
  }

  // push a new country (string) to the property value
  addCountryToSelection(country) {
    this.propertyvalue.country.push(country);
  }

  // remove an existing country (string) in the property value
  removeCountryFromSelection(country) {
    const index = this.propertyvalue.country.indexOf(country);
    this.propertyvalue.country.splice(index, 1);
  }

  // fired when a country badge is clicked
  // add the country, removes it or do nothing accordingly
  toggleCountry(country: string): void {
    if (this.isACountrySelectedInPropertyGroup(country)) {
      // if the country is already selected for another property value
      // if we are trying to select it, we do nothing
      if (!this.isACountrySelected(country)) {
        this.notificationService.createANotification('This country is already in use in another property. You must unselect it first for that property.', NotificationStyle.Info);
      } else {
        // if we are trying to unselect it, we removes it
        this.removeCountryFromSelection(country);
      }
    } else {
      // if the country is not selected anywhere, add it to the selection
      this.addCountryToSelection(country);
    }
  }

}
