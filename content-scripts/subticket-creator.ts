import { HtmlUtils } from 'ts-common/html-utils';
import { UrlUtils } from 'ts-common/url-utils';
import { WebextMain } from 'ts-common/webext-main';

const URL_PATTERN_COPYVIEW = '.*(\\/issues\\/)(\\d+)(\\/copy).*';
const URL_PATTERN_FEATUREVIEW = '.*(\\/issues\\/)(\\d+)$';
const URL_PARAM_NEWSUBTICKET = 'newSubticket';
const SELECTOR_DUPLICATE_BUTTON = 'a:contains("Duplizieren")';
const SELECTOR_FEATURE_HEADER = 'h2:contains("Feature"), h2:contains("Kundenfeedback")';
const PARENT_ID_REGEX = /^.*issues\/(\d+)\/copy$/g;

export class SubticketCreator extends WebextMain {

    public async onExecuteMain() {
        if (this.currentPageShowsNewSubticket()) {
            console.debug('Current Page shows new Subticket');
            HtmlUtils.findFirst<HTMLSelectElement>('#issue_tracker_id').value = '5';
            HtmlUtils.findFirst<HTMLSelectElement>('#issue_status_id').value = '1';
            HtmlUtils.findFirst<HTMLInputElement>('#issue_parent_issue_id').value = this.getParentId();
            this.fireOnChangeEvent(HtmlUtils.findFirst<HTMLSelectElement>('#issue_tracker_id'));
            return;
        }
        if (this.currentPageShowsFeature()) {
            console.debug('Current Page shows Feature');
            this.includeNewSubticketButton();
            return;
        }
    }

    private currentPageShowsNewSubticket(): boolean {
        const isCopyView = UrlUtils.currentUrlMatchesRegex(URL_PATTERN_COPYVIEW);
        const isNewSubticketView = new URL(window.location.href).searchParams.get(URL_PARAM_NEWSUBTICKET) != null;
        const result = (isCopyView && isNewSubticketView);
        console.debug(`currentPageShowsNewSubticket? ${result}`);
        return result;
    }

    private currentPageShowsFeature(): boolean {
        const isDetailedView = UrlUtils.currentUrlMatchesRegex(URL_PATTERN_FEATUREVIEW);
        const showsFeature = HtmlUtils.find(SELECTOR_FEATURE_HEADER).length !== 0;
        const result = (isDetailedView && showsFeature);
        console.debug(`currentPageShowsFeature? ${result}`);
        return result;
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
        const parentId = (matches != null) ? matches[1] : '';
        console.debug(`Parent-ID: ${parentId}`);
        return parentId;
    }

    private fireOnChangeEvent(element: HTMLSelectElement) {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        element.dispatchEvent(event);
        console.debug('Event fired');
    }

}

new SubticketCreator().main();
