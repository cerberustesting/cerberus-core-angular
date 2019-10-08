import { Pipe, PipeTransform } from '@angular/core';
import { Property } from '../model/property.model';

@Pipe({
  name: 'uniqueproplist',
  pure: false
})
export class UniqueproplistPipe implements PipeTransform {

  transform(propList: Array<Property>): Array<Property> {
    const uniquePropertiesList = new Array<Property>();
    propList.forEach((prop) => {
      if (!uniquePropertiesList.find(p => p.property_id === prop.property_id)) {
        uniquePropertiesList.push(prop);
      }
    });
    return uniquePropertiesList;
  }

}
