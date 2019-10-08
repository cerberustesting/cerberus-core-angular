import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trueindex'
})
export class TrueindexPipe implements PipeTransform {

  // method that increment a given number
  // useful in Array indexes (start at 0 instead of 1)
  // if no arg, return  number + 1
  transform(value: number, args?: number): number {
    if (args) { return value + parseInt(args[0], 10); }
    return value + 1;
  }

}
