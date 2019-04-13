import { Settings } from '../shared/entities/settings';
import { Domready } from '../shared/utils/domready-dynamic';
import { HtmlUtils } from '../shared/utils/html-utils';
import { SettingsLoader } from '../shared/utils/settings-loader';
import { UrlUtils } from '../shared/utils/url-utils';

const URL_PATTERN_OVERVIEW = '.*(\\/projects).*(\\/issues).*';
const CUSTOM_FIELD_KP = 'cf_10';
const KP_HEADER_SELECTOR = 'a:contains("Komplexitätspunkte")';

export class KPCalculator {

    public async main() {
        const settings = await SettingsLoader.load(Settings);
        if (UrlUtils.currentUrlMatchesRegex(`${settings.baseUrl}.*${URL_PATTERN_OVERVIEW}`)) {
            const kpSum = this.calculateKPs(`.${CUSTOM_FIELD_KP}`);
            if (kpSum) {
                this.showKPSum(kpSum);
            }
        }
    }

    private calculateKPs(selector: string): number | undefined {
        const elements = HtmlUtils.find(selector);
        if (elements.length === 0) {
            return undefined;
        }
        return elements.map(e => Number(e.textContent)).reduce((a, b) => a + b);
    }

    private showKPSum(sum: number) {
        const header = HtmlUtils.findFirst<HTMLAnchorElement>(KP_HEADER_SELECTOR);
        // tslint:disable-next-line:no-inner-html
        header.innerHTML = `${header.innerText}<br>(Gesamt: ${sum})`;
    }

}

Domready.onReady(async () => new KPCalculator().main());
