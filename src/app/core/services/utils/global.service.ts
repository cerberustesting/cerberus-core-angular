import { Injectable } from '@angular/core';
import { TestFolder } from 'src/app/shared/model/back/testfolder/test.model';

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

  /** transform boolean to 'Y' or 'N' string  */
  toCerberusString(raw: boolean): string {
    if (raw === true) {
      return 'Y';
    } else {
      return 'N';
    }
  }

  /** transform  'Y' or 'N' string to boolean  */
  toCerberusBoolean(raw: string): boolean {
    if (raw === 'Y') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * format a raw test folder from the API
   * DIRTY : waiting on https://github.com/cerberustesting/cerberus-source/issues/2104
   * @param rawTestFolder raw test folder
   */
  formatTestFolder(rawTestFolder: any): TestFolder {
    rawTestFolder.active = this.toCerberusBoolean(rawTestFolder.active);
    return rawTestFolder;
  }

  /**
   * format a list of raw test folder from the API
   * DIRTY : waiting on https://github.com/cerberustesting/cerberus-source/issues/2104
   * @param rawTestFolder raw test folders list
   */
  formatTestFolderList(rawTestFolders: any[]): TestFolder[] {
    const res = new Array<TestFolder>();
    rawTestFolders.forEach(rawTestFolder => {
      res.push(this.formatTestFolder(rawTestFolder));
    });
    return res;
  }
}
