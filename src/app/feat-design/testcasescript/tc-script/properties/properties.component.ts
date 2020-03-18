import { Component, OnInit, Input } from '@angular/core';
import { PropertyValue, ProperyGroup } from 'src/app/shared/model/back/property.model';
import { TestCase } from 'src/app/shared/model/back/testcase.model';

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

  constructor() { }

  ngOnInit() {
    //  create the property group (for display reason)
    this.groupPropertiesByName();
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

  // create a new empty property
  addAPropertyGroup(): void {
    const newPropertyGroup = new ProperyGroup(this.getLatestNewPropertyName());
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
