import { SettingsLoader } from 'ts-common/settings-loader';
import { WebextMain } from 'ts-common/webext-main';
import { Rule } from '../shared/model/rule';
import { Settings } from '../shared/model/settings';
import { RuleElementCreator } from './rule-element-creator';
import { UserInterface } from './user-interface';

export class Main extends WebextMain {

    constructor(
        readonly ui: UserInterface
    ) {
        super();
    }

    public onExecuteMain() {
        this.ui.registerOnChangeListener(() => this.saveSettingsFromUI());
        this.ui.registerOnRuleDeleteHandler(id => this.deleteRule(id));
        this.ui.registerOnRuleMoveUpHandler(id => this.moveRuleUp(id));
        this.ui.registerOnRuleMoveDownHandler(id => this.moveRuleDown(id));
        this.ui.registerOnRuleAddHandler(() => this.addRule());
        SettingsLoader.load(Settings).then(this.ui.setSettings);
    }

    private saveSettingsFromUI() {
        this.saveSettings(this.ui.getSettings());
    }

    private saveSettings(settings: Settings) {
        SettingsLoader.save(settings)
            .then(() => this.ui.showMessage('Einstellungen erfolgreich gespeichert.'))
            .catch(error => this.ui.showErrorMessage(`Fehler beim Speichern von Einstellungen: ${error}.`));
    }

    private async addRule() {
        const settings = await SettingsLoader.load(Settings);
        settings.rules.push(Rule.empty());
        this.saveSettings(settings);
        this.ui.setSettings(settings);
    }

    private async deleteRule(id: string) {
        const settings = await SettingsLoader.load(Settings);
        settings.rules = settings.rules.filter(rule => rule.id !== id);
        this.saveSettings(settings);
        this.ui.setSettings(settings);
    }

    private async moveRuleUp(id: string) {
        const settings = await SettingsLoader.load(Settings);
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
        const settings = await SettingsLoader.load(Settings);
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
    )
).main();
