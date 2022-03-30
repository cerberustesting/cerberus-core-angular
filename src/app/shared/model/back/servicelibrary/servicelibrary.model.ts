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
        
        /** @description method of the service */
        method: string;

        /** @description service path of the service */
        servicePath: string;
        
        /** @description operation of the service */// TODO where is this filled?
        operation: string;

        /** @description kafka topic of the service */
        kafkaTopic: string;

        /** @description kafka filter path of the service */
        kafkaFilterPath: string;

        /** @description kafka filter value of the service */
        kafkaFilterValue: string;

        /** @description kafka key of the service */
        kafkaKey: string;

        /** @description follow redirect option of the service */
        isFollowRedir: boolean;

        /** @description group of the service */
        group: string;

        /** @description description of the service */
        description: string;

        /** @description attatchment URL of the service */
        attachementurl: string;

        /** @description request detail list of the service */
        contentList: JSON;

        /** @description header details list of the service */
        headerList: JSON;

        /** @description request of the service */
        srvRequest: string;

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
