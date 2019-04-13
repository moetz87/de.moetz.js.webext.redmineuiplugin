import { UrlUtils } from './url-utils';

export module Sizzle {

    function importing() {
        return [
            () => UrlUtils.getCurrentUrl().endsWith('.xml'),
            () => UrlUtils.getCurrentUrl().endsWith('.sds')
        ].every(rule => rule() === false);
    }

    export function select(selector: string): Element[] {
        if (!importing()) {
            console.log('not importing sizzle.');
            return [];
        }
        // tslint:disable-next-line:no-require-imports
        const sizzle = require('sizzle');
        return sizzle(selector);
    }

}
