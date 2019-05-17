import { Pipe, PipeTransform } from '@angular/core';
import { IProperty } from '../model/property.model';

@Pipe({
  name: 'uniqueproplist',
  pure: false
})
export class UniqueproplistPipe implements PipeTransform {

  transform(propList: Array<IProperty>): Array<IProperty> {
    let uniquePropertiesList = new Array<IProperty>();
    propList.forEach((prop) => {
      if (!uniquePropertiesList.find(p => p.property_id == prop.property_id)) {
        uniquePropertiesList.push(prop);
      }
    });
    return uniquePropertiesList;
  }

}
