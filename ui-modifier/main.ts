import { Rules } from "../settings/rules";
import { URL } from "../settings/url";
import * as jquery from "jquery";


export class Main {

    static main() {
        let url = new URL();
        url.load().then(() => {
            let regex = new RegExp(url.urlPattern, 'g');
            let currentUrl = window.location.href;
            if (regex.test(currentUrl)) {
                console.log('matches');
                let rules = new Rules();
                rules.load().then(() => rules.rules.forEach(rule => jquery(rule.selector).css(JSON.parse(rule.css))));
            } else {
                console.log('matches not');
            }
        });
    }

}

Main.main();