import * as UUIDv4 from 'uuid/v4';

export class Rule {

    constructor(
        public readonly id,
        public note: string,
        public selector: string,
        public css: any) {

    }

    public static empty(): Rule {
        return new Rule(UUIDv4(), '', '', {});
    }

}
