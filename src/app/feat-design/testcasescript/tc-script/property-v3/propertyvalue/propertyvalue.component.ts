import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyValue, ProperyGroup } from 'src/app/shared/model/property.model';
import { ITestCase } from 'src/app/shared/model/testcase.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';

@Component({
  selector: 'app-propertyvalue',
  templateUrl: './propertyvalue.component.html',
  styleUrls: ['./propertyvalue.component.scss']
})
export class PropertyvalueComponent implements OnInit {

  @Input('propertyvalue') propertyvalue: PropertyValue; // property value
  @Input('propertyvalueIndex') index: number; // index to build ids
  @Input('testcase') testcase: ITestCase; // full testcase object
  @Input('propertygroup') propertygroup: ProperyGroup; // property group object will all values from others properties values

  // event to send to parent component with the name of the property to be duplicated
  @Output() propertyValueDuplication = new EventEmitter<PropertyValue>();

  // boolean to handle property value detail display
  public propertyValueDetailsDisplay: boolean;

  // boolean to handle the display of the actions (duplicate, delete)
  public showActions: boolean;

  // private invariants
  private propertyTypesList: Array<IInvariant>;

  constructor(
    private testService: TestService,
    private notificationService: NotificationService,
    private invariantService: InvariantsService
  ) { }

  ngOnInit() {
    // hide details by default
    this.propertyValueDetailsDisplay = false;
    // hide by default the actions
    this.showActions = false;
    // subscribe to property type invariants
    this.invariantService.observablePropertyTypeList.subscribe(r => { if (r) { this.propertyTypesList = r; } });
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

  // send the property value to the parent component to be added to the list
  duplicateAPropertyValue() {
    this.propertyValueDuplication.emit(this.propertyvalue);
  }

  // send the property value to the parent component to be removed from the list
  deleteAPropertyValue() {
    this.propertyvalue.toDelete = !this.propertyvalue.toDelete;
  }

  // return the text to display according to the property value deletion status
  getDeletionPopoverText(): string {
    if (this.propertyvalue.toDelete === true) {
      return 'This property will be deleted after saving';
    } else {
      return 'Delete value';
    }
  }

  // return true if the delete button should be displayed
  // in the situation the propery value is flagged for deletion
  isDeleteButtonDisplayed(): boolean {
    if (this.showActions === true || this.propertyvalue.toDelete === true) {
      return true;
    } else {
      return false;
    }
  }

}
