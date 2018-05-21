export function createLabelElement(forId: string, text: string): HTMLLabelElement {
    const label = document.createElement('label');
    // tslint:disable-next-line:no-string-literal
    label.attributes['for'] = forId;
    label.innerText = text;
    return label;
}

export function createInputElement(id: string, inputType: string, value: string | boolean): HTMLInputElement {
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

export function createInputWithLabel(id: string, inputType: string, text: string, value: string | boolean): HTMLDivElement {
    const div = document.createElement('div');
    div.appendChild(createLabelElement(id, text));
    div.appendChild(createInputElement(id, inputType, value));
    return div;
}

export function createTextareaElement(id: string, value: string): HTMLTextAreaElement {
    const textarea = document.createElement('textarea');
    textarea.id = id;
    textarea.value = value;
    return textarea;
}

export function createTextareaWithLabel(id: string, text: string, value: string): HTMLDivElement {
    const div = document.createElement('div');
    div.appendChild(createLabelElement(id, text));
    div.appendChild(createTextareaElement(id, value));
    return div;
}

export function createClickableIcon(iconClass: string, onClick: () => void): HTMLAnchorElement {
    const i = document.createElement('i');
    i.className = iconClass;
    const a = document.createElement('a');
    a.onclick = onClick;
    a.style.cursor = 'pointer';
    a.appendChild(i);
    return a;
}
