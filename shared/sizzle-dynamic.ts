import { getCurrentUrl } from './utils/url-utils';

const IGNORERULES: (() => boolean)[] = [
    () => getCurrentUrl().endsWith('.xml'),
    () => getCurrentUrl().endsWith('.sds')
];

const applySizzle = () => {
    if (IGNORERULES.map(rule => rule()).find(result => result === true)) {
        console.log('ignore-rule matched. no sizzle.');
        return false;
    }
    console.log('no ignore-rule matched. importing sizzle.');
    return true;
};

export function sizzle(selector: string): Element[] {
    if (!applySizzle()) {
        return [];
    }
    // tslint:disable-next-line:no-require-imports
    return require('sizzle')(selector);
}
