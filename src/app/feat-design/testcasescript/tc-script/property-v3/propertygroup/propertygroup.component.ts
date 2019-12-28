import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'src/app/shared/model/property.model';

export class PropertyByName {
  property: string; // name of the property values
  countriesList: Array<string>; // list of activated countries
  values: Array<Property>; // list of all properties values
}

@Component({
  selector: 'app-propertygroup',
  templateUrl: './propertygroup.component.html',
  styleUrls: ['./propertygroup.component.scss']
})
export class PropertygroupComponent implements OnInit {

  // boolean to handle the display of the property values list
  public propertyValuesDisplayed: boolean;

  @Input('propertygroup') propertygroup: PropertyByName;

  constructor() { }

  ngOnInit() {
    // hide the property values by default
    this.propertyValuesDisplayed = false;
  }

}
