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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControl,
    Button,
    colors,
    TextField,
} from '@mui/material';
import { useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import { LocalStorage } from '../../store/local-storage';
import { useDrawer } from '../../contexts/drawerContextProvider';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { Formik } from 'formik';
import ResponsiveDialog from '../../components/ResponsiveDialog';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AppStyle from '../../components/AppStyle';
import { createOrderSchema, objectInitCreateOrder } from './helper';
import { fetchPlantsList, orderPost } from './api';
import { getDateFormat } from '../GeneratePdf/helper';

export const CreateOrder = (props: any): JSX.Element => {
    const { selectedEditOrder, title, autoRefreshProps } = props;

    // const { setPlantsList, setPlantId, setassembliesList, setOrdersList, setLineId } = autoRefreshProps;

    const theme = useTheme();
    const securityHelper = useSecurityActions();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    const [state, setState] = useState(objectInitCreateOrder);

    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    const classes = AppStyle(theme);

    // const handleClose = (
    //     action: boolean,
    //     popupData1: {
    //         popupDialog: boolean;
    //         popupMessage: string;
    //         popupTitle: string;
    //     }
    // ): void => {
    //     const data = {
    //         status: action,
    //         data: state,
    //         popupData: popupData1,
    //     };
    //     props.onResult(data);
    //     setState(objectInitSelectRole);
    // };

    useEffect(() => {
        if (props?.title?.includes('Edit')) {
            if (props?.selectedEditOrder?.selectedEditOrderData?.success === 'success') {
                const editOrderData = {
                    item: selectedEditOrder?.selectedEditOrderData?.item,
                    description: selectedEditOrder?.selectedEditOrderData?.description,
                    quantity: selectedEditOrder?.selectedEditOrderData?.quantity,
                    date: selectedEditOrder?.selectedEditOrderData?.date,
                    breakerType: selectedEditOrder?.selectedEditOrderData?.breakerType,
                    sequenceNo: selectedEditOrder?.selectedEditOrderData?.sequenceNo,
                    details: selectedEditOrder?.selectedEditOrderData?.details,
                    lineId: selectedEditOrder?.selectedEditOrderData?.lineId,
                };

                setState(editOrderData);
            }
        }
    }, [selectedEditOrder?.selectedEditOrderData, title, autoRefreshProps?.plantId]);

    const handleFormikSubmit = (values: any) => {
        console.log(values);

        var formattedDate = getDateFormat(values.date);

        orderPost({ values, formattedDate })
            .then((response: any) => {
                if (response.success) {
                    fetchPlantsList().then((response: any) => {
                        autoRefreshProps?.setPlantsList(response?.data);
                        autoRefreshProps?.setPlantId(response?.data[0]?.plantId);
                        autoRefreshProps?.setassembliesList(response?.data[0]?.assemblyLines);
                        autoRefreshProps?.setOrdersList(response?.data[0]?.assemblyLines[0]?.orders);
                        autoRefreshProps?.setLineId(response?.data[0]?.assemblyLines[0]?.lineId);
                        props?.response?.showCreateOrderDialog(false);
                    });
                }
            })
            .catch(() => {});
    };

    return (
        <Box style={{}}>
            <Formik
                initialValues={state}
                onSubmit={(values: any) => {
                    handleFormikSubmit(values);
                }}
                validationSchema={createOrderSchema}
                enableReinitialize
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                    isValid,
                    dirty,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                    style={styles.accordionSummarystyle}
                                    expandIcon={<GridExpandMoreIcon />}
                                >
                                    <Typography>Fill the details</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={xs ? 12 : 6}>
                                            <FormControl variant="outlined" fullWidth required>
                                                <TextField
                                                    autoFocus
                                                    id="outlined-required"
                                                    label="Enter Item"
                                                    name="item"
                                                    value={values.item}
                                                    onChange={handleChange}
                                                    required
                                                    onBlur={handleBlur}
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                    data-testid="item"
                                                    error={touched.item && Boolean(errors.item)}
                                                    helperText={touched.item && errors.item}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControl variant="outlined" fullWidth required>
                                                <TextField
                                                    id="outlined-required"
                                                    label="Enter Description"
                                                    name="description"
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    required
                                                    onBlur={handleBlur}
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                    data-testid="description"
                                                    error={touched.description && Boolean(errors.description)}
                                                    helperText={touched.description && errors.description}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={xs ? 12 : 6}>
                                            <FormControl variant="outlined" fullWidth required>
                                                <TextField
                                                    id="outlined-required"
                                                    label="Enter Quantity"
                                                    name="quantity"
                                                    value={values.quantity}
                                                    onChange={handleChange}
                                                    required
                                                    onBlur={handleBlur}
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                    data-testid="quantity"
                                                    error={touched.quantity && Boolean(errors.quantity)}
                                                    helperText={touched.quantity && errors.quantity}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={xs ? 12 : 6}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    key={'date'}
                                                    label={'Order Date'}
                                                    onChange={(value: string | null) => {
                                                        setFieldValue('date', value || '');
                                                    }}
                                                    value={values.date}
                                                    disablePast
                                                    inputFormat="MM/dd/yyyy"
                                                    renderInput={(params: any) => (
                                                        <TextField
                                                            margin="normal"
                                                            id="date"
                                                            required
                                                            name="date"
                                                            variant="outlined"
                                                            onBlur={handleBlur}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            // data-testid={idVal}
                                                            {...params}
                                                            style={{ marginRight: 5 }}
                                                            error={touched.date && Boolean(errors.date)}
                                                            helperText={touched.date && errors.date}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </Grid>

                                        <Grid item xs={xs ? 12 : 6}>
                                            <FormControl variant="outlined" fullWidth required>
                                                <TextField
                                                    id="outlined-required"
                                                    label="Enter BreakerType"
                                                    name="breakerType"
                                                    value={values.breakerType}
                                                    onChange={handleChange}
                                                    required
                                                    onBlur={handleBlur}
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                    data-testid="breakerType"
                                                    error={touched.breakerType && Boolean(errors.breakerType)}
                                                    helperText={touched.breakerType && errors.breakerType}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={xs ? 12 : 6}>
                                            <FormControl variant="outlined" fullWidth required>
                                                <TextField
                                                    id="outlined-required"
                                                    label="Enter Sequence No."
                                                    name="sequenceNo"
                                                    value={values.sequenceNo}
                                                    onChange={handleChange}
                                                    required
                                                    onBlur={handleBlur}
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                    data-testid="sequenceNo"
                                                    error={touched.sequenceNo && Boolean(errors.sequenceNo)}
                                                    helperText={touched.sequenceNo && errors.sequenceNo}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={xs ? 12 : 6}>
                                            <FormControl variant="outlined" fullWidth required>
                                                <TextField
                                                    id="outlined-required"
                                                    label="Enter Details"
                                                    name="details"
                                                    value={values.details}
                                                    onChange={handleChange}
                                                    required
                                                    onBlur={handleBlur}
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                    data-testid="details"
                                                    error={touched.details && Boolean(errors.details)}
                                                    helperText={touched.details && errors.details}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={xs ? 12 : 6}>
                                            <FormControl variant="outlined" fullWidth required>
                                                <TextField
                                                    id="outlined-required"
                                                    label="Enter Assembly Line Id"
                                                    name="lineId"
                                                    value={values.lineId}
                                                    onChange={handleChange}
                                                    required
                                                    onBlur={handleBlur}
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                    data-testid="lineId"
                                                    error={touched.lineId && Boolean(errors.lineId)}
                                                    helperText={touched.lineId && errors.lineId}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>

                            <div>
                                <Button
                                    disabled={!dirty || isSubmitting || !isValid}
                                    variant="contained"
                                    color="primary"
                                    className={classes.buttonLeft}
                                    type="submit"
                                    style={styles.btnStyle}
                                    data-testid="createOrderBtn"
                                >
                                    {!props.title.includes('Edit') ? props.title.toLocaleUpperCase() : 'SAVE'}
                                </Button>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.buttonLeft}
                                    onClick={() => {
                                        props.onResult();
                                    }}
                                    style={styles.btnStyle}
                                >
                                    CANCEL
                                </Button>
                            </div>
                        </div>
                        {/* {console.log("dd3d3d3",errors)} */}
                    </form>
                )}
            </Formik>

            {/* <ResponsiveDialog
            imagePath={''}
            showOk={false}
            title={''}
            message={message}
            onClose={false}
            open={show}
        /> */}
        </Box>
    );
};

const styles = {
    accordionSummarystyle: {
        backgroundColor: colors.blue[50],
    },
    btnStyle: {
        zIndex: 100,
    },
};
