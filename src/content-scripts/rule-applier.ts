import { Rule } from '../shared/entities/rule';
import { Settings } from '../shared/entities/settings';
import { Domready } from '../shared/utils/domready-dynamic';
import { HtmlUtils } from '../shared/utils/html-utils';
import { SettingsLoader } from '../shared/utils/settings-loader';

export class RuleApplier {

    public async main() {
        const settings = await SettingsLoader.load(Settings);
        this.applyRules(settings.rules);
    }

    private applyRules(rules: Rule[]) {
        rules.filter(rule => rule.enabled !== false)
            .forEach(rule => HtmlUtils.applyCss(rule.selector, rule.css));
    }

}

Domready.onReady(async () => new RuleApplier().main());
