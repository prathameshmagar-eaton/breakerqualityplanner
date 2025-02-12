/* eslint-disable */

import jsPDF from 'jspdf';
import autoTable, { Table } from 'jspdf-autotable';
import { getDateFormat, pdfConfig } from './helper';

export const printData = (): void => {
    const doc = new jsPDF();

    const pdfActions = {
        save: () => doc.save('station1-checkList'),
        getBlob: (): any => {
            const blob = doc.output('datauristring');
            return blob;
        },
        show: () => {
            doc.setProperties({
                title: 'Test Title',
                subject: '',
                author: '',
            }).output('dataurlnewwindow');
        },
    };

    const currentDate = getDateFormat(new Date());

    const docHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const docWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    let currentHeight = 10;
    const textToleftRight = 15;

    //================= HEADER VIEW
    currentHeight += pdfConfig.lineHeight;
    doc.setFontSize(pdfConfig.headerTextSize)
        // .setTextColor(pdfConfig.blackBold)
        .setFont('', 'bold')
        .text('HOJA DE AUTO INSPECCION', docWidth / 2, currentHeight, { align: 'center' });
    currentHeight += 7;

    doc.setTextColor(pdfConfig.blackBold).text('Double Wide - Magnum', docWidth / 2, currentHeight, {
        align: 'center',
    });
    currentHeight += 5;

    doc.line(5, currentHeight, docWidth - 5, currentHeight);
    currentHeight += 5;
    doc.setFontSize(pdfConfig.subLineHeight + 4).text('GO#', 10, currentHeight, { align: 'left' });
    doc.setFontSize(pdfConfig.subLineHeight + 4).text('Item#', docWidth / 3, currentHeight);
    doc.setFontSize(pdfConfig.subLineHeight + 4).text('Seq.#', docWidth / 3 + 40, currentHeight);
    doc.setFontSize(pdfConfig.subLineHeight + 4).text('QTY.', docWidth / 3 + 80, currentHeight);

    currentHeight += 2;

    doc.line(5, currentHeight, docWidth - 5, currentHeight);
    currentHeight += 4;
    doc.setFontSize(pdfConfig.subLineHeight + 4).text('Fetcha:', 10, currentHeight, { align: 'left' });
    doc.setFontSize(pdfConfig.subLineHeight + 4).text(
        'TURNO en que se comenzó la orden',
        docWidth / 2 + 10,
        currentHeight,
        { align: 'left' }
    );

    currentHeight += 2;
    doc.line(5, currentHeight, docWidth - 5, currentHeight);

    currentHeight += 0.2;

    // define the columns we want and their titles
    const tableColumn: any = [
        [`número`, `PASO 1`, `DOC. REF`, `Tool`, `Conforme`, `N/A ( X )`, `Iniciales/# Empleado     Requerido`],
    ];

    // define an empty array of rows
    let tableRows: any = [];

    // dummy data
    let checkListData: any = [
        {
            srNo: '1',
            pasoRow: 'Front Housing no esta roto o rayado',
            docRefRow: `PPM's, DWG's`,
            tool: 'Visual',
            Conforme: '',
            na: '',
        },
        {
            srNo: '2',
            pasoRow: 'Todos los insert estan presente y bien puestos',
            docRefRow: ` `,
            tool: 'Visual',
            Conforme: '',
            na: '',
        },
        {
            srNo: '3',
            pasoRow: 'Asegurese que todos los puntos claves tengan GRASA.',
            docRefRow: ` `,
            tool: 'Manual',
            Conforme: '',
            na: '',
        },
        {
            srNo: '3',
            pasoRow: 'Asegurese que todos los puntos claves tengan GRASA.',
            docRefRow: ` `,
            tool: 'Manual',
            Conforme: '',
            na: '',
        },
        {
            srNo: '3',
            pasoRow: 'Asegurese que todos los puntos claves tengan GRASA.',
            docRefRow: ` `,
            tool: 'Manual',
            Conforme: '',
            na: '',
        },
        {
            srNo: '3',
            pasoRow: 'Asegurese que todos los puntos claves tengan GRASA.',
            docRefRow: ` `,
            tool: 'Manual',
            Conforme: '',
            na: '',
        },
        {
            srNo: '3',
            pasoRow: 'Asegurese que todos los puntos claves tengan GRASA.',
            docRefRow: ` `,
            tool: 'Manual',
            Conforme: '',
            na: '',
        },
    ];

    checkListData.forEach((checkList: any) => {
        tableRows.push([
            checkList.srNo,
            checkList.pasoRow,
            checkList.docRefRow,
            checkList.tool,
            checkList.Conforme,
            checkList.na,
        ]);
    });

    let height;
    let tableMeta: Table | null = null;

    for (var i = 0; i < checkListData.length; i++) {
        var row = [];
        console.log('rowrow',checkListData)

        for (var key in checkListData[i]) {
            row.push(checkListData[i][key]);
        }
        if (i % 5 === 0) {
            row.unshift({
                rowSpan: 5,
                content: i / 5 + 1,
                styles: { valign: 'middle', halign: 'center' },
            });
        }
        console.log('rowrow',row)

        tableRows.push(row);
    }

    autoTable(doc, {
        head: tableColumn,
        body: tableRows,
        margin: { top: currentHeight, left: 5, right: 5 },
        // tableWidth: docWidth -2,
        styles: {
            halign: 'left',
            valign: 'middle',
            fontSize: pdfConfig.fieldTextSize,
        },
        didParseCell: (data) => {
            if (!tableMeta) {
                tableMeta = data.table;
                height = tableMeta?.finalY;
            }
        },
        tableLineWidth: 0.1,
        theme: 'grid',
        headStyles: { fillColor: 150, textColor: 255, halign: 'center' },
        tableLineColor: 'black',
    });

    // Calculate the table height

    autoTable(doc, {
        head: tableColumn,
        body: tableRows,
        margin: { top: 100 + (height || 0), left: 5, right: 5, bottom: 0 },
        // tableWidth: docWidth -2,
        styles: {
            halign: 'left',
            valign: 'middle',
            fontSize: pdfConfig.fieldTextSize,
        },
        tableLineWidth: 0.1,
        theme: 'grid',
        headStyles: { fillColor: 150, textColor: 255, halign: 'center' },
        tableLineColor: 'black',
    });

    autoTable(doc, {
        head: tableColumn,
        body: tableRows,
        margin: { top: 0, left: 5, right: 5 },
        // tableWidth: docWidth -2,
        styles: {
            halign: 'left',
            valign: 'middle',
            fontSize: pdfConfig.fieldTextSize,
        },
        tableLineWidth: 0.1,
        theme: 'grid',
        headStyles: { fillColor: 150, textColor: 255, halign: 'center' },
        tableLineColor: 'black',
    });

    autoTable(doc, {
        head: tableColumn,
        body: tableRows,
        margin: { top: 0, left: 5, right: 5 },
        // tableWidth: docWidth -2,
        styles: {
            halign: 'left',
            valign: 'middle',
            fontSize: pdfConfig.fieldTextSize,
        },
        tableLineWidth: 0.1,
        theme: 'grid',
        headStyles: { fillColor: 150, textColor: 255, halign: 'center' },
        tableLineColor: 'black',
    });

    const pageCount = doc.getNumberOfPages();
    for (var i = 1; i < pageCount + 1; i++) {
        doc.setPage(i);
        // doc.setFontSize(pdfConfig.labelTextSize)
        //     .setTextColor(pdfConfig.grey)
        //     .text(`Printed_On : `.concat(currentDate), textToleftRight, docHeight - 10, {
        //         align: 'left',
        //         maxWidth: 60,
        //     });
        let horizontalPos = 15;
        let verticalPos = docHeight - 5;
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount}`, horizontalPos, verticalPos, {
            align: 'center',
        });
    }

    pdfActions.show();
    // pdfActions.save();
    pdfActions.getBlob();
};
