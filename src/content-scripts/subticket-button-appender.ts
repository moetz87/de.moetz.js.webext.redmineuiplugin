import { Domready } from '../shared/utils/domready-dynamic';
import { HtmlUtils } from '../shared/utils/html-utils';

const SELECTOR_DUPLICATE_BUTTON = 'a:contains("Kopieren")';

export class SubticketButtonAppender {

    public async main() {
        const duplicateElement = HtmlUtils.findFirst<HTMLAnchorElement>(SELECTOR_DUPLICATE_BUTTON);
        const subticketButton = document.createElement('a');
        subticketButton.innerText = 'Neue Karte';
        subticketButton.href = `${duplicateElement.getAttribute('href')}?newSubticket`;
        subticketButton.style.cursor = 'pointer';
        subticketButton.className = 'icon icon-duplicate';
        // tslint:disable-next-line:no-non-null-assertion
        duplicateElement.parentElement!.appendChild(subticketButton);
    }

}

Domready.onReady(async () => new SubticketButtonAppender().main());
