import { Component, OnInit, Input } from '@angular/core';
import { ITestCase } from 'src/app/shared/model/testcase.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { ProperyGroup, PropertyValue } from 'src/app/shared/model/property.model';

@Component({
  selector: 'app-propertygroup',
  templateUrl: './propertygroup.component.html',
  styleUrls: ['./propertygroup.component.scss']
})
export class PropertygroupComponent implements OnInit {

  // boolean to handle the display of the property values list
  public propertyValuesDisplayed: boolean;

  // boolean to handle the validation of the property group name
  public propertyNameIsAlreadyUsed: boolean;

  // boolean to detect if the the property name is present in the inherited prop list
  public propertyNameIsInherited: boolean;

  // boolean to handle hoover fields
  public showActions: boolean;

  @Input('propertygroup') propertygroup: ProperyGroup; // property grouped by name
  @Input('testcase') testcase: ITestCase; // full testcase object
  @Input('propertyGroups') propertyGroups: Array<ProperyGroup>; // list of all property groups
  @Input('inherited') inherited: boolean; // true if the property is in read-only

  constructor(private testService: TestService) { }

  ngOnInit() {
    // hide the property values by default
    this.propertyValuesDisplayed = false;
    // by default, all names are unique
    this.propertyNameIsAlreadyUsed = false;
    // by default, hide actions
    this.showActions = false;
    // check if the property name is present in the inherited prop
    this.refreshInheritedStatus(this.propertygroup.property);
  }

  // check in all the property values if the country is selected
  // returns true if the country is fetched
  // return false if not
  isACountrySelected(country: string): boolean {
    const countryPresent = (propvalue) => propvalue.country.includes(country);
    return this.propertygroup.values.some(countryPresent);
  }

  // update the boolean to handle the validation of the property group name
  onPropertyNameChange(event: any) {
    // store the values (new and old) as soon as a key is pressed
    const newValue = event.target.value;
    const oldValue = this.propertygroup.property;
    if (this.isAPropertyNameIsAlreadyUsed(newValue, oldValue) === true) {
      // if the property name is already used, its value is set to the old one
      // to avoid conflict
      this.propertygroup.property = oldValue;
      this.renameAllPropertyValues(oldValue);
      this.refreshInheritedStatus(oldValue);
      this.propertyNameIsAlreadyUsed = true;
    } else {
      // if the property name is not used, its value is set to the new one
      this.propertygroup.property = newValue;
      this.renameAllPropertyValues(newValue);
      this.refreshInheritedStatus(newValue);
      this.propertyNameIsAlreadyUsed = false;
    }
  }

  // rename all the property values
  renameAllPropertyValues(name: string) {
    this.propertygroup.values.forEach(propvalue => {
      propvalue.property = name;
    });
  }

  // return true if the property name is already set for another group
  isAPropertyNameIsAlreadyUsed(propnameToCheck: string, propnameBeingModified): boolean {
    // exclude the property group name that it asked from
    const reducedPropertiesList = this.propertyGroups.filter(propertygroup => propertygroup.property !== propnameBeingModified);
    if (propnameToCheck === propnameBeingModified) {
      // we don't compare the property group with itself
      return false;
    } else if (reducedPropertiesList.find(propvalue => propvalue.property === propnameToCheck) === undefined) {
      // if no result is found, returns false
      return false;
    } else {
      // if a property with the same name is found, returns true
      return true;
    }
  }

  // return true if the property name is present in the inherited properties of the test case
  isAPropertyNameIsInherited(propname: string): boolean {
    const listOfInheritedProp = this.testcase.inheritedProp;
    const listOfInheritedPropNames = new Array<string>();
    // create an array with all unique properties names
    listOfInheritedProp.forEach(propvalue => {
      if (!listOfInheritedPropNames.includes(propvalue.property)) {
        listOfInheritedPropNames.push(propvalue.property);
      }
    });
    return listOfInheritedPropNames.includes(propname);
  }

  // process the property group name and update
  // the propertyNameIsInherited boolean
  refreshInheritedStatus(propname: string) {
    // perform the actions only if the component isn't in inherited mode
    if (this.inherited === false) {
      if (this.isAPropertyNameIsInherited(propname) === true) {
        this.propertyNameIsInherited = true;
      } else {
        this.propertyNameIsInherited = false;
      }
    }
  }

  // create a new empty property value
  addAPropertyValue() {
    const newpropvalue = new PropertyValue(this.propertygroup.property);
    this.propertygroup.values.push(newpropvalue);
    this.propertyValuesDisplayed = true;
  }

  // add the same property value to the group (with empty country list)
  duplicateAPropertyValue(propvalue: PropertyValue) {
    // create a new property value object and map all the values from the recevied object
    // Angular seems to maintain the input binding with the model..
    const newpropvalue = new PropertyValue(propvalue.property);
    newpropvalue.cacheExpire = propvalue.cacheExpire;
    newpropvalue.database = propvalue.database;
    newpropvalue.description = propvalue.description;
    newpropvalue.length = propvalue.length;
    newpropvalue.nature = propvalue.nature;
    newpropvalue.rank = propvalue.rank;
    newpropvalue.retryNb = propvalue.retryNb;
    newpropvalue.retryPeriod = propvalue.retryPeriod;
    newpropvalue.rowLimit = propvalue.rowLimit;
    newpropvalue.type = propvalue.type;
    newpropvalue.value1 = propvalue.value1;
    newpropvalue.value2 = propvalue.value2;
    this.propertygroup.values.push(newpropvalue);
  }

  // return the text to display according to the property group deletion status
  getDeletionPopoverText(): string {
    if (this.propertygroup.toDelete === true) {
      return 'This properties will be deleted after saving';
    } else {
      return 'Delete values';
    }
  }

  // return true if the delete button should be displayed
  // in the situation the propery group is flagged for deletion
  isDeleteButtonDisplayed(): boolean {
    if (this.showActions === true || this.propertygroup.toDelete === true) {
      return true;
    } else {
      return false;
    }
  }

  removePropertyGroup() {
    this.propertygroup.toDelete = true;
  }

}
