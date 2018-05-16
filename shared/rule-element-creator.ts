import { Rule } from './model/rule';

export class RuleElementCreator {

    public createRuleElement(rule: Rule, onUpClicked: () => void, onDownClicked: () => void, onDeleteClicked: () => void): HTMLDivElement {
        const ruleHeader = document.createElement('div');
        ruleHeader.appendChild(this.createRuleHeader(rule.id, onUpClicked, onDownClicked, onDeleteClicked));

        const ruleContent = this.createRuleContent();
        ruleContent.appendChild(this.createInputWithLabel(`${rule.id}-enabled`, 'checkbox', 'Aktiviert', rule.enabled));
        ruleContent.appendChild(this.createInputWithLabel(`${rule.id}-note`, 'text', 'Beschreibung', rule.note));
        ruleContent.appendChild(this.createInputWithLabel(`${rule.id}-selector`, 'text', 'jQuery-Selector', rule.selector));
        ruleContent.appendChild(this.createTextareaWithLabel(`${rule.id}-css`, 'CSS (als JSON)', JSON.stringify(rule.css)));

        const ruleElement = document.createElement('div');
        ruleElement.appendChild(this.createHiddenMarkerField(rule.id));
        ruleElement.appendChild(ruleHeader);
        ruleElement.appendChild(ruleContent);
        return ruleElement;
    }

    private createRuleHeader(id: string, onUpClicked: () => void, onDownClicked: () => void, onDeleteClicked: () => void): HTMLDivElement {
        const itemLeft = document.createElement('div');
        itemLeft.innerText = `Regel ${id}`;
        itemLeft.className = 'flex-item left';

        const itemRight = document.createElement('div');
        itemRight.className = 'flex-item right';
        itemRight.appendChild(this.createClickableIcon('fas fa-arrow-alt-circle-up', onUpClicked));
        itemRight.appendChild(this.createClickableIcon('fas fa-arrow-alt-circle-down', onDownClicked));
        itemRight.appendChild(this.createClickableIcon('fas fa-trash-alt red', onDeleteClicked));

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

    private createLabelElement(forId: string, text: string): HTMLLabelElement {
        const label = document.createElement('label');
        label.attributes['for'] = forId;
        label.innerText = text;
        return label;
    }

    private createInputElement(id: string, inputType: string, value: string | boolean): HTMLInputElement {
        const input = document.createElement('input');
        input.id = id;
        input.type = inputType;
        if (typeof value === 'boolean') {
            input.checked = value;
        } else {
            input.value = value;
        }
        return input;
    }

    private createInputWithLabel(id: string, inputType: string, text: string, value: string | boolean): HTMLDivElement {
        const div = document.createElement('div');
        div.appendChild(this.createLabelElement(id, text));
        div.appendChild(this.createInputElement(id, inputType, value));
        return div;
    }

    private createTextareaElement(id: string, value: string): HTMLTextAreaElement {
        const textarea = document.createElement('textarea');
        textarea.id = id;
        textarea.value = value;
        return textarea;
    }

    private createTextareaWithLabel(id: string, text: string, value: string): HTMLDivElement {
        const div = document.createElement('div');
        div.appendChild(this.createLabelElement(id, text));
        div.appendChild(this.createTextareaElement(id, value));
        return div;
    }

    private createHiddenMarkerField(id: string): HTMLDivElement {
        const div = document.createElement('div');
        div.id = id;
        div.className = 'ruleId';
        div.style.display = 'none';
        return div;
    }

    private createClickableIcon(iconClass: string, onClick: () => void): HTMLAnchorElement {
        const i = document.createElement('i');
        i.className = iconClass;
        const a = document.createElement('a');
        a.onclick = onClick;
        a.style.cursor = 'pointer';
        a.appendChild(i);
        return a;
    }

}
