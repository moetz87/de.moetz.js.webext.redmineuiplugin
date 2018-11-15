declare var browser: any;

export module Messager {

    export function showMessage(title: string, message: string) {
        browser.runtime.sendMessage({
            type: 'basic',
            title: title,
            message: message
        });
    }

}
