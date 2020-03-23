import { Action } from './action.model';

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
        this.conditionVal3 = '';
        this.forceExe = 'N';
        this.loop = 'onceIfConditionTrue';
        this.useStep = 'N';
        this.isStepInUseByOtherTestCase = false;
        this.useStepTest = '';
        this.useStepTestCase = '';
        this.inLibrary = 'N';
        this.initialStep = 0;
        this.useStepStep = -1;
        this.toDelete = false;
        this.description = '';
        this.actions = new Array<Action>();
        this.sort = sort;
        this.dateCreated = '';
        this.dateModif = '';
        this.usrModif = '';
        this.usrCreated = '';
    }
}
