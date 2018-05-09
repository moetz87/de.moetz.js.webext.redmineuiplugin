import { Settings } from '../shared/model/settings';
import { RuleElementCreator } from '../shared/rule-element-creator';
import { Rule } from '../shared/model/rule';
import * as jQuery from 'jquery';

export class UserInterface {

    private readonly urlField = <HTMLInputElement>document.getElementById('urlField');
    private readonly rulesAnchor = <HTMLDivElement>document.getElementById('rules');
    private readonly messager = <HTMLElement>document.getElementById('messager');
    private onChangeListener: (() => void)[] = [];
    private onRuleDeleteHandler: ((id: string) => void)[] = [];
    private onRuleMoveUpHandler: ((id: string) => void)[] = [];
    private onRuleMoveDownHandler: ((id: string) => void)[] = [];

    constructor(
        private readonly ruleElementCreator: RuleElementCreator) {
        this.urlField.onchange = this.rulesAnchor.onchange =
            () => this.onChangeListener.forEach(callback => callback());
    }

    public setSettings = (settings: Settings) => {
        this.urlField.value = settings.url;
        this.showRulesOnUI(settings.rules);
    }

    public getSettings(): Settings {
        return new Settings(
            this.urlField.value,
            this.readRulesFromUI()
        );
    }

    public registerOnChangeListener(callback: () => void) {
        this.onChangeListener.push(callback);
    }

    public registerOnRuleDeleteHandler(callback: (id: string) => void) {
        this.onRuleDeleteHandler.push(callback);
    }

    public registerOnRuleMoveUpHandler(callback: (id: string) => void) {
        this.onRuleMoveUpHandler.push(callback);
    }

    public registerOnRuleMoveDownHandler(callback: (id: string) => void) {
        this.onRuleMoveDownHandler.push(callback);
    }

    public showMessage(message: string) {
        this.messager.innerText = message;
        this.messager.className = '';
        this.messager.style.display = 'block';
        setTimeout(() => this.messager.style.display = 'none', 2500);
    }

    public showErrorMessage(message: string) {
        this.showMessage(message);
        this.messager.className = 'error';
    }

    private showRulesOnUI(rules: Rule[]) {
        jQuery(this.rulesAnchor).empty();
        rules.forEach(rule => this.rulesAnchor.appendChild(
            this.ruleElementCreator.createRuleElement(rule,
                () => this.onRuleMoveUpHandler.forEach(callback => callback(rule.id)),
                () => this.onRuleMoveDownHandler.forEach(callback => callback(rule.id)),
                () => this.onRuleDeleteHandler.forEach(callback => callback(rule.id)))
        ));
    }

    private readRulesFromUI(): Rule[] {
        const rules: Rule[] = [];
        jQuery(this.rulesAnchor).find('.ruleId').each((index, element) => {
            const id = element.id;
            const note = jQuery(`#${id}-note`).first().val() as string;
            const selector = jQuery(`#${id}-selector`).first().val() as string;
            const css = JSON.parse(jQuery(`#${id}-css`).first().val() as string);
            rules.push(new Rule(id, note, selector, css));
        });
        return rules;
    }

}
