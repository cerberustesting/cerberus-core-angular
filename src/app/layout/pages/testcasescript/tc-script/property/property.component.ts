import { Component, OnInit, Input, OnChanges, AfterViewChecked, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { IProperty, Property } from 'src/app/model/property.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { IInvariant } from 'src/app/model/invariants.model';
import { TestService } from 'src/app/services/crud/test.service';
import { ITestCaseHeader } from 'src/app/model/testcase.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DraganddropService } from '../draganddrop.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input('propertiesByName') propertiesByName: Array<IProperty>;
  private propertyName: string;
  private propertyNameIsInvalid: boolean;

  // propertyValueAdded: sent when a new property value is added
  // in order to call addProperty() from parent component
  @Output() propertyValueAdded = new EventEmitter<string>();
  // propertyNameChanged: sent when the property name changed
  // in order to set the new propertyName as active
  @Output() propertyNameChanged = new EventEmitter<string>();

  // unassigned country list
  private propertiesList: Array<IProperty>;
  private unassignedCountriesList: Array<String>;

  // invariants
  private inv_countriesList: Array<IInvariant>;
  private inv_propertyTypeList: Array<IInvariant>;

  // drag & drop
  private DragAndDropList: Array<string>;
  private DragAndDropId: string;

  private testcaseheader: ITestCaseHeader;
  private showPropertyOptions: boolean;
  private showPropCountriesMainContent: boolean;

  constructor(
    private InvariantsService: InvariantsService,
    private TestService: TestService,
    private DragAndDropService: DraganddropService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    // start the change detection only when the sub components (prop value) are loaded
    this.DragAndDropService.observablePropCountriesList.subscribe(r => { if (r) { this.DragAndDropList = r; } });
    this.cdRef.detectChanges();
  }

  ngOnChanges() {
    this.propertyNameIsInvalid = false;
    this.propertyName = this.propertiesByName[0].property;
  }

  ngOnInit() {
    this.propertyName = this.propertiesByName[0].property;
    this.showPropCountriesMainContent = true;
    this.unassignedCountriesList = new Array<string>();
    this.TestService.observableTestCase.subscribe(r => { this.testcaseheader = r.info; });
    this.DragAndDropService.observablePropCountriesList.subscribe(r => { if (r) { this.DragAndDropList = r; } });
    this.TestService.observableTestCaseProperties.subscribe(r => { this.propertiesList = r; });
    this.InvariantsService.observablePropertyTypeList.subscribe(r => { this.inv_propertyTypeList = r; });
    this.InvariantsService.observableCountriesList.subscribe(r => { this.inv_countriesList = r; if (r) { this.defineUnassginedCountries(); } });
    this.DragAndDropId = "propcountries-droplist-unassigned";
    this.DragAndDropService.addIDToPropCountriesList(this.DragAndDropId);
    this.showPropertyOptions = false;
    this.propertyNameIsInvalid = false;
  }

  dropCountry(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  defineUnassginedCountries() {
    this.unassignedCountriesList = new Array<string>();
    this.inv_countriesList.forEach((country) => {
      let assigned = false;
      this.propertiesByName.forEach((prop) => {
        if (prop.country.includes(country.value)) {
          assigned = true;
        }
      })
      if (!assigned) { this.unassignedCountriesList.push(country.value); }
    });
  }

  addAPropertyValue() {
    this.propertyValueAdded.emit(this.propertyName);
  }

  removeAPropertyValue(propValue: IProperty) {
    //var propValue = this.propertiesByName.find(p => p == propValue);
    //this.propertiesByName.splice(this.propertiesByName.indexOf(propValue), 1);
    this.TestService.removeProperty(propValue);
  }

  // one way data binding has been implemented 
  // since we must ensure the property name that we are trying to insert
  // isn't already an existing property
  setPropertyName(newName: string) {
    var oldName = this.propertyName;
    if (this.propertiesList.find(p => p.property == newName)) {
      // property name already exists
      this.propertyNameIsInvalid = true;
    } else {
      // feeded property name doesn't exist 
      this.TestService.renameProperty(oldName, newName);
      this.propertyName = newName;
      this.propertyNameIsInvalid = false;
      this.propertyNameChanged.emit(this.propertyName);
    }
  }

  debug() {
    console.log(this.propertiesByName);
  }

}
