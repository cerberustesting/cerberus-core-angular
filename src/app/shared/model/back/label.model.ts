
/**
 * @class Label
 * @classdesc label object
 */
export class Label {
    id: number;
    label: string;
    type: string;
    color: string;
    description: string;
    parentLabelID: number;
    system: string;
    longDesc: string;
    reqType: string;
    reqCriticity: string;
    reqStatus: string;
    dateCreated: string;
    usrCreated: string;
    dateModif: string;
    usrModif: string;

    constructor(labelname: string) {
        this.label = labelname;
        this.type = 'STICKER';
        this.color = '#2980b9';
        this.description = '';
        this.parentLabelID = null;
        this.system = '';
        this.longDesc = '';
        this.reqType = '';
        this.reqStatus = '';
        this.reqStatus = '';
    }
}

// TODO : remove
export interface ITestCaseLabel {
    dateCreated: string;
    test: string;
    labelId: number;
    usrModif: string;
    id: number;
    dateModif: string;
    label: Label;
    testcase: string;
    usrCreated: string;
}
