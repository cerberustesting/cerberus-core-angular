import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  /**
   * return true if a string is defined, not null and not empty, false instead
   * @param stringToCheck string to check
   */
  isNullOrEmpty(stringToCheck: string): boolean {
    // is the string defined?
    if (stringToCheck) {
      // is the string null?
      if (stringToCheck !== null) {
        // is the string empty?
        if (stringToCheck !== '') {
          return false;
        }
      }
    }
    return true;
  }
}
