import { createClickableIcon, createInputWithLabel, createInputWithLinkLabel, createTextareaWithLabel } from '../shared/element-creator';
import { Rule } from '../shared/entities/rule';

const SIZZLEURL = 'https://github.com/jquery/sizzle/wiki#selectors';

export class RuleElementCreator {

    public createRuleElement(rule: Rule, onUpClicked: () => void, onDownClicked: () => void, onDeleteClicked: () => void): HTMLDivElement {
        const ruleHeader = document.createElement('div');
        ruleHeader.appendChild(this.createRuleHeader(rule.note, onUpClicked, onDownClicked, onDeleteClicked));

        const ruleContent = this.createRuleContent();
        ruleContent.appendChild(createInputWithLabel(`${rule.id}-enabled`, 'checkbox', 'Aktiviert', rule.enabled));
        ruleContent.appendChild(createInputWithLabel(`${rule.id}-note`, 'text', 'Beschreibung', rule.note));
        ruleContent.appendChild(createInputWithLinkLabel(`${rule.id}-selector`, 'text', 'jQuery-Selector', SIZZLEURL, rule.selector));
        ruleContent.appendChild(createTextareaWithLabel(`${rule.id}-css`, 'CSS (als JSON)', JSON.stringify(rule.css)));

        const ruleElement = document.createElement('div');
        ruleElement.setAttribute('rule', rule.id);
        ruleElement.appendChild(ruleHeader);
        ruleElement.appendChild(ruleContent);
        return ruleElement;
    }

    // tslint:disable-next-line:max-line-length
    private createRuleHeader(name: string, onUpClicked: () => void, onDownClicked: () => void, onDeleteClicked: () => void): HTMLDivElement {
        const itemLeft = document.createElement('div');
        itemLeft.innerText = `Regel: "${name}"`;
        itemLeft.className = 'flex-item left';

        const itemRight = document.createElement('div');
        itemRight.className = 'flex-item right';
        itemRight.appendChild(createClickableIcon('fas fa-arrow-alt-circle-up', onUpClicked));
        itemRight.appendChild(createClickableIcon('fas fa-arrow-alt-circle-down', onDownClicked));
        itemRight.appendChild(createClickableIcon('fas fa-trash-alt red', onDeleteClicked));

        const container = document.createElement('div');
        container.className = 'ruleheader flex-container';
        container.appendChild(itemLeft);
        container.appendChild(itemRight);
        return container;
    }

    private createRuleContent(): HTMLDivElement {
        const div = document.createElement('div');
        div.className = 'rulecontent';
        return div;
    }

}
