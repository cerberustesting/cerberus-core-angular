import { PropertyValue } from './property.model';
import { Label } from './label.model';
import { Invariant } from '../invariants.model';

/**
 * @class Test Case Properties
 * @classdesc list of properties of a test case
 */
export class TestCaseProperties {

    /** @description inherited properties of the test case */
    inheritedProperties: Array<PropertyValue>;

    /** @description properties specified for the test case */
    testcaseProperties: Array<PropertyValue>;

    constructor() {
        this.inheritedProperties = [];
        this.testcaseProperties = [];
    }
}

/**
 * @class TestCase
 * @classdesc test case object
 * */
export class TestCase {

    /** @description name of the test folder */
    test: string;

    /** @description id of the test case */
    testCase: string;

    /** @description brief description of the test case */
    description: string;

    /** @description application name of this test case (unique) */
    application: string;

    /** @description status name of the test case (public invariant) */
    status: string;

    /** @description type name of the test case (private invariant) */
    group: string;

    /** @description criticity of the test case (used for CI score calculation) */
    priority: number;

    /** @description detailed description of the test case */
    behaviorOrValueExpected: string;

    /** @description global activation of the test case */
    tcActive: string;

    /** @description QA activation of the test case */
    activeQA: string;

    /** @description UAT activation of the test case */
    activeUAT: string;

    /** @description PROD activation of the test case */
    activePROD: string;

    /** @description list of selected countries for this test case */
    countries: Array<Invariant>;

    /** @description earliest build (major version) that defines the activation of the test case */
    fromBuild: string;

    /** @description latest build (major version) that defines the activation of the test case */
    toBuild: string;

    /** @description earliest (minor revision) revision that defines the activation of the test case */
    fromRev: string;

    /** @description latest (minor revision) revision that defines the activation of the test case */
    toRev: string;

    /** @description target (minor revision) revision that defines the activation of the test case */
    targetBuild: string;

    /** @description target (minor revision) revision that defines the activation of the test case */
    targetRev: string;

    /** @description test case activation condition */
    conditionOper: string;

    /** @description test case activation condition first value */
    conditionVal1: string;

    /** @description test case activation condition second value */
    conditionVal2: string;

    /** @description test case activation condition third value */
    conditionVal3: string;

    /** @description specific user-agent for the test case */
    userAgent: string;

    /** @description screen size that the test case should be executed with */
    screenSize: string;

    /** @description list of selected labels for this test case */
    labels: Array<Label>;

    /** @description list of assigned bugs for this test case */
    bugs: Array<Bug>;

    /** @description global comment for the test case */
    comment: string;

    /** @description list of assigned dependencies for this test case */
    dependencies: Array<TestCaseDependency>;

    /** @description user name responsible for the implementation */
    implementer: string;

    /** @description user name responsible for the manual execution */
    executor: string;

    /** @description version of the test case (increase at every test case header save) */
    testCaseVersion: number;

    /** @description audit field: user who created the test case */
    usrCreated: string;

    /** @description audit field: test case creation date */
    dateCreated: string;

    /** @description audit field: user who last modified the test case */
    usrModif: string;

    /** @description audit field: latest modification date of the user */
    dateModif: string;

    /** @description system of the selected application (not editable in GUI) */
    system: string;

    /** @description script content of the test case */
    steps: Array<Step>;

    /** @description properties of the test case */
    properties: TestCaseProperties;

    // DIRTY : allow any fields
    // waiting for API rework
    // [key: string]: any;

    constructor(
        test: string,
        testcase: string,
        application: string,
        group: string,
        priority: number,
        status: string,
        countries: Array<any>,
        system: string
    ) {
        this.test = test;
        this.testCase = testcase;
        this.description = '';
        this.application = application;
        this.system = system;
        this.group = group;
        this.priority = priority;
        this.status = status;
        this.behaviorOrValueExpected = '';
        this.tcActive = 'Y';
        this.activeQA = 'Y';
        this.activeUAT = 'Y';
        this.activePROD = 'N';
        this.countries = countries;
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
        this.bugs = [];
        this.comment = '';
        this.dependencies = [];
        this.implementer = '';
        this.executor = '';
        this.testCaseVersion = 0;
        this.dateCreated = '';
        this.usrCreated = '';
        this.dateModif = '';
        this.usrModif = '';
        this.steps = [];
        this.properties = new TestCaseProperties();
    }
}

/**
 * @class Test Case Dependency
 * @classdesc relationship between 2 test cases
 */
export class TestCaseDependency {

    /** dependency id */
    id: number;

    /** test folder of the assigned test case */
    test: string;

    /** test case id of the assigned test case */
    testCase: string;

    /** is the relationship active */
    active: string;

    /** description of the relationship */
    description: string;

    /** event of the relationship */
    event: string;

    /** type of the relationship */
    type: string;

    constructor(test: string, testCase: string) {
        this.test = test;
        this.testCase = testCase;
        this.description = '';
        this.active = 'Y';
        this.type = 'TCEXEEND';
        this.event = '';
    }
}

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

/**
 * @class Step
 * @classdesc step of a test case script
 */
export class Step {

    /** @description ? */
    objType: string;

    /** @description test folder of this step */
    test: string;

    /** @description test case id of this step */
    testCase: string;

    /** @description condition operator */
    conditionOper: string;

    /** @description condition value 1 */
    conditionVal1: string;

    /** @description condition value 2 */
    conditionVal2: string;

    /** @description condition value 3 */
    conditionVal3: string;

    /** @description boolean to force the execution of the step */
    forceExe: string;

    /** @description loop operator */
    loop: string;

    /** @description is the step a use step? (boolean) */
    useStep: string;

    /** @description is the step used in another test case? (boolean) */
    isStepInUseByOtherTestCase: boolean;

    /** @description test folder of the use step */
    useStepTest: string;

    /** @description test case id of the use step */
    useStepTestCase: string;

    /** @description is the step in library? */
    inLibrary: string;

    /** @description ? */
    initialStep: number;

    /** @description ? */
    useStepStep: number;

    /** @description step description */
    description: string;

    /** @description list of actions */
    actions: Array<Action>;

    /** @description ? */
    sort: number;

    /** @description ? */
    step: number;

    /** @description should the step be deleted? */
    toDelete: boolean;

    /** @description audit field: user who last modified the step*/
    usrModif: string;

    /** @description audit field: user who created the step */
    usrCreated: string;

    /** @description audit field: date of the step creation */
    dateCreated: string;

    /** @description audit field: date of the step last modification */
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
        this.actions = new Array<Action>();
        this.sort = sort;
        this.step = null;
        this.dateCreated = '';
        this.dateModif = '';
        this.usrModif = '';
        this.usrCreated = '';
    }
}

/**
 * @class Action
 * @classdesc action of a test case step
 */
export class Action {

    /** @description ? */
    objType: string;

    /** @description test of the action */
    test: string;

    /** @description test of the action */
    testCase: string;

    /** @description action condition operator */
    conditionOper: string;

    /** @description action condition value 1 */
    conditionVal1: string;

    /** @description action condition value 2 */
    conditionVal2: string;

    /** @description action condition value 3 */
    conditionVal3: string;

    /** @description action type */
    action: string;

    /** @description action value 1 */
    value1: string;

    /** @description action value 2 */
    value2: string;

    /** @description action value 3 */
    value3: string;

    /** @description action description */
    description: string;

    /** @description chronological position of the action */
    sort: number;

    /** @description ? */
    sequence: number;

    /** @description index of the step for this action */
    step: number;

    /** @description boolean to force the execution of the step */
    forceExeStatus: string;

    /** @description location of the screenshot (only relevant in execution) */
    screenshotFilename: string;

    /** @description deletion flag for the action */
    toDelete: boolean;

    /** @description list of controls */
    controls: Array<Control>;

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
        this.toDelete = false;
        this.controls = new Array<Control>();
    }
}

/**
 * @class Control
 * @classdesc control of a test case action
 */
export class Control {
    objType: string;
    test: string;
    testCase: string;
    conditionOper: string;
    conditionVal1: string;
    conditionVal2: string;
    conditionVal3: string;
    description: string;
    control: string;
    value2: string;
    value1: string;
    value3: string;
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
        this.conditionVal3 = '';
        this.description = '';
        this.control = 'Unknown';
        this.value1 = '';
        this.value2 = '';
        this.value3 = '';
        this.fatal = 'N';
        this.screenshotFilename = '';
        this.sort = sort;
        this.sequence = null;
        this.controlSequence = null;
        this.step = null;
        this.toDelete = false;
    }
}
