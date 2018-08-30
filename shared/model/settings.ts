import * as UUIDv4 from 'uuid/v4';
import { Rule } from './rule';

export class Settings {

    constructor(
        // tslint:disable-next-line:no-http-string
        public url = 'http://redmine/redmine',
        public rules: Rule[] = DEFAULTRULES,
        public hiddenComments = false) {

    }

    // tslint:disable-next-line:function-name
    public static fromJson(json: any): Settings {
        const settings = Object.assign(new Settings(), json);
        this.migrate_v101_v102(settings);
        return settings;
    }

    private static migrate_v101_v102(settings: Settings) {
        settings.rules
            .filter(rule => rule.enabled == null)
            .forEach(rule => rule.enabled = true);
    }

}

const DEFAULTRULES = [
    new Rule(
        UUIDv4(),
        'Grüne Färbung für Tickets mit Status "In Bearbeitung"',
        'td.status:contains("In Bearbeitung")',
        { 'color': '#278753' },
        true),
    new Rule(
        UUIDv4(),
        'Rote Färbung und Fettdruck für Tickets mit Status "Gelöst"',
        'td.status:contains("Gelöst")',
        { 'font-weight': 'bold', 'color': '#f44242' },
        true),
    new Rule(
        UUIDv4(),
        'Ausgrauen von Tickets mit Status "Erledigt"',
        'tr:has(td.status:contains("Erledigt"))',
        { 'opacity': '0.5' },
        true),
    new Rule(
        UUIDv4(),
        'Hervorheben des Tickets, das ich in Bearbeitung habe',
        'tr:has(td.status:contains("In Bearbeitung")):has(td.assigned_to:contains("Marco Oetz"))',
        { 'background-color': '#d3e0ed' },
        true)
];
