import { Settings } from '../model/settings';

declare var browser: any;

export async function load(): Promise<Settings> {
    const json = await browser.storage.local.get();
    return Settings.fromJson(json);
}

export async function save(settings: Settings): Promise<void> {
    return browser.storage.local.set(settings);
}
