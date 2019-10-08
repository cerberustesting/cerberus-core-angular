import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ComponentRef } from '@angular/core';
import { Property } from 'src/app/shared/model/property.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { DraganddropService } from '../../draganddrop.service';
import { CrossreferenceService, ICrossReference } from 'src/app/core/services/utils/crossreference.service';

export class PropertyTypeFieldsCrossReference {
  type: string;
  fields: Array<string>;
}

@Component({
  selector: 'app-propertyvalue',
  templateUrl: './propertyvalue.component.html',
  styleUrls: ['./propertyvalue.component.scss']
})
export class PropertyvalueComponent implements OnInit, OnDestroy {

  @Input('propertyvalue') prop: Property;
  @Input('index') index: number;
  @Input('showMainContent') showMainContent: boolean;

  // propertyValueDeleted : sent when the component is destroyed
  // in order to refresh the unassigned countries list
  @Output() propertyValueDeleted = new EventEmitter<boolean>();

  DragAndDropId: string;
  DragAndDropList: Array<string>;
  showEmptyCountryList: boolean;
  private showAdvanced: boolean;
  // public inavariants
  private inv_propertyDatabaseList: Array<IInvariant>;
  // private inavariants
  private inv_propertyTypeList: Array<IInvariant>;
  private inv_propertyNatureList: Array<IInvariant>;

  constructor(
    private invariantsService: InvariantsService,
    private DragAndDropService: DraganddropService,
    private CrossReferenceService: CrossreferenceService
  ) { }

  ngOnInit() {
    this.showEmptyCountryList = false;
    this.showAdvanced = false;
    this.invariantsService.observablePropertyTypeList.subscribe(r => { this.inv_propertyTypeList = r; });
    this.invariantsService.observablePropertyNatureList.subscribe(r => { this.inv_propertyNatureList = r; });
    this.invariantsService.observablePropertyDatabaseList.subscribe(r => { this.inv_propertyDatabaseList = r; });
    this.DragAndDropId = 'propcountries-droplist-' + this.index;
    this.DragAndDropService.addIDToPropCountriesList(this.DragAndDropId);
    this.DragAndDropService.observablePropCountriesList.subscribe(r => { this.DragAndDropList = r; });
  }

  generateID() {
    const id = 'country-droplist-' + this.DragAndDropService.getControlsListID();
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
    // if this is the last item
    if (event.container.data.length === 1) {
      this.showEmptyCountryList = true;
    } else if (event.container.data.length === 0) {
      // or we leave a element without country
      this.showEmptyCountryList = true;
    }
  }

  dropInPropCountry(event: CdkDragDrop<string[]>) {
    // when the item enter the component (still dragging)
    // if we are entering a empty component
    if (event.container.data.length === 0) {
      this.showEmptyCountryList = false;
    }
  }

  hasPropertyTypeCrossReference(ptype: string): boolean {
    return this.CrossReferenceService.hasCrossReference(ptype, this.CrossReferenceService.crossReference_PropertyTypeValue);
  }

  findPropertyTypeCrossReference(ptype: string): ICrossReference {
    return this.CrossReferenceService.findCrossReference(ptype, this.CrossReferenceService.crossReference_PropertyTypeValue);
  }

  getValue1Width(type: string): string {
    switch (type) {
      case 'getFromSql': { return '9'; }
      default: { return '12'; }
    }
  }

  ngOnDestroy() {
    // remove the component ID from the drag & drop list
    // not mandatory but cleaner
    this.DragAndDropService.deleteIDFromPropCountriesList(this.DragAndDropId);
    // clean the model
    this.propertyValueDeleted.emit(true);
  }

}
