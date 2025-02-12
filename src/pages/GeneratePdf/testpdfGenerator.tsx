/* eslint-disable */
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import jsPDF from 'jspdf';
import { Table, TableBody, TableCell, TableHead, TableRow, useTheme, Box } from '@mui/material';
import styled from '@emotion/styled';
import AppStyle from '../../components/AppStyle';
import { useRef } from 'react';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         marginTop: theme.spacing(3),
//         overflowX: 'auto',
//     },
//     table: {
//         minWidth: 700,
//     },
// }));

// const TableRowStyled = {
//     headStyle: {

//     },
//     TableCell: {
//         fontWeight: 900,
//     },
// };

const sample = [
    { name: 'apple', detail: ['a', 'b', 'c', 'd'] },
    { name: 'banana', detail: ['a', 'b'] },
];

export const ExportTableFormat = (): JSX.Element => {
    const pdfRef = useRef(null);
    const content = pdfRef.current;
    // const classes = useStyles();
    const theme = useTheme();
    const classes = AppStyle(theme);

    const doc = new jsPDF();

    // doc.html(content, {
    //     callback: function (doc) {
    //         doc.save('sample.pdf');
    //     },
    // });

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
            srNo: '4',
            pasoRow: 'Asegurese que todos los puntos claves tengan GRASA.',
            docRefRow: ` `,
            tool: 'Manual',
            Conforme: '',
            na: '',
        },
        {
            srNo: '5',
            pasoRow: 'Asegurese que todos los puntos claves tengan GRASA.',
            docRefRow: ` `,
            tool: 'Manual',
            Conforme: '',
            na: '',
        },
        {
            srNo: '6',
            pasoRow: 'Asegurese que todos los puntos claves tengan GRASA.',
            docRefRow: ` `,
            tool: 'Manual',
            Conforme: '',
            na: '',
        },
    ];

    return (
        <Paper style={styles.paperStyle}>
            <Box style={styles.boxStyle}>
                <Table className={classes.table2}>
                    <TableHead ref={pdfRef}>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>PASO 1</TableCell>
                            <TableCell>DOC. REF</TableCell>
                            <TableCell>Tool</TableCell>
                            <TableCell>Conforme</TableCell>
                            <TableCell>N/A ( X )</TableCell>
                            <TableCell>Iniciales/# Empleado Requerido</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {checkListData.map((item: any, index: any) => (
                            <Fragment key={index}>
                                <TableRow key={index}>
                                    <TableCell>{item.srNo}</TableCell>
                                    <TableCell>{item.pasoRow}</TableCell>
                                    <TableCell>{item.docRefRow}</TableCell>
                                    <TableCell>{item.tool}</TableCell>
                                    <TableCell>{item.Conforme}</TableCell>
                                    <TableCell>{item.na}</TableCell>
                                </TableRow>
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
};

const styles = {
    paperStyle: {
        overflow: 'hidden',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%',
        paddingTop: '2%',
    },
    boxStyle: {
        height: 600,
        width: '100%',
    },
};
