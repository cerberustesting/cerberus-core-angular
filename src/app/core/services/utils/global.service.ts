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

  /**
   * reduce an object to a limited number of properties and returns a string interpretation of the object in query string fashion
   * @param object source object
   * @param fieldsToKeep list of fields to keep
   * @returns query string ('key1=value1&key2=value2...')
   */
  toQueryString(object: any, fieldsToKeep: string[]): string {
    const newObject = {};
    for (const key in object) {
      if (fieldsToKeep.includes(key)) {
        newObject[key] = object[key];
      }
    }
    return Object.keys(newObject).map(key => key + '=' + newObject[key]).join('&');
  }

  /**
   * transform object into formdata
   * @param object source object
   * @returns formdata object
   */
  toFormData(object: any): FormData {
    const formData = new FormData();
    for (const key in object) {
      formData.append(key, encodeURIComponent(object[key]));
    }
    return formData;
  }
}
