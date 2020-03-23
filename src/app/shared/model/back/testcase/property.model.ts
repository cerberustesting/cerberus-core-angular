import { Invariant } from '../invariant/invariant.model';

/**
 * @class Property Value
 * @classdesc test case property object with all its information
 */
export class PropertyValue {

    /** property name */
    property: string;

    /** property short description */
    description: string;

    /** property type */
    type: string;

    /** property value 1 */
    value1: string;

    /** property value 2 */
    value2: string;

    /** database public invariant */
    database: string;

    /** list of countries selected */
    countries: Array<Invariant>;

    /** property nature */
    nature: string;

    /** property maximum length */
    length: string;

    /** property row limit */
    rowLimit: number;

    /** property cache expire duration */
    cacheExpire: number;

    /** number of iteration to retry (only for database action) */
    retryNb: number;

    /** duration of an iteration to retry (only for database action) */
    retryPeriod: number;

    /** property rank  */
    rank: number;

    /** will the property value be deleted? */
    toDelete: boolean;

    /** test folder in which is property value is inherited from (only for inherited properties) */
    fromTest?: string;

    /** test case id in which is property value is inherited from (only for inherited properties) */
    fromTestCase?: string;

    constructor(property: string) {
        this.property = property;
        this.description = '';
        this.type = 'text';
        this.value1 = '';
        this.value2 = '';
        this.database = '';
        this.countries = new Array<Invariant>();
        this.nature = '';
        this.length = '0';
        this.rowLimit = 0;
        this.cacheExpire = 0;
        this.retryPeriod = 0;
        this.retryNb = 0;
        this.rank = 1;
        this.toDelete = false;
    }
}

/**
 * @class Test Case Properties V2
 * @classdesc temporary fields of properties grouped by name
*/
export class TestCasePropertiesV2 {

    /** @description inherited properties of the test case */
    inheritedProperties: Array<PropertyGroup>;

    /** @description properties specified for the test case */
    testCaseProperties: Array<PropertyGroup>;

    constructor() {
        this.inheritedProperties = [];
        this.testCaseProperties = [];
    }

}

/**
 * @class Property Group
 * @classdesc a property group is a group of property values by name
*/
export class PropertyGroup {
    /** name of the property values */
    property: string;

    /** list of all properties values */
    values: Array<PropertyValue>;

    /** will the property value be deleted? */
    toDelete: boolean;

    constructor(property: string) {
        this.property = property;
        this.values = [];
        this.toDelete = false;
    }
}
