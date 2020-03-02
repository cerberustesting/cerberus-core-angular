import { Pipe, PipeTransform } from '@angular/core';
import { Label } from '../model/back/label.model';

@Pipe({
  name: 'labelfiltering',
  pure: false
})
export class LabelfilteringPipe implements PipeTransform {

  transform(items: Label[], labelid: string): any {
    if (!items || !labelid) {
      return items;
    } else {
      return items.filter(item => item.type === labelid);
    }
  }

}
