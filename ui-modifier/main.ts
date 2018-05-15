import * as jQuery from 'jquery';
import { AbstractMain } from '../shared/abstract-main';
import { Rule } from '../shared/model/rule';
import { SettingsLoader } from '../shared/utils/settings-loader';
import { UrlUtils } from '../shared/utils/url-utils';

const DETAILEDVIEWPATTERN = '\/issues\/[0-9]+';
const HIDDENCOMMENTS_SELECTOR = 'div[id^="change-"]:not(".has-notes")';
const HIDDENCOMMENTS_CSS = { 'display': 'none' };
const UNHIDDENCOMMENTS_CSS = { 'display': 'inline' };

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
        if (this.urlUtils.urlEndsWith(DETAILEDVIEWPATTERN)) {
            console.log(`URL ${this.urlUtils.getCurrentUrl()} ends with ${DETAILEDVIEWPATTERN}`);
            this.showOrReplaceCommentsToggle(settings.hiddenComments);
            this.showOrHideComments(settings.hiddenComments);
        }
        console.log(`URL ${this.urlUtils.getCurrentUrl()} matching pattern ${settings.url}.`);
        this.applyRules(settings.rules);
    }

    private applyRules(rules: Rule[]) {
        console.log('applying rules');
        rules.forEach(rule => jQuery(rule.selector).css(rule.css));
    }

    private showOrReplaceCommentsToggle(hidden: boolean) {
        jQuery('#comments-toggle').remove();
        const toggle = document.createElement('a');
        toggle.id = 'comments-toggle';
        toggle.style.cursor = 'pointer';
        toggle.innerText = (hidden === true) ? 'Kommentar ohne Inhalt anzeigen' : 'Kommentare ohne Inhalt ausblenden';
        toggle.onclick = () => this.onCommentsToggle();
        jQuery('#history h3').first().after(toggle);
    }

    private showOrHideComments(hidden: boolean) {
        console.log(`Hidden? ${hidden}`);
        if (hidden === true) {
            jQuery(HIDDENCOMMENTS_SELECTOR).css(HIDDENCOMMENTS_CSS);
        } else {
            jQuery(HIDDENCOMMENTS_SELECTOR).css(UNHIDDENCOMMENTS_CSS);
        }
    }

    private async onCommentsToggle() {
        console.log('toggle clicked');
        const settings = await this.settingsLoader.load();
        settings.hiddenComments = !settings.hiddenComments;
        this.settingsLoader.save(settings);
        this.showOrReplaceCommentsToggle(settings.hiddenComments);
        this.showOrHideComments(settings.hiddenComments);
    }

}

new Main(
    new UrlUtils(),
    new SettingsLoader()
).main();
