import { Pipe, PipeTransform } from '@angular/core';
import { ILabel } from '../model/label.model';

@Pipe({
  name: 'labelfiltering',
  pure: false
})
export class LabelfilteringPipe implements PipeTransform {

  transform(items: ILabel[], labelid: string): any {
    if (!items || !labelid) {
        return items;
    }
    return items.filter(items => items.type === labelid);
}

}
