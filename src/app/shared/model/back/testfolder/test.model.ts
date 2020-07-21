/**
 * @class TestFolder
 * @classdesc test folder (previously 'test')
 */
export class TestFolder {

        /** @description name of the test folder */
        test: string;

        /** @description description of the test folder */
        description: string;

        /** @description active toggle of the test folder */
        active: string;

        /** @description audit field : creation date of the test */
        dateCreated: string;

        /** @description audit field : user who created the test */
        usrCreated: string;

        /** @description audit field : last modification date of the test */
        dateModif: string;

        /** @description audit field : the last user who edited the test */
        usrModif: string;

        constructor() {
                this.test = '';
                this.active = 'Y';
                this.description = '';
                this.dateCreated = null;
                this.usrCreated = null;
                this.dateModif = null;
                this.usrModif = null;
        }
}
