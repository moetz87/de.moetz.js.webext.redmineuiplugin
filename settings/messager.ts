import * as jquery from 'jquery';


const ANIMATION = 150;
const DURATION = 1500;
const SUCCESS = 'rgba(154, 239, 155, 0.2)';
const ERROR = 'rgba(230, 76, 76, 0.2)';


export class Messager {

    private static messager: JQuery<HTMLElement> = jquery('#messager');

    static success(message: string, duration?: number) {
        Messager.showMessage(message, SUCCESS, duration);
    }

    static error(message: string, duration?: number) {
        Messager.showMessage(message, ERROR, duration);
    }

    private static showMessage(message: string, color: string, duration?: number) {
        this.messager.css({
            'background-color': color
        });
        duration = (duration == undefined) ? DURATION : duration;
        this.messager.text(message);
        this.messager.show(ANIMATION);
        window.setTimeout(() => this.messager.hide(ANIMATION), duration);
    }

}


