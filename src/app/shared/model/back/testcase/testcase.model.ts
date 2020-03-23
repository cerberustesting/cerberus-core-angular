import { PropertyValue, TestCasePropertiesV2 } from './property.model';
import { Label } from './label.model';
import { Invariant } from '../invariant/invariant.model';
import { Step } from './step.model';
import { Bug } from './bug.model';
import { TestCaseDependency } from './dependency.model';

/**
 * @class Test Case Properties
 * @classdesc list of properties of a test case
 */
export class TestCaseProperties {

    /** @description inherited properties of the test case */
    inheritedProperties: Array<PropertyValue>;

    /** @description properties specified for the test case */
    testCaseProperties: Array<PropertyValue>;

    constructor() {
        this.inheritedProperties = [];
        this.testCaseProperties = [];
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

    /** @description audit field: latest modification date of the test case */
    dateModif: string;

    /** @description system of the selected application (not editable in GUI) */
    system: string;

    /** @description script content of the test case */
    steps: Array<Step>;

    /** @description properties of the test case */
    properties: TestCaseProperties;

    /** @description new format properties of the test case (temporary) */
    propertiesV2: TestCasePropertiesV2;

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
        this.propertiesV2 = new TestCasePropertiesV2();
    }
}
