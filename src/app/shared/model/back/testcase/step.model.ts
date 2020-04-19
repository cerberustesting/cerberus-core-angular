import { Action } from './action.model';

/**
 * @class Step
 * @classdesc step of a test case script
 */
export class Step {

    /** @description test folder of this step */
    test: string;

    /** @description test case id of this step */
    testCase: string;

    /** @description description of the test folder of this step (currently used only with library steps modal) */
    tcdesc?: string;

    /** @description step description */
    description: string;

    /** @description condition operator */
    conditionOper: string;

    /** @description condition value 1 */
    conditionVal1: string;

    /** @description condition value 2 */
    conditionVal2: string;

    /** @description condition value 3 */
    conditionVal3: string;

    /** @description boolean to force the execution of the step */
    forceExecution: boolean;

    /** @description loop operator */
    loop: string;

    /** @description is the step used imported from another test case */
    useStep: boolean;

    /** @description is the step the reference */
    inLibrary: boolean;

    /** @description is the step used in another test case? */
    isStepInUseByOtherTestCase: boolean;

    /** @description test folder of the use step */
    useStepTest: string;

    /** @description test case id of the use step */
    useStepTestCase: string;

    /** @description unique id of the reference step (relevant only if useStep = true) */
    useStepStepId: number;

    /** @description index of the library step that reference this step (relevant only if useStep = true) */
    useStepStepSort: number;

    /** @description index of the step */
    sort: number;

    /** @description unique id of the step */
    stepId: number;

    /** @description should the step be deleted? */
    toDelete: boolean;

    /** @description list of actions */
    actions: Array<Action>;

    constructor(testfolder: string, testcaseid: string, sort: number) {
        this.toDelete = false;
        this.test = testfolder;
        this.testCase = testcaseid;
        this.sort = sort;
        this.description = '';
        this.useStep = false;
        this.inLibrary = false;
        this.loop = 'onceIfConditionTrue';
        this.conditionOper = 'always';
        this.conditionVal1 = '';
        this.conditionVal2 = '';
        this.conditionVal3 = '';
        this.forceExecution = false;
        this.actions = new Array<Action>();
    }
}
