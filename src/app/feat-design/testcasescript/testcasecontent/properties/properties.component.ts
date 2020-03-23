import { Component, OnInit, Input } from '@angular/core';
import { PropertyValue, PropertyGroup } from 'src/app/shared/model/back/testcase/property.model';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { Invariant } from 'src/app/shared/model/back/invariant/invariant.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  /** property groups (V2) */
  @Input('propertygroups') propertyGroups: Array<PropertyGroup>;

  /** inherited properties mode */
  @Input('inherited') inherited: boolean;

  /** full test case object */
  @Input('testcase') testcase: TestCase;

  /** public invariants */
  private countries: Array<Invariant>;

  constructor(private invariantService: InvariantsService) { }

  ngOnInit() {
    // get the countries list
    this.invariantService.observableCountriesList.subscribe(r => { this.countries = r; });
  }

  /**
   * add a new property group with one property value
  */
  addAPropertyGroup(): void {
    // create a new property group
    const newPropertyGroup = new PropertyGroup(this.getLatestNewPropertyName());
    // create a new property value
    const newPropertyValue = new PropertyValue(this.getLatestNewPropertyName());
    // add all the available countries to the first value
    newPropertyValue.countries = this.countries;
    // add the property value to the property group, then the property group
    newPropertyGroup.values.push(newPropertyValue);
    this.propertyGroups.push(newPropertyGroup);
  }

  /**
   *  returns the latest incremental name for new property group: 'NewProperty1', 'NewProperty2'...
  */
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

  /**
   * return the correct title depending on the inherited prop mode
  */
  getTitle(): string {
    if (this.inherited === true) { return 'Inherited Properties'; } else { return 'Properties'; }
  }
}
