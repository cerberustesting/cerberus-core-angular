export interface ITag {
    detail: TagDetail;
}

export class TagDetail {
    start: string;
    end: string;
    duration: string;
    ciResult: string;

    constructor() {
        this.start = '';
        this.end = '';
        this.duration = '';
        this.ciResult = '';
    }
}

