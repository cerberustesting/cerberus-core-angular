export interface ITestCaseHeader {
    conditionOper: string;
    howTo: string;
    project?: string;
    description: string;
    fromRev: string;
    implementer: string;
    hasPermissionsCreate: boolean;
    activePROD: string;
    fromBuild: string;
    screenSize: string;
    dateCreated: string;
    refOrigine: string;
    bugID: string;
    function: string;
    lastExecutionStatus: string;
    activeQA: string;
    group: string;
    conditionVal2: string;
    test: string;
    ticket: string;
    conditionVal1: string;
    usrModif: string;
    toBuild: string;
    userAgent: string;
    origin?: string;
    priority: number;
    countryList: any;
    testCaseVersion: number;
    usrCreated: string;
    tcActive: string;
    targetRev: string;
    hasPermissionsUpdate: boolean;
    activeUAT: string;
    system: string;
    application: string;
    behaviorOrValueExpected: string;
    comment: string;
    targetBuild: string;
    dateModif: string;
    hasPermissionsDelete: boolean;
    toRev: string;
    testCase: string;
    status: string;
    [key: string]: any
}

export interface ITestCase {
    info: ITestCaseHeader;
    inheritedProp: Array<string>;
    hasPermissionsUpdate: boolean;
    messageType: string;
    hasPermissionsStepLibrary: boolean;
    stepList: Array<IStep>;
    message: string;
    hasPermissionsDelete: boolean;
    sEcho: number;
}

export class Step {
    objType: string;
    test: string;
    testCase: string;
    conditionOper: string;
    conditionVal1: string;
    conditionVal2: string;
    forceExe: string;
    loop: string;
    useStep: string;
    isStepInUseByOtherTestCase: boolean;
    useStepTest: string;
    useStepTestCase: string;
    inLibrary: string;
    initialStep: number;
    useStepStep: number;
    description: string;
    actionList: Array<IAction>;
    sort: number;
    step: number;
    toDelete: boolean;
    usrModif: string;
    usrCreated: string;
    dateCreated: string;
    dateModif: string;

    constructor(test: string, testCase: string, sort: number) {
        this.objType = "step";
        this.test = test;
        this.testCase = testCase;
        this.conditionOper = "always";
        this.conditionVal1 = "";
        this.conditionVal2 = "";
        this.forceExe = "N";
        this.loop = "onceIfConditionTrue";
        this.useStep = "N";
        this.isStepInUseByOtherTestCase = false;
        this.useStepTest = "";
        this.useStepTestCase = "";
        this.inLibrary = "N";
        this.initialStep = 0;
        this.useStepStep = 0;
        this.toDelete = false;
        this.description = "";
        this.actionList = new Array<IAction>();
        this.sort = sort;
        this.step = null;
        this.dateCreated = "";
        this.dateModif = "";
        this.usrModif = "";
        this.usrCreated = "";
    }
}

export interface IStep extends Step { }

export class Action {
    objType: string;
    test: string;
    testCase: string;
    conditionOper: string;
    conditionVal1: string;
    conditionVal2: string;
    action: string;
    value1: string;
    value2: string;
    description: string;
    sort: number;
    sequence: number;
    step: number;
    forceExeStatus: string;
    screenshotFilename: string;
    controlList: Array<IControl>;

    constructor(test: string, testcase: string, sort: number) {
        this.objType = "action";
        this.forceExeStatus = "";
        this.test = test;
        this.testCase = testcase;
        this.conditionOper = "always";
        this.conditionVal1 = "";
        this.conditionVal2 = "";
        this.action = "doNothing";
        this.value1 = "";
        this.value2 = "";
        this.description = "";
        this.sort = sort;
        this.sequence = null;
        this.step = null;
        this.forceExeStatus = ""
        this.screenshotFilename = "";
        this.controlList = new Array<IControl>();
    }
}

export interface IAction extends Action { }

export class Control {
    objType: string;
    test: string;
    testCase: string;
    conditionOper: string;
    conditionVal1: string;
    conditionVal2: string;
    description: string;
    control: string;
    value2: string;
    value1: string;
    fatal: string;
    screenshotFilename: string;
    sort: number;
    sequence: number;
    controlSequence: number;
    step: number;
    toDelete: boolean;

    constructor(test: string, testCase: string, sort: number) {
        this.objType = "control";
        this.test = test;
        this.testCase = testCase;
        this.conditionOper = "always";
        this.conditionVal1 = "";
        this.conditionVal2 = "";
        this.description = "";
        this.control = "Unknown";
        this.value1 = "";
        this.value2 = "";
        this.fatal = "N";
        this.screenshotFilename = "";
        this.sort = sort;
        this.sequence = null;
        this.controlSequence = null;
        this.step = null;
        this.toDelete = false;
    }
}

export interface IControl extends Control { }