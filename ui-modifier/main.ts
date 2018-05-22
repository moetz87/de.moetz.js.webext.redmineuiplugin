import { AbstractMain } from '../shared/abstract-main';
import { Rule } from '../shared/model/rule';
import { appendAfter, applyCss, findFirst, ifExists } from '../shared/utils/html-utils';
import * as SettingsLoader from '../shared/utils/settings-loader';
import * as UrlUtils from '../shared/utils/url-utils';

const DETAILEDVIEWPATTERN = '\/issues\/[0-9]+';
const HIDDENCOMMENTS_SELECTOR = 'div[id^="change-"]:not(".has-notes")';
const HIDDENCOMMENTS_CSS = { display: 'none' };
const UNHIDDENCOMMENTS_CSS = { display: 'inline' };

export class Main extends AbstractMain {

    public async onExecuteMain() {
        const settings = await SettingsLoader.load();
        if (!UrlUtils.currentUrlMatchesRegex(settings.url)) {
            console.log(`URL ${UrlUtils.getCurrentUrl()} not matching pattern ${settings.url}.`);
            return;
        }
        if (UrlUtils.urlEndsWith(DETAILEDVIEWPATTERN)) {
            console.log(`URL ${UrlUtils.getCurrentUrl()} ends with ${DETAILEDVIEWPATTERN}`);
            this.showOrReplaceCommentsToggle(settings.hiddenComments);
            this.showOrHideComments(settings.hiddenComments);
        }
        console.log(`URL ${UrlUtils.getCurrentUrl()} matching pattern ${settings.url}.`);
        this.applyRules(settings.rules);
    }

    private applyRules(rules: Rule[]) {
        console.log('applying rules');
        rules.filter(rule => rule.enabled !== false)
            .forEach(rule => applyCss(rule.selector, rule.css));
    }

    private showOrReplaceCommentsToggle(hidden: boolean) {
        ifExists('#comments-toogle', e => e.remove());
        const toggle = document.createElement('a');
        toggle.id = 'comments-toggle';
        toggle.style.cursor = 'pointer';
        toggle.innerText = (hidden === true) ? 'Kommentar ohne Inhalt anzeigen' : 'Kommentare ohne Inhalt ausblenden';
        toggle.onclick = () => this.onCommentsToggle();
        appendAfter(findFirst('#history h3'), toggle);
    }

    private showOrHideComments(hidden: boolean) {
        console.log(`Hidden? ${hidden}`);
        if (hidden === true) {
            applyCss(HIDDENCOMMENTS_SELECTOR, HIDDENCOMMENTS_CSS);
        } else {
            applyCss(HIDDENCOMMENTS_SELECTOR, UNHIDDENCOMMENTS_CSS);
        }
    }

    private async onCommentsToggle() {
        console.log('toggle clicked');
        const settings = await SettingsLoader.load();
        settings.hiddenComments = !settings.hiddenComments;
        SettingsLoader.save(settings);
        this.showOrReplaceCommentsToggle(settings.hiddenComments);
        this.showOrHideComments(settings.hiddenComments);
    }

}

new Main().main();
