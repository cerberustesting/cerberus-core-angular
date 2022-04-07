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
        
        /** @description operation of the service */
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
        isFollowRedir: number;

        /** @description group of the service */
        group: string;

        /** @description description of the service */
        description: string;

        /** @description attatchment URL of the service */
        attachementURL: string;

        /** @description FTP file of the service */
        file: File;

        /** @description FTP file name of the service */
        fileName: string;

        /** @description request detail list of the service */
        contentList: Array<String>;

        /** @description header details list of the service */
        headerList: Array<String>;

        /** @description request of the service */
        serviceRequest: string;

        /** @description audit field : creation date of the service */
        DateCreated: string;

        /** @description audit field : user who created the service */
        UsrCreated: string;

        /** @description audit field : last modification date of the service */
        DateModif: string;

        /** @description audit field : the last user who edited the service */
        UsrModif: string;
        
        constructor() {
                this.service = '';
                this.application = '';
                this.servicePath = '';
                this.description = '';
                this.operation = '';
                this.kafkaTopic = '';
                this.kafkaFilterPath = '';
                this.kafkaFilterValue = '';
                this.kafkaKey = '';
                this.group = '';
                this.attachementURL = '';
                this.contentList = [];
                this.headerList = [];
                this.serviceRequest = '';
                this.type = "REST";
                this.method = "GET";
                this.isFollowRedir = 1;
                this.fileName = "";
        }

}