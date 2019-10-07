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
    rowLimit: number;
    cacheExpire: number;
    retryPeriod: number;
    retryNb: number;
    rank: number;
    property_id?: number;

    constructor(id: number) {
        this.property = '';
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
        this.property_id = id;
    }
}

export interface IProperty extends Property { }