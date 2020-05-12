import * as ExcelProper from 'exceljs';
// tslint:disable-next-line:no-submodule-imports
import * as Excel from 'exceljs/dist/es5/exceljs.browser.js';
import { Activity } from '../../shared/entities/activity';

export module ActivitiesExcelGeneratorService {

    const FONT_SIZE = 10;

    const DETAILED_ACTIVITIES_COLUMNS = [
        { key: 'date', width: 15 },
        { key: 'time', width: 12 },
        { key: 'project', width: 40 },
        { key: 'ticketType', width: 20 },
        { key: 'ticketNumber', width: 15 },
        { key: 'ticketTitle', width: 100 },
        { key: 'action', width: 20 },
        { key: '', width: 25 },
        { key: 'unparsed', width: 150 }
    ];

    const ACTIVITIES_BY_DATE_COLUMNS = [
        { key: 'date', width: 15 },
        { key: 'project', width: 40 },
        { key: 'ticketTitle', width: 100 }
    ];

    export async function generateExcel(activities: Activity[]): Promise<Blob> {
        const workbook = new Excel.Workbook();
        addDetailedActivitiesSheet(workbook, activities);
        addActivitiesByDateSheet(workbook, activities);
        return toBlob(workbook);
    }

    async function toBlob(workbook: Excel.Workbook): Promise<Blob> {
        const buffer = await workbook.xlsx.writeBuffer();
        return new Blob([ buffer ], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    }

    function addDetailedActivitiesSheet(workbook: Excel.Workbook, activities: Activity[]) {
        const worksheet: ExcelProper.Worksheet = workbook.addWorksheet('Einzelaktivitäten');
        worksheet.columns = DETAILED_ACTIVITIES_COLUMNS;
        addDetailedActivitiesHeader(worksheet);
        activities.forEach(activity => {
            const row = worksheet.addRow(activity);
            row.font = { name: 'Arial', size: FONT_SIZE };
            row.height = 20;
            row.alignment = { vertical: 'middle', horizontal: 'left' };
        });
    }

    function addDetailedActivitiesHeader(worksheet: Excel.Worksheet) {
        const header: Activity = {
            date: 'Datum',
            time: 'Zeit',
            action: 'Aktion',
            project: 'Projekt',
            ticketNumber: 'Ticketnummer',
            ticketTitle: 'Ticket-Titel',
            ticketType: 'Ticket-Typ',
            unparsed: ''
        };
        const row = worksheet.addRow(header);
        row.font = { name: 'Arial', size: FONT_SIZE, bold: true };
        row.height = 30;
        row.alignment = { vertical: 'middle', horizontal: 'center' };
    }

    function addActivitiesByDateSheet(workbook: Excel.Workbook, activities: Activity[]) {
        const worksheet: ExcelProper.Worksheet = workbook.addWorksheet('Gruppierte Aktivitäten');
        worksheet.columns = ACTIVITIES_BY_DATE_COLUMNS;
        addActivitiesByDateHeader(worksheet);

        const projectActivities = {};
        activities.forEach(activity => {
            if (projectActivities[activity.date] === undefined) {
                projectActivities[activity.date] = {};
            }
            if (projectActivities[activity.date][activity.project] === undefined) {
                projectActivities[activity.date][activity.project] = [];
            }
            projectActivities[activity.date][activity.project].push(`* ${activity.ticketTitle}`);
        });

        Object.keys(projectActivities).forEach(date => {
            Object.keys(projectActivities[date]).forEach(project => {
                const ticketTitles = projectActivities[date][project].filter(distinct).join('\n');
                const row = worksheet.addRow({ date: date, project: project, ticketTitle: ticketTitles });
                row.font = { name: 'Arial', size: FONT_SIZE };
                row.height = ((ticketTitles.match(/\n/g) || []).length + 1) * FONT_SIZE + 22;
                row.alignment = { vertical: 'middle', horizontal: 'left' };
            });
        });
    }

    function addActivitiesByDateHeader(worksheet: Excel.Worksheet) {
        const header = {
            date: 'Datum',
            project: 'Projekt',
            ticketTitle: 'Ticket-Titel'
        };
        const row = worksheet.addRow(header);
        row.font = { name: 'Arial', size: FONT_SIZE, bold: true };
        row.height = 30;
        row.alignment = { vertical: 'middle', horizontal: 'center' };
    }

    function distinct(value, index, self) {
        return self.indexOf(value) === index;
    }

}
