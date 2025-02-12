/* eslint-disable */

import AppStyle from '../../components/AppStyle';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Spacer, UserMenu } from '@brightlayer-ui/react-components';
import { CloudDownload, ExitToApp } from '@mui/icons-material';
import { useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import { LocalStorage } from '../../store/local-storage';
import Lock from '@mui/icons-material/Lock';
import ButtonLeft from '../../components/ButtonLeft';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { datagridCellStyle } from '../../components/CommonStyle';
import { getQualityColumnsList, getStationList } from './helper';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { printData } from '../GeneratePdf/pdfGenerator';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { fetchOrderStationsByOrderId } from './api';

export const OrderDetails = (): JSX.Element => {
    const theme = useTheme();
    const classes = AppStyle(theme);
    const securityHelper = useSecurityActions();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    const passedSelectedOrderData: any = useLocation();
    console.log(passedSelectedOrderData);
    const orderId = passedSelectedOrderData?.state?.selectedOrderData?.orderId;
    const orderDetails = passedSelectedOrderData?.state?.selectedOrderData?.details;

    // const [stationsList, setStationsList] = useState([]);
    const [orderstationsList, setOrderStationsList] = useState([]);

    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    const columns = getStationList();

    useEffect(() => {
        fetchOrderStationsByOrderId(orderId).then((response) => {
            console.log(response?.data?.orderStations);
            setOrderStationsList(response?.data?.orderStations);
        });
    }, []);

    const stationsList: Array<{ [key: string]: any }> = [];

    orderstationsList && orderstationsList.length
        ? orderstationsList.map((row: any, indexMain: number) => {
              console.log('row', row);
              return stationsList.push({ id: indexMain, ...row?.station });
          })
        : null;

    const styles = {
        boxStyle: {
            height: 600,
            width: '100%',
        },
        boxStyleForGrid: {
            height: 450,
            width: '100%',
        },
        boxStyle1: {
            height: 200,
            width: '100%',
        },

        paperStyle: {
            overflow: 'hidden', // for future ref
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingBottom: '5%',
            paddingTop: '2%',
        },
        buttonStyles: {
            paddingBottom: theme.spacing(1.5),
        },
    };

    function handlePdfButtonClick(): void {
        printData();
    }

    return (
        <Grid container item xs={12} style={{ height: '100vh' }}>
            <Grid item xs={12}>
                <AppBar position={'sticky'}>
                    <Toolbar className={classes.toolbar} style={{ background: theme.palette.primary.main }}>
                        <Typography variant={'h6'} color={'inherit'}>
                            Order Details
                        </Typography>
                        <Spacer />
                        <UserMenu
                            avatar={<Avatar>UN</Avatar>}
                            menuGroups={[
                                {
                                    items: [
                                        {
                                            title: 'Change Password',
                                            icon: <Lock />,
                                            onClick: securityHelper.showChangePassword,
                                        },
                                        {
                                            title: 'Log Out',
                                            icon: <ExitToApp />,
                                            onClick: logOut,
                                        },
                                    ],
                                },
                            ]}
                            MenuProps={{
                                anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
                                transformOrigin: { horizontal: 'right', vertical: 'top' },
                            }}
                        />
                    </Toolbar>
                </AppBar>

                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Paper style={styles.paperStyle}>
                            <div className={classes.ordersListContainer}>
                                <Grid item>
                                    <SummarizeIcon
                                        style={{ fill: '#007bc1', marginRight: 10, fontSize: 100, background: 'white' }}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs container>
                                    <Grid item xs={2} direction="column">
                                        <Grid item>
                                            <Typography variant={xs ? 'body2' : 'h6'} color="textSecondary">
                                                Order Id: {orderId}
                                            </Typography>
                                            <Typography variant={xs ? 'body2' : 'h6'} color="textSecondary">
                                                Order Details: {orderDetails}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <Grid item>
                                            <ButtonLeft
                                                color="primary"
                                                variant="contained"
                                                onClick={handlePdfButtonClick}
                                            >
                                                MAGNUM CHECKLIST
                                            </ButtonLeft>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Grid item>
                                            <ButtonLeft
                                                color="primary"
                                                variant="contained"
                                                onClick={handlePdfButtonClick}
                                            >
                                                AUTO INSPECTION
                                            </ButtonLeft>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3.5}>
                                        <Grid item>
                                            <ButtonLeft
                                                color="primary"
                                                variant="contained"
                                                onClick={handlePdfButtonClick}
                                            >
                                                LINE QUALITY CHECKLIST
                                            </ButtonLeft>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>

                            <Box style={styles.boxStyle}>
                                <Box style={styles.boxStyleForGrid}>
                                    <DataGrid
                                        rows={stationsList || []}
                                        columns={columns}
                                        components={{
                                            Toolbar: () => {
                                                return (
                                                    <GridToolbarContainer sx={{ paddingLeft: '15px' }}>
                                                        {/* Grid Title */}
                                                        <Grid item>
                                                            <Typography variant={'h6'} color={'primary'}>
                                                                Stations List
                                                            </Typography>
                                                        </Grid>
                                                        {/* CSS--> Keep items at right side */}
                                                        <Grid item xs>
                                                            <Grid container direction="row-reverse">
                                                                <Grid item>
                                                                    <GridToolbarExport
                                                                        printOptions={{
                                                                            disableToolbarButton: true,
                                                                        }}
                                                                        csvOptions={{
                                                                            fileName: 'Orders',
                                                                            delimiter: ';',
                                                                            utf8WithBom: true,
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </GridToolbarContainer>
                                                );
                                            },
                                        }}
                                        initialState={{
                                            sorting: { sortModel: [{ field: '', sort: 'asc' }] },
                                        }}
                                        pagination={undefined}
                                        onSelectionModelChange={(newSelection: any) => {
                                            // setSelection(newSelection?.[0]);
                                        }}
                                        sx={datagridCellStyle('18px')}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
