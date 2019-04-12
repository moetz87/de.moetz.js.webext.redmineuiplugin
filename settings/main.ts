import { Settings } from '../shared/entities/settings';
import { Messager } from '../shared/messager';
import { Domready } from '../shared/utils/domready-dynamic';
import { SettingsLoader } from '../shared/utils/settings-loader';
import { RuleElementCreator } from './rule-element-creator';
import { UserInterface } from './user-interface';

export class Main {

    constructor(readonly ui: UserInterface) { }

    public async main() {
        try {
            const settings = await SettingsLoader.load(Settings);
            this.ui.setSettings(settings);
        } catch (e) {
            Messager.showMessage('Fehler', `Fehler beim Laden der Einstellungen:\n${e.message}`);
        }
    }

}

const main = new Main(
    new UserInterface(
        new RuleElementCreator()
    )
);
Domready.onReady(async () => main.main());
