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

  constructor(
    private InvariantsService: InvariantsService,
    private DragAndDropService: DraganddropService
  ) { }

  ngOnInit() {
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
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnDestroy() {
    this.DragAndDropService.deleteIDFromPropCountriesList(this.DragAndDropId);
  }

}
