import { Settings } from '../model/settings';

declare var browser: any;

export class SettingsLoader {

    public load(): Promise<Settings> {
        return browser.storage.local.get()
            .then((json: any) => Settings.fromJson(json));
    }

    public save(settings: Settings): Promise<void> {
        return browser.storage.local.set(settings);
    }

}
