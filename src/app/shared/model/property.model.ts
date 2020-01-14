export class PropertyValue {
    property: string;
    description: string;
    type: string;
    value1: string;
    value2: string;
    database: string;
    country: Array<string>;
    nature: string;
    length: string;
    rowLimit: number;
    cacheExpire: number;
    retryPeriod: number;
    retryNb: number;
    rank: number;
    toDelete: boolean;

    constructor(property: string) {
        this.property = property;
        this.description = '';
        this.type = 'text';
        this.value1 = '';
        this.value2 = '';
        this.database = '';
        this.country = new Array<string>();
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

// a property group is a group of property values by name
export class ProperyGroup {
    property: string; // name of the property values
    values: Array<PropertyValue>; // list of all properties values
    toDelete: boolean;

    constructor(property: string) {
        this.property = property;
        this.values = [];
        this.toDelete = false;
    }
}
