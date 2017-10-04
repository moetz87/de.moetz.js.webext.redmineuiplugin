import { Setting } from "./setting";
import * as jquery from 'jquery';

const DEFAULTURL = '.*(/redmine/projects/).*';


export class URL extends Setting {

    private _urlPattern: string;
    private _appendToId: string | undefined;

    constructor(appendToId?: string) {
        super();
        this._appendToId = appendToId;
    }

    get name(): string {
        return 'url';
    }

    get urlPattern(): string {
        return this._urlPattern;
    }

    toJson(): any {
        return this._urlPattern;
    }

    fromJson(json: any): void {
        this._urlPattern = json;
    }

    createDefault(): void {
        this._urlPattern = DEFAULTURL;
    }

    render(): void {
        var stub = '<div class="label">URL-Pattern (RegEx):</div><div class="value"><input type="text"></div>';
        var element = jquery(stub);
        element.find('input').val(this._urlPattern);
        element.find('input').on('input', () => this._urlPattern = String(element.find('input').val()));

        jquery(this._appendToId).empty();
        element.appendTo(jquery(this._appendToId));
    }

}