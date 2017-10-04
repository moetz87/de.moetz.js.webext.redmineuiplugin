import { Rules, Rule } from "./rules";
import { URL } from "./url";
import * as jquery from 'jquery';


export class Main {

    static main() {
        let rules = new Rules('#rulesanchor');
        rules.load().then(() => rules.render());
        jquery('#button-addrule').on('click', () => rules.add(Rule.createDefault()));
        jquery('#button-saverules').on('click', () => rules.save());

        let url = new URL('#urlanchor');
        url.load().then(() => url.render());
        jquery('#button-savesettings').on('click', () => url.save());
    }

}

Main.main();
