export interface ITestCaseHeader {
    conditionOper: string;
    howTo: string;
    project: string;
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
    origin: string;
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
    isStepInUseByOtherTestCase: boolean;
    conditionVal2: string;
    useStepTestCase: string;
    test: string;
    conditionOper: string;
    conditionVal1: string;
    usrModif: string;
    inLibrary: string;
    useStepTest: string;
    description: string;
    actionList: [IAction];
    sort: number;
    usrCreated: string;
    forceExe: string;
    dateCreated: string;
    initialStep: number;
    loop: string;
    step: number;
    dateModif: string;
    useStepStep: number;
    objType: string;
    useStep: string;
    testCase: string;
}

export interface IAction {
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
    objType: string;
    testCase: string;
}

export interface IControl {
    conditionVal2: string;
    test: string;
    conditionOper: string;
    conditionVal1: string;
    value2: string;
    value1: string;
    screenshotFilename: string;
    description: string;
    control: string;
    sort: number;
    fatal: string;
    sequence: number;
    controlSequence: number;
    step: number;
    objType: string;
    testCase: string;
}