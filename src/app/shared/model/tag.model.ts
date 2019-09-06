export interface ITag {
    detail: ITagDetail;
}

export class TagDetail {
    start: string;
    end: string;
    duration: string;
    ciResult: string;

    constructor() {
        this.start = "";
        this.end = "";
        this.duration = "";
        this.ciResult = "";
    }
}

export interface ITagDetail extends TagDetail { }