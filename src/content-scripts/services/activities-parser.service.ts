import { Activity } from '../../shared/entities/activity';

export module ActivitiesParserService {

    const ACTIVITY_LINE_REGEX_TICKET = /^(.+)#(\d+)\s+\((.+)\):\s+(.+)$/;
    const ACTIVITY_LINE_REGEX_FEATURE = /^(.+)#(\d+):\s+(.+)$/;

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
    export function parseActivityElement(activityElement: HTMLHeadingElement): Activity[] {
        const activities: Activity[] = [];
        let currentDate = '';
        Array.from(activityElement.children).forEach(child => {
            if (child.tagName.toLowerCase() === 'h3') {
                const h3Element = <HTMLHeadingElement>child;
                currentDate = parseDate(h3Element.textContent || '');
            } else if (child.tagName.toLowerCase() === 'dl') {
                parseDlElement(<HTMLDListElement>child)
                    .map(activity => {
                        activity.date = currentDate;
                        return activity;
                    })
                    .forEach(activity => activities.push(activity));
            }
        });
        return activities;
    }

    function parseDate(date: string): string {
        if (date.toLowerCase() === 'heute') {
            const now = new Date(Date.now());
            const day = `0${now.getDate()}`.slice(-2);
            const month = `0${now.getMonth() + 1}`.slice(-2);
            const year = now.getFullYear();
            return `${day}.${month}.${year}`;
        } else {
            return date;
        }
    }

    function parseDlElement(dlElement: HTMLDListElement): Activity[] {
        return Array.from(dlElement.children)
            .filter(child => child.tagName.toLowerCase() === 'dt')
            .map(child => parseDtElement(<HTMLElement>child));
    }

    function parseDtElement(dtElement: HTMLElement): Activity {
        const activity: Activity = <Activity>{};
        Array.from(dtElement.children).forEach(child => {
                if (child.tagName.toLowerCase() === 'span' && child.classList.contains('time')) {
                    activity.time = child.textContent || '';
                } else if (child.tagName.toLowerCase() === 'span' && child.classList.contains('project')) {
                    activity.project = child.textContent || '';
                } else if (child.tagName.toLowerCase() === 'a') {
                    activity.unparsed = child.textContent || '';
                    const matchesTicket = activity.unparsed.match(ACTIVITY_LINE_REGEX_TICKET);
                    if (matchesTicket) {
                        activity.ticketType = matchesTicket[1];
                        activity.ticketNumber = matchesTicket[2];
                        activity.action = matchesTicket[3];
                        activity.ticketTitle = matchesTicket[4];
                    } else {
                        const matchesFeature = activity.unparsed.match(ACTIVITY_LINE_REGEX_FEATURE);
                        if (matchesFeature) {
                            activity.ticketType = matchesFeature[1];
                            activity.ticketNumber = matchesFeature[2];
                            activity.ticketTitle = matchesFeature[3];
                        }
                    }
                }
            }
        );
        return <Activity>activity;
    }

}
