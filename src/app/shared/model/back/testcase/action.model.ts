import { Control } from './control.model';

/**
 * @class Action
 * @classdesc action of a test case step
 */
export class Action {

    /** @description test of the action (only relevant with libray steps)*/
    test: string;

    /** @description test of the action (only relevant with libray steps)*/
    testcase: string;

    /** @description action condition operator */
    conditionOperator: string;

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

    /** @description position (index) of the action */
    sort: number;

    /** @description boolean to force the execution of the step */
    isFatal: boolean;

    /** @description unique id of the action */
    actionId: number;

    /** @description step id of this action */
    stepId: number;

    /** @description location of the screenshot (only relevant in execution) */
    screenshotFilename: string;

    /** @description list of controls */
    controls: Array<Control>;

    /** @description deletion flag for the action */
    toDelete?: boolean;

    constructor(testfolder: string, testcaseid: string, sort: number, stepId: number) {
        this.toDelete = false;
        this.test = testfolder;
        this.testcase = testcaseid;
        this.stepId = stepId;
        this.sort = sort;
        this.description = '';
        this.action = 'doNothing';
        this.isFatal = true;
        this.conditionOperator = 'always';
        this.conditionVal1 = '';
        this.conditionVal2 = '';
        this.conditionVal3 = '';
        this.value1 = '';
        this.value2 = '';
        this.value3 = '';
        this.screenshotFilename = '';
        this.controls = new Array<Control>();
    }
}
