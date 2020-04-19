/**
 * @class Control
 * @classdesc control of a test case action
 */
export class Control {

    /** @description test folder of the control */
    test: string;

    /** @description test case id of the control */
    testCase: string;

    /** @description condition operator */
    conditionOper: string;

    /** @description condition value 1 */
    conditionVal1: string;

    /** @description condition value 2 */
    conditionVal2: string;

    /** @description condition value 3 */
    conditionVal3: string;

    /** @description description od the control */
    description: string;

    /** @description control type */
    control: string;

    /** @description control value 1 */
    value1: string;

    /** @description control value 2 */
    value2: string;

    /** @description control value 3 */
    value3: string;

    /** @description is the control fatal? */
    fatal: boolean;

    /** @description name of the screenshot file (only in execution) */
    screenshotFilename: string;

    /** @description position of the control in the action */
    sort: number;

    /** @description index of the parent step */
    stepId: number;

    /** @description id of the parent action */
    actionId: number;

    /** @description unique id of the control.
     * * used with test folder and test case id to uniquely identify the control executions
    */
    controlId: number;

    /** @description flag for deletion */
    toDelete: boolean;

    constructor(testfolder: string, testcaseid: string, sort: number, stepId: number, actionId: number) {
        this.toDelete = false;
        this.test = testfolder;
        this.testCase = testcaseid;
        this.stepId = stepId;
        this.actionId = actionId;
        this.control = 'Unknown';
        this.sort = sort;
        this.description = '';
        this.conditionOper = 'always';
        this.conditionVal1 = '';
        this.conditionVal2 = '';
        this.conditionVal3 = '';
        this.value1 = '';
        this.value2 = '';
        this.value3 = '';
        this.fatal = false;
        this.screenshotFilename = '';
    }
}
