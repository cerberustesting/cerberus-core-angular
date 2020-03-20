import { Component, OnInit, Input } from '@angular/core';
import { PropertyValue, ProperyGroup } from 'src/app/shared/model/back/property.model';
import { TestCase } from 'src/app/shared/model/back/testcase.model';
import { Invariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  // raw properties list
  @Input('properties') properties: Array<PropertyValue>;

  // inherited properties mode
  @Input('inherited') inherited: boolean;

  // full test case object
  @Input('testcase') testcase: TestCase;

  /** property groups : properties grouped by name */
  public propertyGroups: Array<ProperyGroup>;

  /** public invariants */
  private countries: Array<Invariant>;

  constructor(private invariantService: InvariantsService) { }

  ngOnInit() {
    // create the property group (for display reason)
    this.groupPropertiesByName();

    // get the countries list
    this.invariantService.observableCountriesList.subscribe(r => { this.countries = r; });
  }

  // refresh the property groups
  groupPropertiesByName(): void {
    // list of unique property names
    const propertiesNameList = new Array<string>();
    // final object that is build along the function
    const propertiesValuesByName = new Array<ProperyGroup>();
    // fill the array with unique names
    this.properties.forEach(propvalue => {
      if (!propertiesNameList.includes(propvalue.property)) {
        propertiesNameList.push(propvalue.property);
      }
    });
    // build the final object for each prop name
    propertiesNameList.forEach(propname => {
      const propValueByName = new ProperyGroup(propname);
      propValueByName.values = this.properties.filter(propvvalue => propvvalue.property === propname);
      propertiesValuesByName.push(propValueByName);
    });
    // save the new value
    this.propertyGroups = propertiesValuesByName;
  }

  /**
   * add a new property group with one property value
  */
  addAPropertyGroup(): void {
    // create a new property group
    const newPropertyGroup = new ProperyGroup(this.getLatestNewPropertyName());
    // create a new property value
    const newPropertyValue = new PropertyValue(this.getLatestNewPropertyName());
    // add all the available countries to the first value
    newPropertyValue.countries = this.countries;
    // add the property value to the property group, then the property group
    newPropertyGroup.values.push(newPropertyValue);
    this.propertyGroups.push(newPropertyGroup);
  }

  // new property group name are generated following:
  // 'NewProperty1', 'NewProperty2', ...
  // this function returns the latest  incremental name
  getLatestNewPropertyName(): string {
    // if we find a property group with a name starting with 'NewProperty'
    if (this.propertyGroups.find(propgroup => propgroup.property.startsWith('NewProperty')) !== undefined) {
      // get the content after the prefix 'NewProperty'
      const indexes = new Array<number>();
      this.propertyGroups.filter(propgroup => propgroup.property.startsWith('NewProperty')).forEach(propgroup => {
        if (!isNaN(Number(propgroup.property.substring(11)))) {
          indexes.push(Number(propgroup.property.substring(11)));
        }
      });
      const maxIndex = Math.max(...indexes);
      return 'NewProperty' + String(maxIndex + 1);
    } else {
      return 'NewProperty1';
    }
  }

  // return the correct title depending on the inherited prop
  getTitle(): string {
    if (this.inherited === true) { return 'Inherited Properties'; } else { return 'Properties'; }
  }
}
