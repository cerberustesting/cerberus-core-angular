export interface ILabel {
    color: string;
    usrModif: string;
    counter1: number;
    description: string;
    label: string;
    type: string;
    usrCreated: string;
    parentLabelID: number;
    system: string;
    reqStatus: string;
    dateCreated: string;
    reqType: string;
    reqCriticity: string;
    id: number;
    dateModif: string;
    longDesc: string;
}

export interface ITestCaseLabel {
    dateCreated: string;
    test: string;
    labelId: number;
    usrModif: string;
    id: number;
    dateModif: string;
    label: ILabel;
    testcase: string;
    usrCreated: string;
}
