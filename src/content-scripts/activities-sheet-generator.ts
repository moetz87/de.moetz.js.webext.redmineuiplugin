import { saveAs } from 'file-saver';
import { Domready } from '../shared/utils/domready-dynamic';
import { HtmlUtils } from '../shared/utils/html-utils';

const ACTIVITY_LINE_REGEX_TICKET = /^(.+)#(\d+)\s+\((.+)\):\s+(.+)$/;
const ACTIVITY_LINE_REGEX_FEATURE = /^(.+)#(\d+):\s+(.+)$/;

export class ActivitiesSheetGenerator {

    public async main() {
        const activityElement = HtmlUtils.findFirst<HTMLHeadingElement>('#activity');
        const activities = this.parseActivityElement(activityElement);
        this.appendActivityDownloadButton(activities);
    }

    private appendActivityDownloadButton(activities: Activities) {
        const h3Element = document.createElement('h3');
        h3Element.textContent = 'Download';
        HtmlUtils.findFirst('#sidebar').append(h3Element);
        const downloadButton = document.createElement('a');
        downloadButton.textContent = 'Aktivitäten herunterladen';
        downloadButton.onclick = () => {
            const blob = this.createActivitiesDownloadFile(activities);
            saveAs(blob, 'activities.json');
        };
        HtmlUtils.findFirst('#sidebar').append(downloadButton);
    }

    private createActivitiesDownloadFile(activities: Activities): Blob {
        return new Blob([ activities.stringify() ], { type: 'application/json' });
    }

    //<div id="activity">
    //  <h3>08.05.2020
    //    <dl>
    //      <dt>
    //        <span class="time">
    //        <span class="project">
    //        <a href="">Technical Debt #17684 (Erledigt): Weekly Integrationtests von "test" und "production" Skripten
    //      <dt>
    //      <dt>
    //  <h3>
    //    <dl>
    private parseActivityElement(activityElement: HTMLHeadingElement): Activities {
        const activities = new Activities();
        let currentDate = '';
        Array.from(activityElement.children).forEach(child => {
            if (child.tagName.toLowerCase() === 'h3') {
                const h3Element = <HTMLHeadingElement>child;
                currentDate = h3Element.textContent || '';
            } else if (child.tagName.toLowerCase() === 'dl') {
                const activityList = this.parseDlElement(<HTMLDListElement>child);
                activities.addAll(currentDate, activityList);
            }
        });
        return activities;
    }

    private parseDlElement(dlElement: HTMLDListElement): Activity[] {
        return Array.from(dlElement.children)
            .filter(child => child.tagName.toLowerCase() === 'dt')
            .map(child => this.parseDtElement(<HTMLElement>child));
    }

    private parseDtElement(dtElement: HTMLElement): Activity {
        const activity: Activity = <Activity>{};
        Array.from(dtElement.children).forEach(child => {
                if (child.tagName.toLowerCase() === 'span' && child.classList.contains('time')) {
                    activity.time = child.textContent || '';
                } else if (child.tagName.toLowerCase() === 'span' && child.classList.contains('project')) {
                    activity.project = child.textContent || '';
                } else if (child.tagName.toLowerCase() === 'a') {
                    const textContent = child.textContent || '';
                    const matchesTicket = textContent.match(ACTIVITY_LINE_REGEX_TICKET);
                    if (matchesTicket) {
                        activity.ticketType = matchesTicket[1];
                        activity.ticketNumber = matchesTicket[2];
                        activity.action = matchesTicket[3];
                        activity.ticketTitle = matchesTicket[4];
                    } else {
                        const matchesFeature = textContent.match(ACTIVITY_LINE_REGEX_FEATURE);
                        if (matchesFeature) {
                            activity.ticketType = matchesFeature[1];
                            activity.ticketNumber = matchesFeature[2];
                            activity.ticketTitle = matchesFeature[3];
                        } else {
                            activity.unparsable = textContent;
                        }
                    }
                } else {
                    console.log(`unknown tag ${child.tagName}`);
                }
            }
        );
        return <Activity>activity;
    }

}

class Activities {

    private entries = new Map<string, Activity[]>();

    public add(date: string, activity: Activity) {
        if (!this.entries.has(date)) {
            this.entries.set(date, [ activity ]);
        } else {
            // @ts-ignore
            this.entries.get(date).push(activity);
        }
    }

    public addAll(date: string, activities: Activity[]) {
        activities.forEach(activity => this.add(date, activity));
    }

    public stringify(): string {
        return JSON.stringify(Array.from(this.entries.entries()), null, 4);
    }

}

interface Activity {
    time: string;
    action: string;
    project: string;
    ticketNumber: string;
    ticketTitle: string;
    ticketType: string;
    unparsable?: string;
}

Domready.onReady(async () => new ActivitiesSheetGenerator().main());
