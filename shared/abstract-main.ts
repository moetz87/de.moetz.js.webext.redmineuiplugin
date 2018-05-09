import * as jquery from 'jquery';

export abstract class AbstractMain {

    public main() {
        jquery(document).ready(() => this.onExecuteMain());
    }

    protected abstract onExecuteMain();

}
