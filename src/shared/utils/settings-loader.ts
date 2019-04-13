export module SettingsLoader {

    declare var browser: any;

    // tslint:disable-next-line:no-reserved-keywords
    export async function load<T extends ISettings>(type: (new () => T)): Promise<T> {
        const json = await browser.storage.local.get() || {};
        let instance = new type();
        instance = Object.assign(instance, json);
        return Promise.resolve(instance);
    }

    export async function save(settings: ISettings): Promise<void> {
        return browser.storage.local.set(settings);
    }

    // tslint:disable-next-line:no-empty-interface
    export interface ISettings { }

}
