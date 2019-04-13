import { Settings } from '../shared/entities/settings';
import { Domready } from '../shared/utils/domready-dynamic';
import { HtmlUtils } from '../shared/utils/html-utils';
import { SettingsLoader } from '../shared/utils/settings-loader';
import { UrlUtils } from '../shared/utils/url-utils';

const DETAILEDVIEWPATTERN = '.*\/issues\/[0-9]+$';
const HIDDENCOMMENTS_SELECTOR = 'div[id^="change-"]:not(".has-notes")';
const HIDDENCOMMENTS_CSS = { display: 'none' };
const UNHIDDENCOMMENTS_CSS = { display: 'inline' };

export class CommentsToggler {

    public async main() {
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
        await SettingsLoader.save(settings);
        this.showOrReplaceCommentsToggle(settings.hiddenComments);
        this.showOrHideComments(settings.hiddenComments);
    }

}

Domready.onReady(async () => new CommentsToggler().main());
