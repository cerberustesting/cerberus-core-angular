export class BuildRevisionDefinition {

    system: string;
    level: number;
    versionName: string;
    seq: number;

    constructor(system: string) {
        this.system = system;
        this.level = 1;
        this.versionName = '';
        this.seq = null;
    }
}
