export interface ITestCaseHeader {
    conditionOper: string;
    howTo: string;
    // project: string;
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
    // origin: string;
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
    inheritedProp: [string];
    hasPermissionsUpdate: boolean;
    messageType: string;
    hasPermissionsStepLibrary: boolean;
    stepList: [IStep];
    message: string;
    hasPermissionsDelete: boolean;
    sEcho: number;
}

export interface IStep {
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
    useStepTestCase: string;
    inLibrary: string;
    useStepTest: string;
    initialStep: number;
    useStepStep: number;
    usrModif: string;
    usrCreated: string;
    description: string;
    actionList: [IAction];
    sort: number;
    step: number;
    dateCreated: string;
    dateModif: string;
    toDelete: boolean;
}

export interface IAction {
    objType: string;
    forceExeStatus: string;
    conditionVal2: string;
    test: string;
    conditionOper: string;
    conditionVal1: string;
    value2: string;
    controlList: [IControl];
    value1: string;
    screenshotFilename: string
    description: string;
    sort: number;
    sequence: number;
    action: string;
    step: number;
    testCase: string;
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

    constructor(test: string, testCase: string, sort: number, sequence: number, controlSequence: number, step: number) {
        this.objType = "control",
            this.test = test,
            this.testCase = testCase,
            this.conditionOper = "always",
            this.conditionVal1 = "",
            this.conditionVal2 = "",
            this.description = "",
            this.control = "Unknown",
            this.value1 = "",
            this.value2 = "",
            this.fatal = "N",
            this.screenshotFilename = "",
            this.sort = sort,
            this.sequence = sequence,
            this.controlSequence = controlSequence,
            this.step = step,
            this.toDelete = false
    }
}

export interface IControl extends Control {

}
