"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rules_1 = require("./rules");
const url_1 = require("./url");
const jquery = require("jquery");
class Main {
    static main() {
        let rules = new rules_1.Rules('#rulesanchor');
        rules.load().then(() => rules.render());
        jquery('#button-addrule').on('click', () => rules.add(rules_1.Rule.createDefault()));
        jquery('#button-saverules').on('click', () => rules.save());
        let url = new url_1.URL('#urlanchor');
        url.load().then(() => url.render());
        jquery('#button-savesettings').on('click', () => url.save());
    }
}
exports.Main = Main;
Main.main();
