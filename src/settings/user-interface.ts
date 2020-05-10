import { Rule } from '../shared/entities/rule';
import { Settings } from '../shared/entities/settings';
import { Messager } from '../shared/messager';
import { HtmlUtils } from '../shared/utils/html-utils';
import { SettingsLoader } from '../shared/utils/settings-loader';
import { RuleElementCreator } from './rule-element-creator';

export class UserInterface {

    private readonly rulesAnchor = HtmlUtils.findFirst<HTMLDivElement>('#rulesanchor');
    private readonly addRuleButton = HtmlUtils.findFirst<HTMLElement>('#addRuleBtn');
    private readonly saveButton = HtmlUtils.findFirst<HTMLButtonElement>('#savebutton');

    constructor(private readonly ruleElementCreator: RuleElementCreator) {
        this.addRuleButton.onclick = () => this.addRule();
        this.saveButton.onclick = () => this.save();
    }

    public setSettings(settings: Settings) {
        this.setRules(settings.rules);
    }

    public async getSettings(): Promise<Settings> {
        const settings = await SettingsLoader.load(Settings);
        settings.rules = this.getRules();
        return settings;
    }

    public addRule() {
        const rules = this.getRules();
        rules.push(Rule.empty());
        this.setRules(rules);
    }

    public deleteRule(id: string) {
        const rules = this.getRules().filter(rule => rule.id !== id);
        this.setRules(rules);
    }

    public moveRuleUp(id: string) {
        const rules = this.getRules();
        const index = rules.findIndex(rule => rule.id === id);
        if (rules.length > 1 && index !== 0) {
            const tmp = rules[index - 1];
            rules[index - 1] = rules[index];
            rules[index] = tmp;
            this.setRules(rules);
        }
    }

    public moveRuleDown(id: string) {
        const rules = this.getRules();
        const index = rules.findIndex(rule => rule.id === id);
        if (rules.length > 1 && index !== rules.length - 1) {
            const tmp = rules[index + 1];
            rules[index + 1] = rules[index];
            rules[index] = tmp;
            this.setRules(rules);
        }
    }

    public async save() {
        const settings = await this.getSettings();
        SettingsLoader.save(settings)
            .then(() => {
                Messager.showMessage('Erfolg', 'Einstellungen gespeichert.');
                this.setRules(settings.rules);
            })
            .catch((error) => Messager.showMessage('Fehler', `Fehler beim Speichern der Einstellungen.\n${error}`));
    }

    private getRules(): Rule[] {
        const rules: Rule[] = [];
        HtmlUtils.find('div[rule]').forEach(element => {
            const id = element.getAttribute('rule');
            const enabled = HtmlUtils.findFirst<HTMLInputElement>(`#${id}-enabled`).checked !== false;
            const note = HtmlUtils.findFirst<HTMLInputElement>(`#${id}-note`).value;
            const selector = HtmlUtils.findFirst<HTMLInputElement>(`#${id}-selector`).value;
            const css = this.getJson(note, `#${id}-css`);
            rules.push(new Rule(id, note, selector, css, enabled));
        });
        return rules;
    }

    private getJson(rulename: string, selector: string): any {
        const value = HtmlUtils.findFirst<HTMLInputElement>(selector).value;
        try {
            return JSON.parse(value);
        } catch (e) {
            Messager.showMessage('Fehler', `Regel "${rulename}" enthält fehlerhaftes JSON:\n${e}`);
            throw e;
        }
    }

    private setRules(rules: Rule[]) {
        HtmlUtils.removeChildren(this.rulesAnchor);
        rules.forEach(rule => {
            const ruleElement = this.ruleElementCreator.createRuleElement(
                rule,
                () => this.moveRuleUp(rule.id),
                () => this.moveRuleDown(rule.id),
                () => this.deleteRule(rule.id)
            );
            this.rulesAnchor.appendChild(ruleElement);
        });
    }

}
