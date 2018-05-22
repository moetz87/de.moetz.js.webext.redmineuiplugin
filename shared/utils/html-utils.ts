import { sizzle } from '../sizzle-dynamic';

export function find<T extends Element>(selector: string): T[] {
    const elements = sizzle(`${selector}`);
    if (elements.length === 0) {
        console.log(`Kein Element mit Selector=${selector} gefunden.`);
        return [];
    }
    return <T[]>elements;
}

export function findFirst<T extends Element>(selector: string): T {
    const elements = find(selector);
    if (elements.length === 0) {
        throw new Error(`Kein Element mit Selector=${selector} gefunden.`);
    }
    return <T>find(selector)[0];
}

export function ifExists<T extends Element>(selector: string, callback: (element: T) => void) {
    const elements = find(selector);
    if (elements.length !== 0) {
        callback(<T>elements[0]);
    }
}

export function appendAfter(target: HTMLElement, element: HTMLElement) {
    if (!target.parentNode) {
        throw new Error(`Element=${target} hat kein Eltern-Element. Kann nicht hinzufügen.`);
    }
    target.parentNode.insertBefore(element, target.nextSibling);
}

export function remove(selector: string) {
    find(selector).forEach(e => e.remove());
}

export function removeChildren(element: Element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

export function applyCss(selector: string, css: any) {
    find<HTMLElement>(selector).forEach(e => Object.assign(e.style, css));
}
