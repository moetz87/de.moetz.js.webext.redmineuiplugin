import { SettingsLoader } from 'ts-common/settings-loader';
import { WebextMain } from 'ts-common/webext-main';
import { Settings } from '../shared/entities/settings';
import { Messager } from '../shared/messager';
import { RuleElementCreator } from './rule-element-creator';
import { UserInterface } from './user-interface';

export class Main extends WebextMain {

    constructor(readonly ui: UserInterface) {
        super();
    }

    public async onExecuteMain() {
        try {
            const settings = await SettingsLoader.load(Settings);
            this.ui.setSettings(settings);
        } catch (e) {
            Messager.showMessage('Fehler', `Fehler beim Laden der Einstellungen:\n${e.message}`);
        }
    }

}

new Main(
    new UserInterface(
        new RuleElementCreator()
    )
).main();
