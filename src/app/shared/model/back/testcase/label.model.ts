/**
 * @enum Label Type
 * @description enumeration for label type
*/
export enum LabelType {
    sticker = 'STICKER',
    battery = 'BATTERY',
    requirement = 'REQUIREMENT'
}

/**
 * @class Label
 * @classdesc label object
 */
export class Label {

    /** @description unique id of the label */
    id: number;

    /** @description label name */
    label: string;

    /** @description label type (sticker, battery or requirement) */
    type: LabelType;

    /** @description label color in HEX format */
    color: string;

    /** @description label short description */
    description: string;

    /** @description id of the optional parent label id */
    parentLabelID: number;

    /** @description system assigned for the label */
    system: string;

    /** @description label long description */
    longDesc: string;

    /** @description requirement type (public invariant) */
    reqType: string;

    /** @description requirement criticity (public invariant) */
    reqCriticity: string;

    /** @description requirement status (public invariant) */
    reqStatus: string;

    /** @description audit field : label creation date */
    dateCreated: string;

    /** @description audit field : user who created the label */
    usrCreated: string;

    /** @description audit field : label last modification date */
    dateModif: string;

    /** @description audit field : last user who modified the label */
    usrModif: string;

    constructor(labelname: string) {
        this.label = labelname;
        this.type = LabelType.sticker;
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
