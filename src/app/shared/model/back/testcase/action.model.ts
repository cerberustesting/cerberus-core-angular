import { Control } from './control.model';

/**
 * @class Action
 * @classdesc action of a test case step
 */
export class Action {

    /** @description ? (seems to always be action) */
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