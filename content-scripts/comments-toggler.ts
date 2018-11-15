import { HtmlUtils } from 'ts-common/html-utils';
import { SettingsLoader } from 'ts-common/settings-loader';
import { UrlUtils } from 'ts-common/url-utils';
import { WebextMain } from 'ts-common/webext-main';
import { Settings } from '../shared/entities/settings';

const DETAILEDVIEWPATTERN = '\/issues\/[0-9]+';
const HIDDENCOMMENTS_SELECTOR = 'div[id^="change-"]:not(".has-notes")';
const HIDDENCOMMENTS_CSS = { display: 'none' };
const UNHIDDENCOMMENTS_CSS = { display: 'inline' };

export class CommentsToggler extends WebextMain {

    public async onExecuteMain() {
        const settings = await SettingsLoader.load(Settings);
        if (UrlUtils.urlEndsWith(DETAILEDVIEWPATTERN)) {
            console.log(`URL ${UrlUtils.getCurrentUrl()} ends with ${DETAILEDVIEWPATTERN}`);
            this.showOrReplaceCommentsToggle(settings.hiddenComments);
            this.showOrHideComments(settings.hiddenComments);
        } else {
            console.debug(`URL ${UrlUtils.getCurrentUrl()} does not end with ${DETAILEDVIEWPATTERN}.`);
        }
    }

    private showOrReplaceCommentsToggle(hidden: boolean) {
        HtmlUtils.remove('#comments-toggle');
        const toggle = document.createElement('a');
        toggle.id = 'comments-toggle';
        toggle.style.cursor = 'pointer';
        toggle.innerText = (hidden === true) ? 'Kommentar ohne Inhalt anzeigen' : 'Kommentare ohne Inhalt ausblenden';
        toggle.onclick = () => this.onCommentsToggle();
        HtmlUtils.appendAfter(HtmlUtils.findFirst('#history h3'), toggle);
    }

    private showOrHideComments(hidden: boolean) {
        if (hidden === true) {
            HtmlUtils.applyCss(HIDDENCOMMENTS_SELECTOR, HIDDENCOMMENTS_CSS);
        } else {
            HtmlUtils.applyCss(HIDDENCOMMENTS_SELECTOR, UNHIDDENCOMMENTS_CSS);
        }
    }

    private async onCommentsToggle() {
        console.log('toggle clicked');
        const settings = await SettingsLoader.load(Settings);
        settings.hiddenComments = !settings.hiddenComments;
        SettingsLoader.save(settings);
        this.showOrReplaceCommentsToggle(settings.hiddenComments);
        this.showOrHideComments(settings.hiddenComments);
    }

}

new CommentsToggler().main();
