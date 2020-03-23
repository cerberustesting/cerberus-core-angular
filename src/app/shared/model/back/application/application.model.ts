export class Application {

    /** @description application name */
    application: string;

    /** @description description of the application */
    description: string;

    /** @description application type (private invariants) */
    type: string;

    /** @description application system (public invariants) */
    system: string;

    /** @description application sub-system (public invariants) */
    subsystem: string;

    /** @description simultaneous executions allowed for this application */
    poolSize: number;

    /** @description bug tracker url */
    bugTrackerUrl: string;

    /** @description new bug tracker url */
    bugTrackerNewUrl: string;

    /** @description list of application objects */
    // waiting for development
    objects: any;

    /** @description list of application objects */
    // waiting for development
    environments: any;

    /** @description repository url */
    svnurl: string;

    /** @description deprecated? */
    deploytype: string;

    /** @description ? */
    mavengroupid: string;

    /** @description audit field: application creation date */
    DateCreated: string;

    /** @description audit field: user who created the application */
    UsrCreated: string;

    /** @description audit field: user who last modified the application */
    UsrModif: string;

    /** @description audit field: latest modification date of the application */
    DateModif: string;

    constructor(applicationname: string) {
        this.application = applicationname;
        this.description = '';
        this.type = 'GUI';
        this.system = '';
        this.subsystem = '';
        this.poolSize = 0;
        this.bugTrackerUrl = '';
        this.bugTrackerNewUrl = '';
        this.svnurl = '';
        this.deploytype = 'NONE';
        this.mavengroupid = '';
    }

}
