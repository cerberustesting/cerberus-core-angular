import { PropertyValue } from './property.model';

export class TestCaseHeader {
    test: string;
    testCase: string;
    description: string;
    application: string;
    status: string;
    group: string;
    priority: number;
    behaviorOrValueExpected: string;
    tcActive: string;
    activeQA: string;
    activeUAT: string;
    activePROD: string;
    countryList: Array<any>;
    fromBuild: string;
    toBuild: string;
    fromRev: string;
    toRev: string;
    targetBuild: string;
    targetRev: string;
    conditionOper: string;
    conditionVal1: string;
    conditionVal2: string;
    conditionVal3: string;
    userAgent: string;
    screenSize: string;
    labelList: Array<any>;
    bugID: any;
    comment: string;
    dependencyList: Array<ITestCaseDependency>;
    implementer: string;
    executor: string;
    testCaseVersion: number;
    usrCreated: string;
    dateCreated: string;
    usrModif: string;
    dateModif: string;
    system: string;
    [key: string]: any;

    constructor(
        test: string,
        testcase: string,
        application: string,
        group: string,
        priority: number,
        status: string,
        countryList: Array<any>
    ) {
        this.test = test;
        this.testCase = testcase;
        this.description = '';
        this.application = application;
        this.group = group;
        this.priority = priority;
        this.status = status;
        this.behaviorOrValueExpected = '';
        this.tcActive = 'Y';
        this.activeQA = 'Y';
        this.activeUAT = 'Y';
        this.activePROD = 'N';
        this.countryList = countryList;
        this.fromBuild = '';
        this.fromRev = '';
        this.toBuild = '';
        this.toRev = '';
        this.targetBuild = '';
        this.targetRev = '';
        this.conditionOper = '';
        this.conditionVal1 = '';
        this.conditionVal2 = '';
        this.conditionVal3 = '';
        this.userAgent = '';
        this.screenSize = '';
        this.labelList = [];
        this.bugID = [];
        this.comment = '';
        this.dependencyList = [];
        this.implementer = '';
        this.executor = '';
        this.testCaseVersion = 0;
        this.dateCreated = '';
        this.usrCreated = '';
        this.dateModif = '';
        this.usrModif = '';
    }
}

export interface ITestCaseDependency {
    active: boolean;
    depDescription: string;
    depEvent: string;
    depTest: string;
    depTestCase: string;
    description: string;
    id: number;
    test: string;
    testCase: string;
    type: string;
}

export interface ITestCase {
    info: TestCaseHeader;
    inheritedProp: Array<PropertyValue>;
    hasPermissionsUpdate: boolean;
    messageType: string;
    hasPermissionsStepLibrary: boolean;
    stepList: Array<Step>;
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
    actionList: Array<Action>;
    sort: number;
    step: number;
    toDelete: boolean;
    usrModif: string;
    usrCreated: string;
    dateCreated: string;
    dateModif: string;

    constructor(test: string, testCase: string, sort: number) {
        this.objType = 'step';
        this.test = test;
        this.testCase = testCase;
        this.conditionOper = 'always';
        this.conditionVal1 = '';
        this.conditionVal2 = '';
        this.forceExe = 'N';
        this.loop = 'onceIfConditionTrue';
        this.useStep = 'N';
        this.isStepInUseByOtherTestCase = false;
        this.useStepTest = '';
        this.useStepTestCase = '';
        this.inLibrary = 'N';
        this.initialStep = 0;
        this.useStepStep = 0;
        this.toDelete = false;
        this.description = '';
        this.actionList = new Array<Action>();
        this.sort = sort;
        this.step = null;
        this.dateCreated = '';
        this.dateModif = '';
        this.usrModif = '';
        this.usrCreated = '';
    }
}

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
    controlList: Array<Control>;

    constructor(test: string, testcase: string, sort: number) {
        this.objType = 'action';
        this.forceExeStatus = '';
        this.test = test;
        this.testCase = testcase;
        this.conditionOper = 'always';
        this.conditionVal1 = '';
        this.conditionVal2 = '';
        this.action = 'doNothing';
        this.value1 = '';
        this.value2 = '';
        this.description = '';
        this.sort = sort;
        this.sequence = null;
        this.step = null;
        this.forceExeStatus = '';
        this.screenshotFilename = '';
        this.controlList = new Array<Control>();
    }
}

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
        this.objType = 'control';
        this.test = test;
        this.testCase = testCase;
        this.conditionOper = 'always';
        this.conditionVal1 = '';
        this.conditionVal2 = '';
        this.description = '';
        this.control = 'Unknown';
        this.value1 = '';
        this.value2 = '';
        this.fatal = 'N';
        this.screenshotFilename = '';
        this.sort = sort;
        this.sequence = null;
        this.controlSequence = null;
        this.step = null;
        this.toDelete = false;
    }
}
