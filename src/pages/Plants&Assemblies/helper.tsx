/* eslint-disable */

import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import { red, blue } from '@material-ui/core/colors';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { assignStationsToOrder, fetchOderDetailsByOrderId } from './api';

export const objectInitCreateOrder = {
    item: '',
    description: '',
    quantity: '',
    date: '',
    breakerType: '',
    sequenceNo: '',
    details: '',
    lineId: '',
};

export const objectInitAssignStation = {
    lineId: '',
    stations: [],
};

export const createOrderSchema = Yup.object().shape({
    item: Yup.string().required('Item required').trim().max(50, 'Please enter maximum 50 charachters'),
    description: Yup.string().required('Description required').trim().max(100, 'Please enter maximum 100 charachters'),
    quantity: Yup.number().positive().integer().required('Quantity required').min(1, 'Please enter minimum 1 quantity'),
    date: Yup.string().required('Date required'),
    breakerType: Yup.string().required('Breaker Type required').trim().max(50, 'Please enter maximum 50 charachters'),
    sequenceNo: Yup.string().required('Sequence No. required').trim(),
    details: Yup.string().required('Details required').trim().max(100, 'Please enter maximum 100 charachters'),
    lineId: Yup.string().required('Assembly Line Id required').trim(),
});

export const assignStationSchema = Yup.object().shape({
    lineId: Yup.string().required('Assembly Line Id required').trim(),
    stations: Yup.array().required('Station reuired').min(1, 'Minimum 1 station required'),
});

export const getOrdersColumnsList = (props: any): any => {
    const { showCreateOrderDialog, setTitle, setSelectedOrder, showAssignStationDialog } = props;

    const columnsOrdersList: GridColumns = [
        {
            field: 'orderId',
            headerName: 'Order Id',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'item',
            headerName: 'Item',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'breakerType',
            headerName: 'Breaker Type',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'sequenceNo',
            headerName: 'Sequence No',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'details',
            headerName: 'Details',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'lineId',
            headerName: 'Line Id',
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
            flex: 0.6,
            getActions: (e: any) => [
                <GridActionsCellItem
                    key="1"
                    icon={
                        <Tooltip title={'Edit Order'}>
                            <EditIcon style={{ fill: blue[500] }} />
                        </Tooltip>
                    }
                    onClick={() => {
                        if (showAssignStationDialog) showAssignStationDialog(false);
                        showCreateOrderDialog(true);
                        setTitle('Edit Order');
                        fetchOderDetailsByOrderId(e?.row?.orderId).then((result) => {
                            if (result?.success) {
                                setSelectedOrder({ ...result?.data, success: 'success', orderId: e?.row?.orderId });
                            }
                        });
                    }}
                    label={'Edit Order'}
                />,
                <GridActionsCellItem
                    key="2"
                    icon={
                        <Tooltip title={'Assign Station'}>
                            <AddIcon style={{ fill: blue[500] }} />
                        </Tooltip>
                    }
                    onClick={() => {
                        if (showCreateOrderDialog) showCreateOrderDialog(false);
                        showAssignStationDialog(true);
                        setTitle('Assign Station');
                        setSelectedOrder({ selectedOrderDetails: e?.row });
                    }}
                    label={'Assign Station'}
                />,
                <GridActionsCellItem
                    key="3"
                    icon={
                        <Tooltip title="Delete">
                            <DeleteIcon style={{ fill: red[500] }} />
                        </Tooltip>
                    }
                    onClick={() => {}}
                    label="Delete Order"
                />,
            ],
        },
    ];

    return columnsOrdersList;
};
