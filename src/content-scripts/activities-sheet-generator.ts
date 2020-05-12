import { saveAs } from 'file-saver';
import { Domready } from '../shared/utils/domready-dynamic';
import { HtmlUtils } from '../shared/utils/html-utils';
import { ActivitiesExcelGeneratorService } from './services/activities-excel-generator.service';
import { ActivitiesParserService } from './services/activities-parser.service';

export class ActivitiesSheetGenerator {

    public main() {
        this.appendDownloadHeader();
        const activityElement = HtmlUtils.findFirst<HTMLHeadingElement>('#activity');
        const activities = ActivitiesParserService.parseActivityElement(activityElement);
        this.appendActivityDownloadButton('Aktivitäten herunterladen (Excel)', async () => {
            const blob = ActivitiesExcelGeneratorService.generateExcel(activities);
            saveAs(await blob, 'activities.xlsx');
        });
        this.appendActivityDownloadButton('Aktivitäten herunterladen (JSON)', () => {
            const activitiesAsJson = JSON.stringify(activities, undefined, 4);
            const blob = new Blob([ activitiesAsJson ], { type: 'application/json' });
            saveAs(blob, 'activities.json');
        });
    }

    private appendDownloadHeader() {
        const h3Element = document.createElement('h3');
        h3Element.textContent = 'Download';
        HtmlUtils.findFirst('#sidebar').append(h3Element);
    }

    private appendActivityDownloadButton(caption: string, onDownload: () => void) {
        const downloadButton = document.createElement('a');
        downloadButton.textContent = caption;
        const div = document.createElement('div');
        downloadButton.onclick = onDownload;
        div.append(downloadButton);
        HtmlUtils.findFirst('#sidebar').append(div);
    }

}

Domready.onReady(async () => new ActivitiesSheetGenerator().main());
