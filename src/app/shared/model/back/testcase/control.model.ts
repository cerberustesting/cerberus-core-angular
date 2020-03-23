/**
 * @class Control
 * @classdesc control of a test case action
 */
export class Control {

    /** @description ? */
    objType: string;

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
    fatal: string;

    /** @description name of the screenshot file (only in execution) */
    screenshotFilename: string;

    /** @description control index in its action */
    sort: number;

    /** @description position of the parent action */
    sequence: number;

    /** @description previous position of the control */
    controlSequence: number;

    /** @description index of parent step */
    step: number;

    /** @description flag for deletion */
    toDelete: boolean;

    constructor(sort: number, stepIndex: number, actionIndex: number) {
        this.objType = 'control';
        this.test = '';
        this.testCase = '';
        this.conditionOper = 'always';
        this.conditionVal1 = '';
        this.conditionVal2 = '';
        this.conditionVal3 = '';
        this.description = '';
        this.control = 'Unknown';
        this.value1 = '';
        this.value2 = '';
        this.value3 = '';
        this.fatal = 'N';
        this.screenshotFilename = '';
        this.sort = sort;
        this.sequence = actionIndex;
        this.step = stepIndex;
        this.toDelete = false;
    }
}
