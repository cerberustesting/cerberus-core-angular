import { Component, OnInit, Input } from '@angular/core';
import { TestService } from 'src/app/core/services/crud/test.service';
import { Property } from 'src/app/shared/model/property.model';
import { PropertyByName } from './propertygroup/propertygroup.component';

@Component({
  selector: 'app-property-v3',
  templateUrl: './property-v3.component.html',
  styleUrls: ['./property-v3.component.scss']
})
export class PropertyV3Component implements OnInit {

  @Input('test') test: string;
  @Input('testcase') testcase: string;

  // raw list of properties
  private propertiesList: Array<Property>;
  // property groups : properties grouped by name
  public propertyGroups: Array<PropertyByName>;

  constructor(private testService: TestService) { }

  ngOnInit() {

    // ensure the test & testcase are defined
    if (!this.test) {
      console.error('ERROR: test is not defined, please open an issue on github');
    } else if (!this.testcase) {
      console.error('ERROR: testcase is not defined, please open an issue on github');
    } else {
      // refresh the properties list
      this.testService.getProperties(this.test, this.testcase);
    }

    // subscribe to any propertiesList change
    this.testService.observableTestCaseProperties.subscribe(r => {
      if (r) {
        this.propertiesList = r;
        this.propertyGroups = this.groupPropertiesByName();
      }
    });
  }

  groupPropertiesByName() {
    const propertiesNameList = new Array<string>();
    const propertiesValuesByName = new Array<PropertyByName>();

    // fill the array with unique names
    this.propertiesList.forEach(propvalue => {
      if (!propertiesNameList.includes(propvalue.property)) {
        propertiesNameList.push(propvalue.property);
      }
    });

    propertiesNameList.forEach(propname => {
      // properties values with the same name
      const propValueByName = new PropertyByName();
      propValueByName.property = propname;
      propValueByName.values = this.propertiesList.filter(propvvalue => propvvalue.property === propname);
      propValueByName.countriesList = new Array<string>();
      this.propertiesList
        .filter(propvvalue => propvvalue.property === propname)
        .forEach(propvalue => {
          propvalue.country.forEach(country => {
            propValueByName.countriesList.push(country);
          });
        });
      propertiesValuesByName.push(propValueByName);
    });

    return propertiesValuesByName;
  }

}
