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
    testcase: string;

    /** @description brief description of the test case */
    description: string;

    /** @description application name of this test case (unique) */
    application: string;

    /** @description status name of the test case (public invariant) */
    status: string;

    /** @description type name of the test case (private invariant) */
    type: string;

    /** @description criticity of the test case (used for CI score calculation) */
    priority: number;

    /** @description detailed description of the test case */
    detailedDescription: string;

    /** @description global activation of the test case */
    isActive: string;

    /** @description QA activation of the test case */
    isActiveQA: string;

    /** @description UAT activation of the test case */
    isActiveUAT: string;

    /** @description PROD activation of the test case */
    isActivePROD: string;

    /** @description list of selected countries for this test case */
    countries: Array<Invariant>;

    /** @description earliest build (major version) that defines the activation of the test case */
    fromMajor: string;

    /** @description latest build (major version) that defines the activation of the test case */
    toMajor: string;

    /** @description target build (major revision) that defines the activation of the test case */
    targetMajor: string;

    /** @description earliest (minor revision) revision that defines the activation of the test case */
    fromMinor: string;

    /** @description latest (minor revision) revision that defines the activation of the test case */
    toMinor: string;

    /** @description target (minor revision) revision that defines the activation of the test case */
    targetMinor: string;

    /** @description test case activation condition */
    conditionOperator: string;

    /** @description test case activation condition first value */
    conditionValue1: string;

    /** @description test case activation condition second value */
    conditionValue2: string;

    /** @description test case activation condition third value */
    conditionValue3: string;

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
    version: number;

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
        type: string,
        priority: number,
        status: string,
        countries: Array<any>,
        system: string
    ) {
        this.test = test;
        this.testcase = testcase;
        this.description = '';
        this.application = application;
        this.system = system;
        this.type = type;
        this.priority = priority;
        this.status = status;
        this.detailedDescription = '';
        this.isActive = 'Y';
        this.isActiveQA = 'Y';
        this.isActiveUAT = 'Y';
        this.isActivePROD = 'N';
        this.countries = countries;
        this.fromMajor = '';
        this.fromMinor = '';
        this.toMajor = '';
        this.toMinor = '';
        this.targetMajor = '';
        this.targetMinor = '';
        this.conditionOperator = '';
        this.conditionValue1 = '';
        this.conditionValue2 = '';
        this.conditionValue3 = '';
        this.userAgent = '';
        this.screenSize = '';
        this.labels = [];
        this.bugs = [];
        this.comment = '';
        this.dependencies = [];
        this.implementer = '';
        this.executor = '';
        this.version = 0;
        this.dateCreated = '';
        this.usrCreated = '';
        this.dateModif = '';
        this.usrModif = '';
        this.steps = [];
        this.properties = new TestCaseProperties();
        this.propertiesV2 = new TestCasePropertiesV2();
    }
}
