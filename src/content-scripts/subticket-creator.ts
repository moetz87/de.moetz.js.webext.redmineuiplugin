import { Settings } from '../shared/entities/settings';
import { Domready } from '../shared/utils/domready-dynamic';
import { HtmlUtils } from '../shared/utils/html-utils';
import { SettingsLoader } from '../shared/utils/settings-loader';
import { UrlUtils } from '../shared/utils/url-utils';

const URL_PATTERN_COPYVIEW = '.*(\\/issues\\/)(\\d+)(\\/copy).*';
const URL_PATTERN_FEATUREVIEW = '.*(\\/issues\\/)(\\d+)$';
const URL_PARAM_NEWSUBTICKET = 'newSubticket';
const SELECTOR_DUPLICATE_BUTTON = 'a:contains("Kopieren")';
const SELECTOR_FEATURE_HEADER = 'h2:contains("Feature"), h2:contains("Kundenfeedback")';
const PARENT_ID_REGEX = /^.*issues\/(\d+)\/copy$/g;

export class SubticketCreator {

    public async main() {
        const settings = await SettingsLoader.load(Settings);
        if (!UrlUtils.currentUrlMatchesRegex(`${settings.baseUrl}.*`)) {
            return;
        }
        if (this.currentPageShowsNewSubticket()) {
            this.tryTo(() => HtmlUtils.findFirst<HTMLSelectElement>('#issue_tracker_id').value = '5');
            this.tryTo(() => HtmlUtils.findFirst<HTMLSelectElement>('#issue_status_id').value = '1');
            this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#issue_parent_issue_id').value = this.getParentId());
            this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#link_copy').checked = false);
            this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#copy_attachments').checked = false);
            this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#copy_subtasks').checked = false);
            this.tryTo(() => this.fireOnChangeEvent(HtmlUtils.findFirst<HTMLSelectElement>('#issue_tracker_id')));
            return;
        }
        if (this.currentPageShowsFeature()) {
            this.includeNewSubticketButton();
            return;
        }
    }

    private tryTo(execution: () => void) {
        try {
            execution();
            // tslint:disable-next-line:no-empty
        } catch (e) { }
    }

    private currentPageShowsNewSubticket(): boolean {
        const isCopyView = UrlUtils.currentUrlMatchesRegex(URL_PATTERN_COPYVIEW);
        const isNewSubticketView = new URL(window.location.href).searchParams.get(URL_PARAM_NEWSUBTICKET) != null;
        return (isCopyView && isNewSubticketView);
    }

    private currentPageShowsFeature(): boolean {
        const isDetailedView = UrlUtils.currentUrlMatchesRegex(URL_PATTERN_FEATUREVIEW);
        const showsFeature = HtmlUtils.find(SELECTOR_FEATURE_HEADER).length !== 0;
        return (isDetailedView && showsFeature);
    }

    private includeNewSubticketButton() {
        const duplicateElement = HtmlUtils.findFirst<HTMLAnchorElement>(SELECTOR_DUPLICATE_BUTTON);
        const subticketButton = document.createElement('a');
        subticketButton.innerText = 'Neue Karte';
        subticketButton.href = `${duplicateElement.getAttribute('href')}?${URL_PARAM_NEWSUBTICKET}`;
        subticketButton.style.cursor = 'pointer';
        subticketButton.className = 'icon icon-duplicate';
        // tslint:disable-next-line:no-non-null-assertion
        duplicateElement.parentElement!.appendChild(subticketButton);
    }

    private getParentId(): string {
        const url = UrlUtils.getCurrentUrl();
        const matches = PARENT_ID_REGEX.exec(url);
        return (matches != null) ? matches[1] : '';
    }

    private fireOnChangeEvent(element: HTMLSelectElement) {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        element.dispatchEvent(event);
    }

}

Domready.onReady(async () => new SubticketCreator().main());
