import { Sizzle } from './sizzle-dynamic';

export module HtmlUtils {

    export function find<T extends Element>(selector: string): T[] {
        const elements = Sizzle.select(selector);
        if (elements.length === 0) {
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

}
