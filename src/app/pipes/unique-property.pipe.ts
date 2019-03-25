import { Pipe, PipeTransform } from '@angular/core';
import { IProperty } from '../model/property.model';

@Pipe({
  name: 'uniqueProperty'
})
export class UniquePropertyPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    let uniqueArray = value.filter(function (el, index, array) {
      console.log("el : " + el.property);
      console.log("index : " + index);
      return array.indexOf(el.property) == index;
    });
    return uniqueArray;
  }

}
