import { Theme, createStyles, makeStyles, colors } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const AppStyle = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(2),
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            fontSize: '18px',
            [theme.breakpoints.down('xs')]: {
                margin: theme.spacing(1),
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
                fontSize: '12px',
            },
        },
        marginRight5: { marginRight: 5 },
        buttonLeft: {
            margin: theme.spacing(2),
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            fontSize: '18px',
            float: 'right',
            [theme.breakpoints.down('xs')]: {
                margin: theme.spacing(1),
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
                fontSize: '12px',
                float: 'right',
            },
        },
        formControl: {
            width: 320,
            minWidth: 120,
            marginRight: '40px',
            marginBottom: '20px',
            marginTop: '20px',
        },
        formControl1: {
            // width: 280,
            minWidth: 120,
            marginLeft: '20px',
            marginBottom: '20px',
            marginRight: '10px',
        },
        formControlXs: {
            width: 280,
        },
        formControl1Xs: {
            width: 160,
            minWidth: 120,
            marginLeft: '10px',
            marginBottom: '20px',
            marginRight: '10px',
        },
        selectEmpty: {
            marginTop: 'auto',
        },

        textField: {
            marginLeft: theme.spacing(8),
            marginRight: theme.spacing(8),
            maxWidth: '350px',
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(2),
                marginRight: theme.spacing(2),
                width: '150px',
            },
        },

        root: {
            flexGrow: 1,
        },
        paper: {
            paddingTop: theme.spacing(4),
            paddingLeft: theme.spacing(4),
            margin: 'auto',
        },
        paperColoumn: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            overflow: 'hidden',
        },
        image: {
            width: 128,
            height: 128,
        },
        imageMobile: {
            width: 80,
            height: 80,
        },
        table: {
            minWidth: 700,
        },
        buttonMargin: {
            marginLeft: theme.spacing(1),
            fontSize: '1.7rem',
            [theme.breakpoints.down('xs')]: {
                margin: theme.spacing(0.5),
                fontSize: '10px',
            },
        },
        buttonFab: {
            backgroundColor: colors.pink[500],
        },
        menu: {
            width: '250%',
        },
        menuPaper: {
            maxHeight: 200,
        },
        selectSrPaper: {
            overflow: 'hidden',
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingBottom: '5%',
            paddingTop: '2%',
        },
        selectLocationPaper: {
            border: `1px solid lightGray`,
            padding: 10,
            marginBottom: 36,
        },
        whiteBackground: { backgroundColor: 'white' },
        marginBottom10: { marginBottom: 10 },
        marginRight25: { margin: 0, marginRight: 25, float: 'none' },
        marginRight8: { marginRight: 8 },
        marginTop20: { marginTop: '20px' },
        marginTopTheme2: { marginTop: theme.spacing(2) },
        paddingTheme2: { padding: theme.spacing(2), alignItems: 'center' },
        ZIndex100: { zIndex: 100 },

        blueBackground: { backgroundColor: colors.blue[50] },
        justifyCenter: { justifyContent: 'center' },
        refreshIcon: {
            fill: '#007bc1',
            fontSize: 35,
        },
        blueFill: { fill: blue[500] },
        locationListContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            border: `1px solid lightGray`,
            padding: '20px 16px 10px 16px',
            marginBottom: 36,
        },
        ordersListContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: '5px 16px 15px 0px',
            marginBottom: 20,
        },
        table2: {
            '& .MuiTableCell-head': {
                fontWeight: 700,
                backgroundColor: '#c0c0c0',
            },
            '& .MuiTableCell-root': {
                border: '1px solid black',
            },
        },
    })
);

export default AppStyle;
