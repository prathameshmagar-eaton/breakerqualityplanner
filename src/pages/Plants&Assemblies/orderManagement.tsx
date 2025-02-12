/* eslint-disable */

import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Avatar,
    IconButton,
    Toolbar,
    Typography,
    Box,
    useMediaQuery,
    useTheme,
    Grid,
    Paper,
} from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDrawer } from '../../contexts/drawerContextProvider';
import Lock from '@mui/icons-material/Lock';
import { useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import { LocalStorage } from '../../store/local-storage';
import Menu from '@mui/icons-material/Menu';
import { Spacer, UserMenu } from '@brightlayer-ui/react-components';
import ExitToApp from '@mui/icons-material/ExitToApp';
import AppStyle from '../../components/AppStyle';
import ButtonLeft from '../../components/ButtonLeft';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getOrdersColumnsList } from './helper';
import { datagridCellStyle } from '../../components/CommonStyle';
import { CreateOrder } from './createOrder';
import SearchAppBar from '../../components/SearchBar';
import { fetchOderDetailsByLineId, fetchPlantDetailsByPlantId, fetchPlantsList } from './api';
import { AssignStation } from './assignStation';

export const OrderManagement = (): JSX.Element => {
    const theme = useTheme();
    const { setDrawerOpen } = useDrawer();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const securityHelper = useSecurityActions();

    const [createOrderDialog, showCreateOrderDialog] = useState(false);
    const [editOrderDialog, showEditOrderDialog] = useState(false);
    const [assignStationDialog, showAssignStationDialog] = useState(false);
    const [filter, showFilter] = useState(false);
    const [title, setTitle] = useState('');
    const [plantId, setPlantId] = useState('');
    const [lineId, setLineId] = useState('');
    const [plantsList, setPlantsList] = useState([]);
    const [assembliesList, setassembliesList] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState({});

    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    const classes = AppStyle(theme);

    const columns = getOrdersColumnsList({
        showCreateOrderDialog,
        setTitle,
        setSelectedOrder,
        showAssignStationDialog,
    });

    const handlePlantIdChange = (e: any) => {
        fetchPlantDetailsByPlantId({ e, setPlantId });
    };

    const handleLineIdChange = (e: any) => {
        fetchOderDetailsByLineId({ e, setLineId }).then((response) => {
            setOrdersList(response?.data);
        });
    };

    useEffect(() => {
        fetchPlantsList().then((response: any) => {
            setPlantsList(response?.data);
            setPlantId(response?.data[0]?.plantId);
            setassembliesList(response?.data[0]?.assemblyLines);
            setOrdersList(response?.data[0]?.assemblyLines[0]?.orders);
            setLineId(response?.data[0]?.assemblyLines[0]?.lineId);
        });
    }, []);

    const orders: Array<{
        [key: string]: any;
    }> = [];

    ordersList && ordersList.length
        ? ordersList.map((row: any, indexMain: number) => {
              return orders.push({ id: indexMain, ...row });
          })
        : null;

    return (
        <Grid container item xs={12} style={{ height: '100vh' }}>
            <Grid item xs={createOrderDialog || editOrderDialog || assignStationDialog ? 8 : 12}>
                <AppBar position={'sticky'}>
                    <Toolbar className={classes.toolbar} style={{ background: theme.palette.primary.main }}>
                        <Typography variant={'h6'} color={'inherit'}>
                            Orders List
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
                                <ButtonLeft
                                    variant="contained"
                                    disabled={createOrderDialog || editOrderDialog || assignStationDialog}
                                    color="primary"
                                    onClick={() => {
                                        if (!createOrderDialog) {
                                            showCreateOrderDialog(true);
                                            setTitle('Create Order');
                                        }
                                    }}
                                    style={styles.createOrderBtnStyle}
                                >
                                    Create Order
                                </ButtonLeft>
                            </div>

                            <Box style={styles.boxStyle}>
                                <div style={styles.FormControlStyle}>
                                    <FormControl
                                        variant="outlined"
                                        required
                                        className={classes.formControl}
                                        disabled={!(plantsList && plantsList?.length > 0)}
                                    >
                                        <InputLabel
                                            htmlFor="outlined-selectAssembly-simple"
                                            style={styles.inputLableStyle}
                                        >
                                            Select Plant
                                        </InputLabel>
                                        <Select
                                            name="selectAssembly"
                                            id="selectAssembly"
                                            variant="outlined"
                                            style={styles.selectStyle}
                                            value={plantId}
                                            onChange={(e: any) => {
                                                handlePlantIdChange(e);
                                            }}
                                            displayEmpty
                                        >
                                            {plantsList &&
                                                plantsList.map((option: any) => (
                                                    <MenuItem key={option?.plantId} value={option?.plantId}>
                                                        {option?.details}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl
                                        variant="outlined"
                                        required
                                        className={classes.formControl}
                                        disabled={!(assembliesList && assembliesList?.length > 0)}
                                    >
                                        <InputLabel
                                            htmlFor="outlined-selectAssembly-simple"
                                            style={styles.inputLableStyle}
                                        >
                                            Select Assembly
                                        </InputLabel>
                                        <Select
                                            name="selectAssembly"
                                            id="selectAssembly"
                                            variant="outlined"
                                            style={styles.selectStyle}
                                            value={lineId}
                                            onChange={(e: any) => {
                                                handleLineIdChange(e);
                                            }}
                                            displayEmpty
                                        >
                                            {assembliesList &&
                                                assembliesList.map((option: any) => (
                                                    <MenuItem key={option?.lineId} value={option?.lineId}>
                                                        {option?.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </div>

                                <Box style={styles.boxStyleForGrid}>
                                    <DataGrid
                                        editMode="row"
                                        rows={orders ?? []}
                                        columns={columns}
                                        components={{
                                            Toolbar: () => {
                                                return (
                                                    <GridToolbarContainer sx={{ paddingLeft: '15px' }}>
                                                        {/* Grid Title */}
                                                        <Grid item>
                                                            <Typography variant={'h6'} color={'primary'}>
                                                                Orders List
                                                            </Typography>
                                                        </Grid>
                                                        {/* CSS--> Keep items at right side */}
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
                                            sorting: { sortModel: [{ field: 'fName', sort: 'asc' }] },
                                        }}
                                        pagination={undefined}
                                        onSelectionModelChange={(newSelection: any) => {
                                            // setSelection(newSelection?.[0]);
                                        }}
                                        onCellClick={(e: any) => {
                                            // setResetSelectedAddress(false);
                                            // setState({
                                            //     ...state,
                                            //     user: state.user === addresses?.[select] ? null : addresses,
                                            //     selectedReqData: addresses?.[select],
                                            // });
                                            // setViewDisable(false);
                                        }}
                                        sx={datagridCellStyle('18px')}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

            {createOrderDialog && (
                <Grid item xs={4}>
                    <SearchAppBar
                        onFilter={() => showFilter(true)}
                        title={title}
                        onBack={() => {
                            showCreateOrderDialog(false);
                        }}
                        onSearch={(data: any) => {
                            //apply search logic here
                        }}
                        classes={classes}
                    />

                    <CreateOrder
                        selectedEditOrder={title.includes('Edit') ? { selectedEditOrderData: selectedOrder } : {}}
                        title={title}
                        onResult={() => {
                            showCreateOrderDialog(false);
                        }}
                        response={{
                            showCreateOrderDialog,
                        }}
                    />
                </Grid>
            )}

            {editOrderDialog && (
                <Grid item xs={4}>
                    <SearchAppBar
                        onFilter={() => showFilter(true)}
                        title={title}
                        onBack={() => {
                            showCreateOrderDialog(false);
                        }}
                        onSearch={(data: any) => {
                            //apply search logic here
                        }}
                        classes={classes}
                    />

                    <CreateOrder
                        title={title}
                        onResult={() => {
                            showEditOrderDialog(false);
                        }}
                        response={{
                            showEditOrderDialog,
                        }}
                        autoRefreshProps={{ setPlantsList, setPlantId, setassembliesList, setOrdersList, setLineId, plantId }}
                    />
                </Grid>
            )}

            {assignStationDialog && (
                <Grid item xs={4}>
                    <SearchAppBar
                        onFilter={() => showFilter(true)}
                        title={title}
                        onBack={() => {
                            showAssignStationDialog(false);
                        }}
                        onSearch={(data: any) => {
                            //apply search logic here
                        }}
                        classes={classes}
                    />

                    <AssignStation
                        title={title}
                        lineId={lineId}
                        lines={assembliesList}
                        selectedOrderDetailsProps={{ selectedOrder }}
                        onResult={() => {
                            showAssignStationDialog(false);
                        }}
                        response={{
                            showAssignStationDialog,
                        }}
                    />
                </Grid>
            )}
        </Grid>
    );
};

const styles = {
    boxStyle: {
        height: 600,
        width: '100%',
    },
    boxStyleForGrid: {
        height: 400,
        width: '100%',
    },
    FormControlStyle: {
        border: `1px solid lightGray`,
        padding: '20px 16px 10px 16px',
        marginBottom: 36,
    },
    paperStyle: {
        overflow: 'hidden',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%',
        paddingTop: '2%',
    },
    createOrderBtnStyle: {
        margin: 0,
        marginRight: 25,
        float: 'none',
    },
    inputLableStyle: {
        backgroundColor: 'white',
    },
    selectStyle: {
        marginRight: 30,
    },
};
