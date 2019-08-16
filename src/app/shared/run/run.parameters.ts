export class RunParameters {
    campaign: string;
    test: string;
    testcase: string;
    country: string;
    environment: any[];
    robot: [];
    ss_ip: string;
    ss_p: string;
    browser: string;
    version: string;
    platform: string;
    screensize: string;
    manualurl: number;
    myhost: string;
    mycontextroot: string;
    myloginrelativeurl: string;
    myenvdata: string;
    tag: [];
    screenshot: number;
    verbose: number;
    timeout: null;
    pagesource: number;
    seleniumlog: number;
    manualexecution: string;
    retries: number;
    priority: number;
    outputformat: string;
    executor: string;

    constructor() {
        this.campaign = null;
        this.test = null;
        this.testcase = null;
        this.country = 'FR';
        this.environment = null;
        this.robot = [];
        this.ss_ip = null;
        this.ss_p = null;
        this.browser = null;
        this.version = null;
        this.platform = null;
        this.screensize = null;
        this.manualurl = 0;
        this.myhost = null;
   this.mycontextroot = null;
   this.myloginrelativeurl = null;
   this.myenvdata = null;
   this.tag = [];
   this.screenshot = 0;
   this.verbose = 1;
   this.timeout = null;
   this.pagesource = 1;
   this.seleniumlog = 1;
   this.manualexecution = 'N';
   this.retries = 0;
   this.priority = 1000;
   this.outputformat = 'json';
   this.executor = null;
    }
}
export interface IRunParameters extends RunParameters { }
