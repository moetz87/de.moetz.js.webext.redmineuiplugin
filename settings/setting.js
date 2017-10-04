"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messager_1 = require("./messager");
class Setting {
    load() {
        let data = (chrome != null) ? this.loadChrome(this.name) : this.loadFirefox(this.name);
        return data
            .then((json) => (json[this.name] != null) ? this.fromJson(json[this.name]) : this.createDefault())
            .catch((error) => messager_1.Messager.error('error while loading data from storage: ' + JSON.stringify(error)));
    }
    save() {
        let result = (chrome != null) ? this.saveChrome(this.name, this.toJson()) : this.saveFirefox(this.name, this.toJson());
        return result
            .then(() => messager_1.Messager.success('successfully saved'))
            .catch((error) => messager_1.Messager.error('error while saving data to storage: ' + JSON.stringify(error)));
    }
    loadFirefox(name) {
        return browser.storage.local.get(name);
    }
    loadChrome(name) {
        return new Promise(resolve => chrome.storage.local.get(name, (json) => resolve(json)));
    }
    saveFirefox(name, value) {
        return browser.storage.local.set({ [name]: value });
    }
    saveChrome(name, value) {
        return new Promise(resolve => chrome.storage.local.set({ [name]: value }, () => resolve()));
    }
}
exports.Setting = Setting;
