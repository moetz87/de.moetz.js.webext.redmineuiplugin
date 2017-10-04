"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rules_1 = require("../settings/rules");
const url_1 = require("../settings/url");
const jquery = require("jquery");
class Main {
    static main() {
        let url = new url_1.URL();
        url.load().then(() => {
            let regex = new RegExp(url.urlPattern, 'g');
            let currentUrl = window.location.href;
            if (regex.test(currentUrl)) {
                console.log('matches');
                let rules = new rules_1.Rules();
                rules.load().then(() => rules.rules.forEach(rule => jquery(rule.selector).css(JSON.parse(rule.css))));
            }
            else {
                console.log('matches not');
            }
        });
    }
}
exports.Main = Main;
Main.main();
