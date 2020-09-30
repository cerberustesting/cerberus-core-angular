/**
 * @class Test Case Dependency
 * @classdesc relationship between 2 test cases
 */
export class TestCaseDependency {

    /** dependency id */
    id: number;

    /** is the relationship active */
    active: boolean;

    /** test folder of the assigned test case */
    dependencyTest: string;

    /** test case id of the assigned test case */
    dependencyTestCase: string;

    /** description of the relationship */
    dependencyDescription: string;

    /** event of the relationship */
    event: string;

    /** type of the relationship */
    type: string;

    constructor(test: string, testCase: string) {
        this.id = 0;
        this.dependencyTest = test;
        this.dependencyTestCase = testCase;
        this.dependencyDescription = '';
        this.active = true;
        this.type = 'TCEXEEND';
        this.event = '';
    }
}
