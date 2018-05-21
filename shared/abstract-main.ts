import * as domready from 'domready';

export abstract class AbstractMain {

    public main() {
        domready(() => this.onExecuteMain());
    }

    protected abstract onExecuteMain();

}
