import { Setting } from "./setting";
import * as jquery from 'jquery';
import * as UUID from "uuid";
import { Messager } from "./messager";



export class Rules extends Setting {

    private _rules: Rule[];
    private _childOfId: string | undefined;

    constructor(childOfId?: string) {
        super();
        this._rules = [];
        this._childOfId = childOfId;
    }

    get name(): string {
        return 'rules';
    }

    get rules(): Rule[] {
        return this._rules;
    }

    toJson(): any {
        return this._rules;
    }

    fromJson(json: any): void {
        this._rules = [];
        json.forEach((element: any) => {
            let rule = Rule.fromJson(element);
            this.rules.push(rule);
        });
    }

    createDefault(): void {
        this._rules = DEFAULTRULES;
    }

    render() {
        jquery(this._childOfId).empty();
        this.rules.forEach((rule: Rule) => {
            let element = rule.createElement();
            element.find('#delbtn').on('click', () => this.remove(rule));
            element.find('#upbtn').on('click', () => this.up(rule));
            element.find('#downbtn').on('click', () => this.down(rule));
            element.find('input').on('input', () => rule.selector = String(element.find('input').val()));
            element.find('textarea').on('input', () => rule.css = String(element.find('textarea').val()));
            element.appendTo(jquery(this._childOfId));
        });
    }

    add(rule: Rule) {
        this.rules.push(rule);
        this.render();
    }

    remove(rule: Rule) {
        this.rules.splice(this.rules.indexOf(rule), 1)
        this.render();
        Messager.success('Rule ' + rule.uuid + ' deleted', 1000);
    }

    private up(rule: Rule): void {
        let index = this.rules.indexOf(rule);
        if (index == 0) {
            return;
        }
        let tmp = this.rules[index - 1];
        this.rules[index - 1] = rule;
        this.rules[index] = tmp;
        this.render();
    }

    private down(rule: Rule): void {
        let index = this.rules.indexOf(rule);
        if (index == this.rules.length - 1) {
            return;
        }
        let tmp = this.rules[index + 1];
        this.rules[index + 1] = rule;
        this.rules[index] = tmp;
        this.render();
    }

}



export class Rule {

    private _uuid: string;
    private _selector: string;
    private _css: any;

    constructor(selector: string, css: any) {
        this._uuid = UUID.v4();
        this._selector = selector;
        this._css = css;
    }

    static fromJson(json: any): Rule {
        let rule = Object.create(Rule.prototype);
        return Object.assign(rule, json);
    }

    static createDefault() {
        return new Rule('', {});
    }

    get uuid(): string {
        return this._uuid;
    }

    get selector(): string {
        return this._selector;
    }

    set selector(selector: string) {
        this._selector = selector;
    }

    get css(): string {
        return JSON.stringify(this._css);
    }

    set css(css: string) {
        this._css = JSON.parse(css);
    }

    createElement() {
        var stub = '<div class="rule">';
        stub = stub + '<div class="ruleheader"><p>Rule ${id}</p><button id="delbtn">Delete</button><button id="upbtn">&uarr;</button><button id="downbtn">&darr;</button></div>';
        stub = stub + '<div class="label">jQuery-Selector:</div><div class="value"><input type="text"></div>';
        stub = stub + '<div class="label">CSS (as JSON):</div><div class="value"><textarea type="text"></textarea></div>';
        stub = stub + '</div>';
        stub = stub.replace(new RegExp('\\$\\{id\\}', 'g'), this.uuid);

        var element = jquery(stub);
        element.find('input').val(this.selector);
        element.find('textarea').val(this.css);
        return element;
    }

}



const DEFAULTRULES = [
    new Rule('td.status:contains("In Bearbeitung")', {
        'color': '#278753'
    }),
    new Rule('td.status:contains("Gelöst")', {
        'font-weight': 'bold',
        'color': '#f44242'
    }),
    new Rule('tr:has(td.status:contains("Erledigt"))', {
        'opacity': '0.5'
    }),
    new Rule('tr:has(td.status:contains("In Bearbeitung")):has(td.assigned_to:contains("Marco Oetz"))', {
        'background-color': '#d3e0ed'
    })
];