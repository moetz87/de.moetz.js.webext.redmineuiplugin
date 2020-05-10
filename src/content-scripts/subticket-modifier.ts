import { Domready } from '../shared/utils/domready-dynamic';
import { HtmlUtils } from '../shared/utils/html-utils';
import { UrlUtils } from '../shared/utils/url-utils';

const PARENT_ID_REGEX = /^.*issues\/(\d+)\/copy$/g;

export class SubticketModifier {

    public async main() {
        this.tryTo(() => HtmlUtils.findFirst<HTMLSelectElement>('#issue_tracker_id').value = '5');
        this.tryTo(() => HtmlUtils.findFirst<HTMLSelectElement>('#issue_status_id').value = '1');
        this.tryTo(() => HtmlUtils.findFirst<HTMLSelectElement>('#issue_assigned_to_id').value = '1');
        this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#issue_custom_field_values_10').value = '');
        this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#link_copy').checked = false);
        this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#copy_attachments').checked = false);
        this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#copy_subtasks').checked = false);
        this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#issue_parent_issue_id').value = this.getParentId());
        this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#issue_start_date').value = '');
        this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#issue_due_date').value = '');
        this.tryTo(() => HtmlUtils.findFirst<HTMLInputElement>('#issue_estimated_hours').value = '');
        this.tryTo(() => this.fireOnChangeEvent(HtmlUtils.findFirst<HTMLSelectElement>('#issue_tracker_id')));
    }

    private tryTo(execution: () => void) {
        try {
            execution();
            // tslint:disable-next-line:no-empty
        } catch (e) {
        }
    }

    private getParentId(): string {
        const url = UrlUtils.getCurrentUrl();
        const matches = PARENT_ID_REGEX.exec(url);
        return (matches != null) ? matches[1] : '';
    }

    private fireOnChangeEvent(element: HTMLSelectElement) {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        element.dispatchEvent(event);
    }

}

Domready.onReady(async () => new SubticketModifier().main());
