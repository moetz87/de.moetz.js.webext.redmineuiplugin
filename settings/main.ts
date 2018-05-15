import { AbstractMain } from '../shared/abstract-main';
import { Rule } from '../shared/model/rule';
import { Settings } from '../shared/model/settings';
import { RuleElementCreator } from '../shared/rule-element-creator';
import { SettingsLoader } from '../shared/utils/settings-loader';
import { UserInterface } from './user-interface';

export class Main extends AbstractMain {

    constructor(
        readonly ui: UserInterface,
        readonly settingsLoader: SettingsLoader) {
        super();
    }

    public onExecuteMain() {
        this.ui.registerOnChangeListener(() => this.saveSettingsFromUI());
        this.ui.registerOnRuleDeleteHandler(id => this.deleteRule(id));
        this.ui.registerOnRuleMoveUpHandler(id => this.moveRuleUp(id));
        this.ui.registerOnRuleMoveDownHandler(id => this.moveRuleDown(id));
        this.ui.registerOnRuleAddHandler(() => this.addRule());
        this.settingsLoader.load().then(this.ui.setSettings);
    }

    private saveSettingsFromUI() {
        this.saveSettings(this.ui.getSettings());
    }

    private saveSettings(settings: Settings) {
        this.settingsLoader.save(settings)
            .then(() => this.ui.showMessage('Einstellungen erfolgreich gespeichert.'))
            .catch(error => this.ui.showErrorMessage(`Fehler beim Speichern von Einstellungen: ${error}.`));
    }

    private async addRule() {
        const settings = await this.settingsLoader.load();
        settings.rules.push(Rule.empty());
        this.saveSettings(settings);
        this.ui.setSettings(settings);
    }

    private async deleteRule(id: string) {
        const settings = await this.settingsLoader.load();
        settings.rules = settings.rules.filter(rule => rule.id !== id);
        this.saveSettings(settings);
        this.ui.setSettings(settings);
    }

    private async moveRuleUp(id: string) {
        const settings = await this.settingsLoader.load();
        const rules = settings.rules;
        const index = rules.findIndex(rule => rule.id === id);
        if (rules.length > 1 && index !== 0) {
            const tmp = rules[index - 1];
            rules[index - 1] = rules[index];
            rules[index] = tmp;
            this.saveSettings(settings);
            this.ui.setSettings(settings);
        }
    }

    private async moveRuleDown(id: string) {
        const settings = await this.settingsLoader.load();
        const rules = settings.rules;
        const index = rules.findIndex(rule => rule.id === id);
        if (rules.length > 1 && index !== rules.length - 1) {
            const tmp = rules[index + 1];
            rules[index + 1] = rules[index];
            rules[index] = tmp;
            this.saveSettings(settings);
            this.ui.setSettings(settings);
        }
    }

}

new Main(
    new UserInterface(
        new RuleElementCreator()
    ),
    new SettingsLoader()
).main();
