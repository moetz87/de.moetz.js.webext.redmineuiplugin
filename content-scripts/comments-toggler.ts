import { HtmlUtils } from 'ts-common/html-utils';
import { SettingsLoader } from 'ts-common/settings-loader';
import { UrlUtils } from 'ts-common/url-utils';
import { WebextMain } from 'ts-common/webext-main';
import { Settings } from '../shared/entities/settings';

const DETAILEDVIEWPATTERN = '.*\/issues\/[0-9]+$';
const HIDDENCOMMENTS_SELECTOR = 'div[id^="change-"]:not(".has-notes")';
const HIDDENCOMMENTS_CSS = { display: 'none' };
const UNHIDDENCOMMENTS_CSS = { display: 'inline' };

export class CommentsToggler extends WebextMain {

    public async onExecuteMain() {
        const settings = await SettingsLoader.load(Settings);
        if (UrlUtils.currentUrlMatchesRegex(`${settings.baseUrl}.*${DETAILEDVIEWPATTERN}`)) {
            this.showOrReplaceCommentsToggle(settings.hiddenComments);
            this.showOrHideComments(settings.hiddenComments);
        }
    }

    private showOrReplaceCommentsToggle(hidden: boolean) {
        HtmlUtils.remove('#comments-toggle');
        const toggle = document.createElement('a');
        toggle.id = 'comments-toggle';
        toggle.style.cursor = 'pointer';
        toggle.style.display = 'inline';
        toggle.innerText = (hidden === true) ? 'Kommentare ohne Inhalt anzeigen' : 'Kommentare ohne Inhalt ausblenden';
        toggle.onclick = () => this.onCommentsToggle();

        const header = HtmlUtils.findFirst<HTMLElement>('#history h3');
        header.style.display = 'inline-block';
        HtmlUtils.appendAfter(header, toggle);
    }

    private showOrHideComments(hidden: boolean) {
        if (hidden === true) {
            HtmlUtils.applyCss(HIDDENCOMMENTS_SELECTOR, HIDDENCOMMENTS_CSS);
        } else {
            HtmlUtils.applyCss(HIDDENCOMMENTS_SELECTOR, UNHIDDENCOMMENTS_CSS);
        }
    }

    private async onCommentsToggle() {
        const settings = await SettingsLoader.load(Settings);
        settings.hiddenComments = !settings.hiddenComments;
        SettingsLoader.save(settings);
        this.showOrReplaceCommentsToggle(settings.hiddenComments);
        this.showOrHideComments(settings.hiddenComments);
    }

}

new CommentsToggler().main();
