import { PropertyValue } from '../property.model';
import { Label } from './label.model';
import { IInvariant } from '../invariants.model';

/**
 * @class TestCase
 * @classdesc test case object
 * */
export class TestCaseHeader {

    /** @description name of the test folder */
    test: string;

    /** @description id of the test case */
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
    countries: Array<IInvariant>;
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
    labels: Array<Label>;
    bugID: any;
    comment: string;
    dependencies: Array<TestCaseDependency>;
    implementer: string;
    executor: string;
    testCaseVersion: number;
    usrCreated: string;
    dateCreated: string;
    usrModif: string;
    dateModif: string;
    system: string;

    // DIRTY : allow any fields
    // waiting for API rework
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
        this.countries = countryList;
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
        this.labels = [];
        this.bugID = [];
        this.comment = '';
        this.dependencies = [];
        this.implementer = '';
        this.executor = '';
        this.testCaseVersion = 0;
        this.dateCreated = '';
        this.usrCreated = '';
        this.dateModif = '';
        this.usrModif = '';
    }
}

export class TestCaseDependency {
    id: number;
    test: string;
    testCase: string;
    active: string;
    depDescription: string;
    depEvent: string;
    type: string;

    constructor(test: string, testcase: string) {
        this.depDescription = '';
        this.active = 'Y';
        this.type = 'TCEXEEND';
        this.depEvent = '';
    }
}

export interface TestCase {
    header: TestCaseHeader;
    steps: Array<Step>;
    properties: {
        inheritedproperties: Array<PropertyValue>;
        testcaseproperties: Array<PropertyValue>;
    };
    // DIRTY : allow any fields
    // waiting for API rework
    [key: string]: any;
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
