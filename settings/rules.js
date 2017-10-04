"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setting_1 = require("./setting");
const jquery = require("jquery");
const UUID = require("uuid");
const messager_1 = require("./messager");
class Rules extends setting_1.Setting {
    constructor(childOfId) {
        super();
        this._rules = [];
        this._childOfId = childOfId;
    }
    get name() {
        return 'rules';
    }
    get rules() {
        return this._rules;
    }
    toJson() {
        return this._rules;
    }
    fromJson(json) {
        this._rules = [];
        json.forEach((element) => {
            let rule = Rule.fromJson(element);
            this.rules.push(rule);
        });
    }
    createDefault() {
        this._rules = DEFAULTRULES;
    }
    render() {
        jquery(this._childOfId).empty();
        this.rules.forEach((rule) => {
            let element = rule.createElement();
            element.find('#delbtn').on('click', () => this.remove(rule));
            element.find('#upbtn').on('click', () => this.up(rule));
            element.find('#downbtn').on('click', () => this.down(rule));
            element.find('input').on('input', () => rule.selector = String(element.find('input').val()));
            element.find('textarea').on('input', () => rule.css = String(element.find('textarea').val()));
            element.appendTo(jquery(this._childOfId));
        });
    }
    add(rule) {
        this.rules.push(rule);
        this.render();
    }
    remove(rule) {
        this.rules.splice(this.rules.indexOf(rule), 1);
        this.render();
        messager_1.Messager.success('Rule ' + rule.uuid + ' deleted', 1000);
    }
    up(rule) {
        let index = this.rules.indexOf(rule);
        if (index == 0) {
            return;
        }
        let tmp = this.rules[index - 1];
        this.rules[index - 1] = rule;
        this.rules[index] = tmp;
        this.render();
    }
    down(rule) {
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
exports.Rules = Rules;
class Rule {
    constructor(selector, css) {
        this._uuid = UUID.v4();
        this._selector = selector;
        this._css = css;
    }
    static fromJson(json) {
        let rule = Object.create(Rule.prototype);
        return Object.assign(rule, json);
    }
    static createDefault() {
        return new Rule('', {});
    }
    get uuid() {
        return this._uuid;
    }
    get selector() {
        return this._selector;
    }
    set selector(selector) {
        this._selector = selector;
    }
    get css() {
        return JSON.stringify(this._css);
    }
    set css(css) {
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
exports.Rule = Rule;
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
