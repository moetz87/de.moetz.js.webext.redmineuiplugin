"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery = require("jquery");
const ANIMATION = 150;
const DURATION = 1500;
const SUCCESS = 'rgba(154, 239, 155, 0.2)';
const ERROR = 'rgba(230, 76, 76, 0.2)';
class Messager {
    static success(message, duration) {
        Messager.showMessage(message, SUCCESS, duration);
    }
    static error(message, duration) {
        Messager.showMessage(message, ERROR, duration);
    }
    static showMessage(message, color, duration) {
        this.messager.css({
            'background-color': color
        });
        duration = (duration == undefined) ? DURATION : duration;
        this.messager.text(message);
        this.messager.show(ANIMATION);
        window.setTimeout(() => this.messager.hide(ANIMATION), duration);
    }
}
Messager.messager = jquery('#messager');
exports.Messager = Messager;
