import { v4 as UUIDv4 } from 'uuid';

export class Rule {

    constructor(
        public readonly id,
        public note: string,
        public selector: string,
        public css: any,
        public enabled: boolean = true) {

    }

    public static empty(): Rule {
        return new Rule(UUIDv4(), '', '', {}, true);
    }

}
