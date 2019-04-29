import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ITestCase, IStep, Step } from 'src/app/model/testcase.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TestService } from 'src/app/services/crud/test.service';
import { IProperty, Property } from 'src/app/model/property.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
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

  private propertiesList: Array<IProperty>;
  private activePropertyId: number;
  private activeProperty: Array<IProperty>;
  private propertyNameIsInvalid: boolean;

  //@ViewChild(ChildComponent) child;

  constructor(
    private TestService: TestService,
    private InvariantsService: InvariantsService
  ) {
    this.stepListBlockId = "stepList";
  }

  ngOnInit() {
    this.activePropertyId = null;
    this.TestService.getProperties(this.testcase.info.test, this.testcase.info.testCase);
    this.TestService.observableTestCaseProperties.subscribe(r => {
      if (r) {
        this.propertiesList = r;
        if (this.activePropertyId == null) {
          this.setActiveProperty(this.propertiesList[0].property_id);
        } else {
          // refresh the content of the active property
          this.setActiveProperty(this.activePropertyId);
        }
      }
    });
    this.selectedTab = this.tabs[0];
    this.propertyNameIsInvalid = false;
  }

  addAStep() {
    var newStep = new Step(this.testcase.info.testCase, this.testcase.info.test, this.testcase.stepList.length + 1);
    this.testcase.stepList.push(newStep);
    // useless to refresh the step sort here since we can only add at the end.
    // if later modification (e.g. adding a step after any step), please consider
    // - using splice() instead of push
    // - call TestService.refreshStepSort(this.testcase.stepList)
  }

  // pass the name of the property to insert a property
  addProperty() {
    var newProp = new Property(this.TestService.getNewPropertyID());
    // add the countries from TC header to the new property
    this.TestService.convertCountriesList(this.testcase.info).forEach((country) => {
      newProp.country.push(country);
    })
    this.TestService.addProperty(this.propertiesList, newProp);
    this.setActiveProperty(newProp.property_id);
  }

  addPropertyValue(propId: number) {
    let newProp = new Property(propId);
    newProp.property = this.TestService.findPropertyNameById(this.propertiesList, propId);
    this.TestService.addProperty(this.propertiesList, newProp);
    this.setActiveProperty(propId);
  }

  removePropertiesById(id: number) {
    this.TestService.removePropertiesById(this.propertiesList, id);
    if (this.propertiesList.length == 0) {
      this.setActiveProperty(undefined);
    }
    if (this.activePropertyId == id) {
      this.setActiveProperty(this.propertiesList[0].property_id);
    }
  }

  removePropertyValue(prop: IProperty) {
    console.log(this.TestService.filterPropertiesByid(this.propertiesList, prop.property_id).length);
    if (this.TestService.filterPropertiesByid(this.propertiesList, prop.property_id).length == 1) {
      if (this.propertiesList.length >= 1) {
        this.setActiveProperty(undefined);
      }
    }
    this.TestService.removePropertyValue(this.propertiesList, prop);
    this.setActiveProperty(prop.property_id);
  }

  dropStep(event: CdkDragDrop<IStep[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.TestService.refreshStepSort(this.testcase.stepList);
  }

  saveTestCase() {
    // send the testcase to the data service
    this.TestService.saveTestCase(this.testcase);
  }

  setActiveProperty(propId?: number) {
    if (!propId) {
      this.activeProperty = new Array<IProperty>();
      this.activePropertyId = null;
    }
    //console.log("setActiveProperty for id: " + propId);
    this.activePropertyId = propId;
    this.activeProperty = this.TestService.filterPropertiesByid(this.propertiesList, propId);
  }

  debug() {
    console.log(this.activeProperty);
  }

}
