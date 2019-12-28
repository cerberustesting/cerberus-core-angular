import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'src/app/shared/model/property.model';

@Component({
  selector: 'app-propertyvalue',
  templateUrl: './propertyvalue.component.html',
  styleUrls: ['./propertyvalue.component.scss']
})
export class PropertyvalueComponent implements OnInit {

  @Input('propertyvalue') propertyvalue: Property;

  // boolean to handle property value detail display
  public propertyValueDetailsDisplay: boolean;

  constructor() { }

  ngOnInit() {
    // hide details by default
    this.propertyValueDetailsDisplay = false;
  }

}
