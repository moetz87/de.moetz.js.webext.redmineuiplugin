import { HtmlUtils } from 'ts-common/html-utils';
import { SettingsLoader } from 'ts-common/settings-loader';
import { UrlUtils } from 'ts-common/url-utils';
import { WebextMain } from 'ts-common/webext-main';
import { Rule } from '../shared/entities/rule';
import { Settings } from '../shared/entities/settings';

export class RuleApplier extends WebextMain {

    public async onExecuteMain() {
        const settings = await SettingsLoader.load(Settings);
        if (UrlUtils.currentUrlMatchesRegex(settings.url)) {
            console.debug(`URL ${UrlUtils.getCurrentUrl()} matching pattern ${settings.url}.`);
            this.applyRules(settings.rules);
        } else {
            console.debug(`URL ${UrlUtils.getCurrentUrl()} not matching pattern ${settings.url}.`);
        }
    }

    private applyRules(rules: Rule[]) {
        console.log('applying rules');
        rules.filter(rule => rule.enabled !== false)
            .forEach(rule => HtmlUtils.applyCss(rule.selector, rule.css));
    }

}

new RuleApplier().main();
