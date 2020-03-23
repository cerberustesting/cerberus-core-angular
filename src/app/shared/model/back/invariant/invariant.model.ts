export class Invariant {

    /** @description id name of the invariant */
    id: string;

    /** @description value of the invariant */
    value: string;

    /** @description custom field: value converted in number */
    valueInt: number;

    /** @description description of the invariant */
    description: string;

    /** @description attribute #1 */
    gp1: string;

    /** @description attribute #2 */
    gp2: string;

    /** @description attribute #3 */
    gp3: string;

    constructor(id: string) {
        this.id = id;
        this.value = '';
        this.description = '';
        this.gp1 = '';
        this.gp2 = '';
        this.gp3 = '';
    }
}
