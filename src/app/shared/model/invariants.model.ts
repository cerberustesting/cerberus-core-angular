export class Invariant {
    id: string;
    value: string;
    description: string;
    gp1: string;
    gp2: string;
    gp3: string;
    [key: string]: any;

    constructor(id: string) {
        this.id = id;
        this.value = '';
        this.description = '';
        this.gp1 = '';
        this.gp2 = '';
        this.gp3 = '';
    }
}
