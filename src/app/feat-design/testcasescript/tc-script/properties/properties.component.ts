import { Component, OnInit, Input } from '@angular/core';
import { TestService } from 'src/app/core/services/crud/test.service';
import { PropertyValue, ProperyGroup } from 'src/app/shared/model/property.model';
import { ITestCase } from 'src/app/shared/model/testcase.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  // unique couple (folder, id) used for querying the API
  // to refresh the properties list
  @Input('testfolder') testfolder: string;
  @Input('testcaseid') testcaseid: string;

  // inherited properties mode
  @Input('inherited') inherited: boolean;

  // full testcase object
  @Input('testcase') testcase: ITestCase;

  // raw list of properties (used only to store the API result)
  private propertiesList: Array<PropertyValue>;
  // property groups : properties grouped by name
  public propertyGroups: Array<ProperyGroup>;

  constructor(private testService: TestService) { }

  ngOnInit() {
    // ensure the test & testcase are defined
    if (!this.testfolder) {
      console.error('ERROR: test is not defined, please open an issue on github');
    } else if (!this.testcaseid) {
      console.error('ERROR: testcase is not defined, please open an issue on github');
    } else {
      // refresh the properties list
      this.testService.getProperties(this.testfolder, this.testcaseid);
    }

    // depending on the mode, use a different properties list
    if (this.inherited === true) {
      this.propertiesList = this.testcase.inheritedProp;
      this.groupPropertiesByName();
    } else {
      // subscribe to any propertiesList change
      this.testService.observableTestCaseProperties.subscribe(r => {
        if (r) {
          this.propertiesList = r;
          this.groupPropertiesByName();
        }
      });
    }

  }

  // refresh the property groups
  groupPropertiesByName(): void {
    // list of unique property names
    const propertiesNameList = new Array<string>();
    // final object that is build along the function
    const propertiesValuesByName = new Array<ProperyGroup>();
    // fill the array with unique names
    this.propertiesList.forEach(propvalue => {
      if (!propertiesNameList.includes(propvalue.property)) {
        propertiesNameList.push(propvalue.property);
      }
    });
    // build the final object for each prop name
    propertiesNameList.forEach(propname => {
      const propValueByName = new ProperyGroup(propname);
      propValueByName.values = this.propertiesList.filter(propvvalue => propvvalue.property === propname);
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
