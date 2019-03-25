export class Property {
    property: string;
    description: string;
    type: string;
    value1: string;
    value2: string;
    database: string;
    country: Array<string>;
    nature: string;
    length: string;
    rowLimit: number
    cacheExpire: number;
    retryPeriod: number;
    retryNb: number;
    rank: number;

    constructor() {
        this.property = "";
        this.description = "";
        this.type = "text";
        this.value1 = "";
        this.value2 = "";
        this.database = "";
        this.country = new Array<string>();
        this.nature = "";
        this.length = "0";
        this.rowLimit = 0;
        this.cacheExpire = 0;
        this.retryPeriod = 0;
        this.retryNb = 0;
        this.rank = 1;
    }
}

export interface IProperty extends Property { }

export interface IPropertyByName {
    [property: string]: Array<IProperty>
}