import { Component, OnInit, Input, OnChanges, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
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
  private unassignedCountriesList: Array<String>;
  private inv_countriesList: Array<IInvariant>;
  private inv_propertyTypeList: Array<IInvariant>;

  private testcaseheader: ITestCaseHeader;
  private showPropertyOptions: boolean;

  // unassigned country list
  private DragAndDropList: Array<string>;
  private DragAndDropId: string;

  constructor(
    private InvariantsService: InvariantsService,
    private TestService: TestService,
    private DragAndDropService: DraganddropService,
    private cdRef: ChangeDetectorRef
  ) { }

  // TO DO : update all property name on change
  ngOnChanges() {
  }

  ngAfterViewChecked() {
    // start the change detection only when the sub components (prop value) are loaded
    this.DragAndDropService.observablePropCountriesList.subscribe(r => { if (r) { this.DragAndDropList = r; } });
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.unassignedCountriesList = new Array<string>();
    this.TestService.observableTestCase.subscribe(r => { this.testcaseheader = r.info; });
    //this.DragAndDropService.observablePropCountriesList.subscribe(r => { if (r) { this.DragAndDropList = r; } });
    this.InvariantsService.observablePropertyTypeList.subscribe(r => { this.inv_propertyTypeList = r; });
    this.InvariantsService.observableCountriesList.subscribe(r => { this.inv_countriesList = r; if (r) { this.defineUnassginedCountries(); } });
    this.DragAndDropId = "propcountries-droplist-unassigned";
    this.showPropertyOptions = false;
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

  debug() {
    console.log(this.propertiesByName);
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

}
