/**
 * @class DataLibrary
 * @classdesc data library object
 */
export class DataLibrary {

    /** @description name of the data library (foreign key) */
    name: string;

    /** @description type (INTERNAL, SERVICE, CSV or SQL ) */
    type: string;

    /** @description system for which the datalib is defined */
    system: string;

    /** @description environnement for which the data library is defined */
    environment: string;

    /** @description country for which the datalib is defined */
    country: string;

    /** @description short description */
    description: string;

    /** @description overriden database (relevant with SERVICE type) */
    databaseUrl: string;

    /** @description name of the cerberus service used (relevant with SERVICE type)*/
    service: string;

    /** @description path to override the path from the service (relevant with SERVICE type) */
    servicePath: string;

    /** @description SOAP operation name (relevant with SERVICE type) */
    method: string;

    /** @description overriden envelope SOAP request (relevant with SERVICE type) */
    envelope: string;

    /** @description name of the database to query (relevant with SQL type) */
    database: string;

    /** @description SQL query (relevant with SQL type) */
    script: string;

    /** @description database to fetch the CSV path (relevant with CSV type) */
    databaseCsv: string;

    /** @description url to the CSV file (relevant with CSV type) */
    csvUrl: string;

    /** @description string used for CSV parsing (relevant with CSV type) */
    separator: string;

    /** @description define if the datalibray is only readable by its creator */
    privateData: boolean;

    /** @description ? */
    group: string;

    /** @description unique ID of the object */
    testDataLibID: string;

    /** @description username of the creator */
    creator: string;

    /** @description creation date */
    created: string;

    /** @description date of the last modification */
    lastModified: string;

    /** @description username of the last modifier */
    lastModifier: string;

}
