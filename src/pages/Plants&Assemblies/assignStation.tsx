/* eslint-disable */

import { useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import {
    useMediaQuery,
    useTheme,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControl,
    Button,
    colors,
    TextField,
    Typography,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Autocomplete,
    Chip,
    Checkbox,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { assignStationSchema, objectInitAssignStation } from './helper';
import { LocalStorage } from '../../store/local-storage';
import AppStyle from '../../components/AppStyle';
import { Formik } from 'formik';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { assignStationsToOrder, fetchStationsByLineId } from './api';

export const AssignStation: React.FC<any> = (props: any): JSX.Element => {
    const theme = useTheme();
    const securityHelper = useSecurityActions();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    const [state, setState] = useState(objectInitAssignStation);
    const [stationsList, setStationsList] = useState([]);

    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    const classes = AppStyle(theme);

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const handleFormikSubmit = (values: any) => {
        assignStationsToOrder({ selectedOrderDetails: props?.selectedOrderDetailsProps?.selectedOrder, values }).then(
            (response: any) => {
                if (response.success) {
                    props?.response?.showAssignStationDialog(false);
                }
            }
        );
    };

    useEffect(() => {
        setState({ ...objectInitAssignStation, lineId: props?.lineId });
        fetchStationsByLineId(props?.lineId).then((response) => {
            setStationsList(response?.data);
        });
    }, [props?.lineId]);

    // stationsList && stationsList.length ? stationsList.map((li: any) => console.log(li)) : null;

    return (
        <Box style={{}}>
            <Formik
                initialValues={state}
                onSubmit={(values: any) => {
                    handleFormikSubmit(values);
                }}
                validationSchema={assignStationSchema}
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
                                        <Grid item xs={12}>
                                            <FormControl variant="outlined" fullWidth margin="normal">
                                                <InputLabel
                                                    htmlFor="outlined-selectLine-simple"
                                                    style={{
                                                        backgroundColor: 'white',
                                                    }}
                                                >
                                                    Assembly Line
                                                </InputLabel>
                                                <Select
                                                    name="lineId"
                                                    id="lineId"
                                                    variant="filled"
                                                    fullWidth
                                                    disabled={props?.title.includes('Assign')}
                                                    value={values.lineId}
                                                    onChange={(e) => {
                                                        setFieldValue('lineId', e.target.value);
                                                    }}
                                                    onBlur={handleBlur}
                                                    error={touched.lineId && Boolean(errors.lineId)}
                                                    input={
                                                        <OutlinedInput name="lineId" id="outlined-selectLine-simple" />
                                                    }
                                                    data-testid="selectLine"
                                                >
                                                    {props?.lines &&
                                                        props?.lines.map((option: any) => (
                                                            <MenuItem key={option?.lineId} value={option?.lineId}>
                                                                {option?.name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControl variant="outlined" fullWidth required margin="normal">
                                                <Autocomplete
                                                    multiple
                                                    limitTags={2}
                                                    id="checkboxes-tags-stations"
                                                    defaultValue={[]}
                                                    disabled={stationsList.length < 1}
                                                    onBlur={handleBlur}
                                                    options={stationsList || []}
                                                    disableCloseOnSelect
                                                    getOptionLabel={(option: any) => {
                                                        return option?.name;
                                                    }}
                                                    value={values.stations}
                                                    renderTags={(valuesData: any, getTagProps: any) =>
                                                        valuesData.map((value: any, index: any) => (
                                                            <Chip
                                                                key={value?.lineId}
                                                                label={`${value?.name}`}
                                                                {...getTagProps({ index })}
                                                            />
                                                        ))
                                                    }
                                                    renderOption={(props, option: any, { selected }: any) => {
                                                        return (
                                                            <li {...props}>
                                                                <Checkbox
                                                                    icon={icon}
                                                                    checkedIcon={checkedIcon}
                                                                    style={{ marginRight: 8 }}
                                                                    checked={selected}
                                                                />
                                                                {option?.name}
                                                            </li>
                                                        );
                                                    }}
                                                    onChange={(_event: any, newValue: any) => {
                                                        setFieldValue('stations', newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label={'Add Stations'}
                                                            placeholder="Stations"
                                                            variant="outlined"
                                                            name={'stations'}
                                                            error={touched.stations && Boolean(errors.stations)}
                                                           // helperText={touched.stations && errors.stations}
                                                        />
                                                    )}
                                                    fullWidth
                                                ></Autocomplete>
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
                                    SAVE
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
