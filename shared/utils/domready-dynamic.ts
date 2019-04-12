export module Domready {

    export function onReady(callback: () => void) {
        if (document === null) {
            console.log('document undefined. not importing domready.');
            return;
        }
        // tslint:disable-next-line:no-require-imports
        const domready = require('domready');
        domready(callback);
    }

}
