import * as UUIDv4 from 'uuid/v4';
import { Rule } from './rule';

export class Settings {

    constructor(
        public url = 'http://localhost:80',
        public rules: Rule[] = DEFAULTRULES) {

    }

    public static fromJson(json: any): Settings {
        return Object.assign(new Settings(), json);
    }

}

const DEFAULTRULES = [
    new Rule(
        UUIDv4(),
        'Grüne Färbung für Tickets mit Status "In Bearbeitung"',
        'td.status:contains("In Bearbeitung")',
        { 'color': '#278753' }),
    new Rule(
        UUIDv4(),
        'Rote Färbung und Fettdruck für Tickets mit Status "Gelöst"',
        'td.status:contains("Gelöst")',
        { 'font-weight': 'bold', 'color': '#f44242' }),
    new Rule(
        UUIDv4(),
        'Ausgrauen von Tickets mit Status "Erledigt"',
        'tr:has(td.status:contains("Erledigt"))',
        { 'opacity': '0.5' }),
    new Rule(
        UUIDv4(),
        'Hervorheben des Tickets, das ich in Bearbeitung habe',
        'tr:has(td.status:contains("In Bearbeitung")):has(td.assigned_to:contains("Marco Oetz"))',
        { 'background-color': '#d3e0ed' }),
    new Rule(
        UUIDv4(),
        'Ausgrauen von Kommentaren, die lediglich Statusänderungen vorgenommen haben',
        'div[id^="change-"]:not(".has-notes")',
        { 'opacity': '0.25' })
];
