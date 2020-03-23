/**
 * @class Bug
 * @classdesc bug entry for a test case
 */
export class Bug {

    /** @description is the bug active */
    act: boolean;

    /** @description description of the bug entry */
    desc: string;

    /** @description id of the bug (used to generate the bug link) */
    id: string;

    /** @description audit field: creation date of the bug entry */
    dateCreated: string;

    /** @description audit field: latest closure of the bug entry */
    dateClosed: string;

    constructor() {
        this.id = '';
        this.act = true;
        this.desc = '';
        this.dateCreated = '';
        this.dateClosed = '';
    }

}
