import { HtmlUtils } from 'ts-common/html-utils';
import { SettingsLoader } from 'ts-common/settings-loader';
import { UrlUtils } from 'ts-common/url-utils';
import { WebextMain } from 'ts-common/webext-main';
import { Settings } from '../shared/model/settings';

const URL_PATTERN_OVERVIEW = '.*(\\/projects).*(\\/issues).*';
const CUSTOM_FIELD_KP = 'cf_10';
const KP_HEADER_SELECTOR = 'a:contains("Komplexitätspunkte")';

export class KPCalculator extends WebextMain {

    public async onExecuteMain() {
        const settings = await SettingsLoader.load(Settings);
        if (UrlUtils.currentUrlMatchesRegex(settings.url) && UrlUtils.currentUrlMatchesRegex(URL_PATTERN_OVERVIEW)) {
            const kpSum = this.calculateKPs(`.${CUSTOM_FIELD_KP}`);
            this.showKPSum(kpSum);
        } else {
            console.debug(`URL ${UrlUtils.getCurrentUrl()} not matching pattern ${URL_PATTERN_OVERVIEW} or ${settings.url}.`);
        }
    }

    private calculateKPs(selector: string): number {
        const elements = HtmlUtils.find(selector);
        return elements.map(e => Number(e.textContent)).reduce((a, b) => a + b);
    }

    private showKPSum(sum: number) {
        const header = HtmlUtils.findFirst<HTMLAnchorElement>(KP_HEADER_SELECTOR);
        // tslint:disable-next-line:no-inner-html
        header.innerHTML = `${header.innerText}<br>(Gesamt: ${sum})`;
    }

}

new KPCalculator().main();
