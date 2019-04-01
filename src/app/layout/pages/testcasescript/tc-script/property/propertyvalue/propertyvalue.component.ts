import { Component, OnInit, Input } from '@angular/core';
import { IProperty } from 'src/app/model/property.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IInvariant } from 'src/app/model/invariants.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { DraganddropService } from '../../draganddrop.service';

@Component({
  selector: 'app-propertyvalue',
  templateUrl: './propertyvalue.component.html',
  styleUrls: ['./propertyvalue.component.scss']
})
export class PropertyvalueComponent implements OnInit {

  @Input('propertyvalue') prop: IProperty;
  @Input('index') index: number;
  private inv_propertyTypeList: Array<IInvariant>;
  private DragAndDropId: string;
  private DragAndDropList: Array<string>;
  private isCountriesListEmpty: boolean;

  constructor(
    private InvariantsService: InvariantsService,
    private DragAndDropService: DraganddropService
  ) { }

  ngOnInit() {
    this.isCountriesListEmpty = false;
    this.InvariantsService.observablePropertyTypeList.subscribe(r => { this.inv_propertyTypeList = r; });
    this.DragAndDropId = "propcountries-droplist-" + this.index;
    this.DragAndDropService.addIDToPropCountriesList(this.DragAndDropId);
    this.DragAndDropService.observablePropCountriesList.subscribe(r => { this.DragAndDropList = r; });
  }

  generateID() {
    var id = 'country-droplist-' + this.DragAndDropService.getControlsListID();
    this.DragAndDropService.addIDToControlList(id);
    return id;
  }

  dropCountry(event: CdkDragDrop<string[]>) {
    // called when the item is dropped (click released)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dropOutPropCountry(event: CdkDragDrop<string[]>) {
    // when the item leaves the component (still dragging)
    if (event.container.data.length <= 1) {
      // if this is the last item 
      // or we leave a element without country
      this.isCountriesListEmpty = true;
    }
  }

  dropInPropCountry(event: CdkDragDrop<string[]>) {
    // when the item enter the component (still dragging)
    if (this.isCountriesListEmpty == true) {
      // if we are entering a empty component
      this.isCountriesListEmpty = false;
    }
  }

  ngOnDestroy() {
    this.DragAndDropService.deleteIDFromPropCountriesList(this.DragAndDropId);
  }

}
