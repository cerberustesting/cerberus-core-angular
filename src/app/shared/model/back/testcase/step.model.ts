import { Action } from './action.model';

/**
 * @class Step
 * @classdesc step of a test case script
 */
export class Step {

    /** @description test folder of this step */
    test: string;

    /** @description test case id of this step */
    testcase: string;

    /** @description description of the test folder of this step (currently used only with library steps modal) */
    tcdesc?: string;

    /** @description step description */
    description: string;

    /** @description condition operator */
    conditionOperator: string;

    /** @description condition value 1 */
    conditionValue1: string;

    /** @description condition value 2 */
    conditionValue2: string;

    /** @description condition value 3 */
    conditionValue3: string;

    /** @description boolean to force the execution of the step */
    isExecutionForced: boolean;

    /** @description loop operator */
    loop: string;

    /** @description is the step used imported from another test case */
    isUsingLibraryStep: boolean;

    /** @description is the step the reference */
    isLibraryStep: boolean;

    /** @description is the step used in another test case? */
    isStepInUseByOtherTestCase: boolean;

    /** @description test folder of the use step */
    libraryStepTest: string;

    /** @description test case id of the use step */
    libraryStepTestcase: string;

    /** @description unique id of the reference step (relevant only if useStep = true) */
    libraryStepStepId: number;

    /** @description index of the step */
    sort: number;

    /** @description unique id of the step */
    stepId: number;

    /** @description should the step be deleted? */
    toDelete?: boolean;

    /** @description (custom) can the step be edited? */
    readonly?: boolean;

    /** @description list of actions */
    actions: Array<Action>;

    constructor(testfolder: string, testcaseid: string, sort: number) {
        this.toDelete = false;
        this.test = testfolder;
        this.testcase = testcaseid;
        this.sort = sort;
        this.description = '';
        this.isUsingLibraryStep = false;
        this.isLibraryStep = false;
        this.loop = 'onceIfConditionTrue';
        this.conditionOperator = 'always';
        this.conditionValue1 = '';
        this.conditionValue2 = '';
        this.conditionValue3 = '';
        this.isExecutionForced = false;
        this.actions = new Array<Action>();
    }
}
