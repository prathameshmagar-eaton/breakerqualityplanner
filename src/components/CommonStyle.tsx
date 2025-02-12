/* eslint-disable */

import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core';
import * as Colors from '@brightlayer-ui/colors';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        divider: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
        pageBackground: {
            backgroundColor: theme.palette.background.default,
            minHeight: '100vh',
            position: 'relative',
        },
        padding5: { paddingLeft: '5%', paddingRight: '5%' },
        centerTexr: { textAlign: 'center' },
        card: {
            width: '50vh',
            height: '30vh',
            [theme.breakpoints.down('xs')]: {
                width: '30vh',
                height: '20vh',
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            '&:hover': {
                backgroundColor: Colors.blue[50],
            },
        },
        fillwindow: {
            height: '100%',
            position: 'absolute',
            left: 0,
            width: '100%',
            overflow: 'hidden',
        },
        root: {
            width: '100%',
        },
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20,
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%', //width of search
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(2),
                width: 'auto',
            },
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(2),
                width: '50%',
            },
        },
        searchIcon: {
            width: theme.spacing(2) * 3,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: '80%',
        },
        inputInput: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            paddingRight: theme.spacing(1),
            paddingLeft: theme.spacing(2) * 3,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 250,
                },
            },
            [theme.breakpoints.down('xs')]: {
                width: 120,
                '&:focus': {
                    width: 150,
                },
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
            },
        },
        marginTop20: { marginTop: '20px' },
        marginRight5: { marginRight: 5 },
        flexColumn: { display: 'flex', flexDirection: 'column' },
    })
);

export const datagridCellStyle = (fontSize: string): any => {
    return {
        '& .super-app-theme--header': {
            backgroundColor: Colors.blue[500],
            color: Colors.white[500],
            fontSize: fontSize,
        },
        '& .MuiDataGrid-renderingZone': {
            maxHeight: 'none !important',
        },
        '& .MuiDataGrid-cell': {
            lineHeight: 'unset !important',
            maxHeight: 'none !important',
            whiteSpace: 'normal !important',
        },
        '& .MuiDataGrid-row': {
            maxHeight: 'none !important',
        },
    };
};
