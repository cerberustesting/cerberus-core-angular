/**
 * @class Test Case Dependency
 * @classdesc relationship between 2 test cases
 */
export class TestCaseDependency {

    /** dependency id */
    id: number;

    /** test folder of the assigned test case */
    test: string;

    /** test case id of the assigned test case */
    testCase: string;

    /** is the relationship active */
    active: string;

    /** description of the relationship */
    description: string;

    /** event of the relationship */
    event: string;

    /** type of the relationship */
    type: string;

    constructor(test: string, testCase: string) {
        this.test = test;
        this.testCase = testCase;
        this.description = '';
        this.active = 'Y';
        this.type = 'TCEXEEND';
        this.event = '';
    }
}