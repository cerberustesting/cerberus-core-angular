import { Component, OnInit, Input } from '@angular/core';
import { TestService } from 'src/app/core/services/crud/test.service';
import { Property } from 'src/app/shared/model/property.model';
import { ITestCase } from 'src/app/shared/model/testcase.model';

export class PropertyByName {
  property: string; // name of the property values
  values: Array<Property>; // list of all properties values
}

@Component({
  selector: 'app-property-v3',
  templateUrl: './property-v3.component.html',
  styleUrls: ['./property-v3.component.scss']
})
export class PropertyV3Component implements OnInit {

  // unique couple (folder, id) used for querying the API
  // to refresh the properties list
  @Input('testfolder') testfolder: string;
  @Input('testcaseid') testcaseid: string;

  @Input('testcase') testcase: ITestCase; // full testcase object

  // raw list of properties
  private propertiesList: Array<Property>;
  // property groups : properties grouped by name
  public propertyGroups: Array<PropertyByName>;

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

    // subscribe to any propertiesList change
    this.testService.observableTestCaseProperties.subscribe(r => {
      if (r) {
        this.propertiesList = r;
        this.groupPropertiesByName();
      }
    });
  }

  groupPropertiesByName(): void {
    // list of unique property names
    const propertiesNameList = new Array<string>();
    // final object that is build along the function
    const propertiesValuesByName = new Array<PropertyByName>();
    // fill the array with unique names
    this.propertiesList.forEach(propvalue => {
      if (!propertiesNameList.includes(propvalue.property)) {
        propertiesNameList.push(propvalue.property);
      }
    });
    // build the final object for each prop name
    propertiesNameList.forEach(propname => {
      const propValueByName = new PropertyByName();
      propValueByName.property = propname;
      propValueByName.values = this.propertiesList.filter(propvvalue => propvvalue.property === propname);
      propertiesValuesByName.push(propValueByName);
    });
    // save the new value
    this.propertyGroups = propertiesValuesByName;
  }

}
