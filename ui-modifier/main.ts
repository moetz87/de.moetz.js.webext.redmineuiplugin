import * as jquery from 'jquery';
import { AbstractMain } from '../shared/abstract-main';
import { SettingsLoader } from '../shared/utils/settings-loader';
import { UrlUtils } from '../shared/utils/url-utils';


export class Main extends AbstractMain {

    constructor(
        private readonly urlUtils: UrlUtils,
        private readonly settingsLoader: SettingsLoader) {
        super();
    }

    public async onExecuteMain() {
        const settings = await this.settingsLoader.load();
        if (!this.urlUtils.currentUrlMatchesRegex(settings.url)) {
            console.log(`URL ${this.urlUtils.getCurrentUrl()} not matching pattern ${settings.url}.`);
            return;
        }
        console.log(`URL ${this.urlUtils.getCurrentUrl()} matching pattern ${settings.url}.`);
        settings.rules.forEach(rule => jquery(rule.selector).css(rule.css));
    }

}

new Main(
    new UrlUtils(),
    new SettingsLoader()
).main();
