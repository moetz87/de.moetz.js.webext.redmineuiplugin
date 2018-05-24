import { Rule } from '../shared/model/rule';
import { Settings } from '../shared/model/settings';
import { find, findFirst, removeChildren } from '../shared/utils/html-utils';
import { RuleElementCreator } from './rule-element-creator';

export class UserInterface {

    private readonly urlField = findFirst<HTMLInputElement>('#urlField');
    private readonly rulesAnchor = findFirst<HTMLDivElement>('#rulesanchor');
    private readonly addRuleButton = findFirst<HTMLElement>('#addRuleBtn');
    private readonly messager = findFirst<HTMLElement>('#messager');
    private onChangeListener: (() => void)[] = [];
    private onRuleDeleteHandler: ((id: string) => void)[] = [];
    private onRuleMoveUpHandler: ((id: string) => void)[] = [];
    private onRuleMoveDownHandler: ((id: string) => void)[] = [];
    private onRuleAddHandler: (() => void)[] = [];

    constructor(
        private readonly ruleElementCreator: RuleElementCreator
    ) {
        this.urlField.onchange = this.rulesAnchor.onchange =
            () => this.onChangeListener.forEach(callback => callback());
        this.addRuleButton.onclick = () => this.onRuleAddHandler.forEach(callback => callback());
    }

    public setSettings = (settings: Settings) => {
        this.urlField.value = settings.url;
        this.setRulesToUI(settings.rules);
    }

    public getSettings(): Settings {
        return new Settings(
            this.urlField.value,
            this.getRulesFromUI()
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

    public registerOnRuleAddHandler(callback: () => void) {
        this.onRuleAddHandler.push(callback);
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

    private setRulesToUI(rules: Rule[]) {
        removeChildren(this.rulesAnchor);
        rules.forEach(rule => this.rulesAnchor.appendChild(
            this.ruleElementCreator.createRuleElement(
                rule,
                () => this.onRuleMoveUpHandler.forEach(callback => callback(rule.id)),
                () => this.onRuleMoveDownHandler.forEach(callback => callback(rule.id)),
                () => this.onRuleDeleteHandler.forEach(callback => callback(rule.id)))
        ));
    }

    private getRulesFromUI(): Rule[] {
        const rules: Rule[] = [];
        find('.ruleId').forEach(element => {
            const id = element.id;
            const enabled = findFirst<HTMLInputElement>(`#${id}-enabled`).checked !== false;
            const note = findFirst<HTMLInputElement>(`#${id}-note`).value;
            const selector = findFirst<HTMLInputElement>(`#${id}-selector`).value;
            const css = JSON.parse(findFirst<HTMLInputElement>(`#${id}-css`).value);
            rules.push(new Rule(id, note, selector, css, enabled));
        });
        return rules;
    }

}
