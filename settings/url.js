"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setting_1 = require("./setting");
const jquery = require("jquery");
const DEFAULTURL = '.*(/redmine/projects/).*';
class URL extends setting_1.Setting {
    constructor(appendToId) {
        super();
        this._appendToId = appendToId;
    }
    get name() {
        return 'url';
    }
    get urlPattern() {
        return this._urlPattern;
    }
    toJson() {
        return this._urlPattern;
    }
    fromJson(json) {
        this._urlPattern = json;
    }
    createDefault() {
        this._urlPattern = DEFAULTURL;
    }
    render() {
        var stub = '<div class="label">URL-Pattern (RegEx):</div><div class="value"><input type="text"></div>';
        var element = jquery(stub);
        element.find('input').val(this._urlPattern);
        element.find('input').on('input', () => this._urlPattern = String(element.find('input').val()));
        jquery(this._appendToId).empty();
        element.appendTo(jquery(this._appendToId));
    }
}
exports.URL = URL;
