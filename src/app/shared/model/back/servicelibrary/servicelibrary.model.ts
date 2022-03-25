/**
 * @class Service
 * @classdesc service library item
 */
export class Service {

        /** @description service of the service */
        service: string;

        /** @description application of the service */
        application: string;

        /** @description type of the service */
        type: string;

        /** @description service path of the service */
        servicePath: string;

        /** @description description of the service */
        description: string;

        /** @description audit field : creation date of the service */
        dateCreated: string;

        /** @description audit field : user who created the service */
        usrCreated: string;

        /** @description audit field : last modification date of the service */
        dateModif: string;

        /** @description audit field : the last user who edited the service */
        usrModif: string;
        
        constructor() {
                this.service = '';
        }
}
