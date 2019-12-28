import { Component, OnInit, Input } from '@angular/core';
import { ITestCase } from 'src/app/shared/model/testcase.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { Property } from 'src/app/shared/model/property.model';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
// import { PropertyComponent } from 'src/app/layout/pages/testcasescript/tc-script/property/property.component'

@Component({
  selector: 'app-tc-script',
  templateUrl: './tc-script.component.html',
  styleUrls: ['./tc-script.component.scss']
})
export class TcScriptComponent implements OnInit {

  @Input('testcase') testcase: ITestCase;
  private inv_countriesList: Array<IInvariant>;

  private tabs: string[] = ['Script', 'Properties'];
  private selectedTab: string;

  private stepListBlockId: string;

  private propertiesList: Array<Property>;
  private activePropertyId: number;
  private activeProperty: Array<Property>;
  private propertyNameIsInvalid: boolean;
  private oldVersion = false; // TODO : to remove and keep a version

  // @ViewChild(ChildComponent) child;

  constructor(
    private testService: TestService,
    private invariantsService: InvariantsService
  ) { }

  ngOnInit() {
    this.activePropertyId = null;
    this.propertiesList = new Array<Property>();
    this.setActiveProperty();
    this.testService.observableTestCaseProperties.subscribe(r => {
      if (r) {
        if (r.length !== 0) {
          this.propertiesList = r;
          if (this.activePropertyId == null) {
            this.setActiveProperty(this.propertiesList[0].property_id);
          } else {
            // refresh the content of the active property
            this.setActiveProperty(this.activePropertyId);
          }
        }
      }
    });
    this.selectedTab = this.tabs[0];
    this.propertyNameIsInvalid = false;
  }

  // pass the name of the property to insert a property
  addProperty() {
    const newProp = new Property(this.testService.getNewPropertyID());
    // add the countries from TC header to the new property
    this.testService.convertCountriesList(this.testcase.info).forEach((country) => {
      newProp.country.push(country);
    });
    this.testService.addProperty(this.propertiesList, newProp);
    this.setActiveProperty(newProp.property_id);
  }

  addPropertyValue(propId: number) {
    const newProp = new Property(propId);
    newProp.property = this.testService.findPropertyNameById(this.propertiesList, propId);
    this.testService.addProperty(this.propertiesList, newProp);
    this.setActiveProperty(propId);
  }

  removePropertiesById(id: number) {
    this.testService.removePropertiesById(this.propertiesList, id);
    if (this.propertiesList.length === 0) {
      this.setActiveProperty(undefined);
    }
    if (this.activePropertyId === id) {
      this.setActiveProperty(this.propertiesList[0].property_id);
    }
  }

  removePropertyValue(prop: Property) {
    console.log(this.testService.filterPropertiesByid(this.propertiesList, prop.property_id).length);
    if (this.testService.filterPropertiesByid(this.propertiesList, prop.property_id).length === 1) {
      if (this.propertiesList.length >= 1) {
        this.setActiveProperty(undefined);
      }
    }
    this.testService.removePropertyValue(this.propertiesList, prop);
    this.setActiveProperty(prop.property_id);
  }

  saveTestCase() {
    // send the testcase to the data service
    this.testService.saveTestCase(this.testcase);
  }

  setActiveProperty(propId?: number) {
    if (!propId) {
      this.activeProperty = new Array<Property>();
      this.activePropertyId = null;
    } else {
      // console.log("setActiveProperty for id: " + propId);
      this.activePropertyId = propId;
      this.activeProperty = this.testService.filterPropertiesByid(this.propertiesList, propId);
    }
  }

  debug() {
    console.log(this.activeProperty);
  }

}
