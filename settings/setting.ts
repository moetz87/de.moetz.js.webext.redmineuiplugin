import { Messager } from "./messager";

declare var chrome: any;
declare var browser: any;


export abstract class Setting {

    load(): Promise<void> {
        let data = (chrome != null) ? this.loadChrome(this.name) : this.loadFirefox(this.name);
        return data
            .then((json: any) => (json[this.name] != null) ? this.fromJson(json[this.name]) : this.createDefault())
            .catch((error: any) => Messager.error('error while loading data from storage: ' + JSON.stringify(error)));
    }

    save(): Promise<void> {
        let result = (chrome != null) ? this.saveChrome(this.name, this.toJson()) : this.saveFirefox(this.name, this.toJson());
        return result
            .then(() => Messager.success('successfully saved'))
            .catch((error: any) => Messager.error('error while saving data to storage: ' + JSON.stringify(error)));
    }

    private loadFirefox(name: string): Promise<any> {
        return browser.storage.local.get(name);
    }

    private loadChrome(name: string): Promise<any> {
        return new Promise(resolve => chrome.storage.local.get(name, (json: any) => resolve(json)));
    }

    private saveFirefox(name: string, value: any): Promise<void> {
        return browser.storage.local.set({ [name]: value });
    }

    private saveChrome(name: string, value: any): Promise<void> {
        return new Promise(resolve => chrome.storage.local.set({ [name]: value }, () => resolve()));
    }

    abstract get name(): string;

    abstract toJson(): any;

    abstract fromJson(json: any): void;

    abstract createDefault(): void;

    abstract render(): void;

}