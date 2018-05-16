import { Settings } from '../model/settings';

declare var browser: any;

export class SettingsLoader {

    public async load(): Promise<Settings> {
        const json = await browser.storage.local.get();
        return Settings.fromJson(json);
    }

    public save(settings: Settings): Promise<void> {
        return browser.storage.local.set(settings);
    }

}
