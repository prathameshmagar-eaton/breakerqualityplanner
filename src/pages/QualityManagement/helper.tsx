/* eslint-disable */

import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const getQualityColumnsList = (): any => {
    const navigate = useNavigate();
    const columnsQualityList: GridColumns = [
        {
            field: 'orderId',
            headerName: 'Order Id',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'orderName',
            headerName: 'Order Name',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'oderDetails',
            headerName: 'Order Details',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
            align: 'left',
            width: 200,
            getActions: (e: any) => [
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        navigate('/order-details');
                    }}
                >
                    View Details
                </Button>,
            ],
        },
    ];
    return columnsQualityList;
};

export const getStationList = (): any => {
    const navigate = useNavigate();
    const columnsStationList: GridColumns = [
        {
            field: 'stationId',
            headerName: 'Station id',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'name',
            headerName: 'Station Name',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'details',
            headerName: 'Station Details',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
            align: 'left',
            width: 200,
            getActions: (e: any) => [
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        navigate('/checkList');
                    }}
                >
                    View CheckList
                </Button>,
            ],
        },
    ];
    return columnsStationList;
};

export const getOrdersColumnsListQualityMgmt = (): any => {
    const navigate = useNavigate();

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
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        navigate('/order-details', { state: { selectedOrderData: e?.row } });
                    }}
                >
                    View Details
                </Button>,
            ],
        },
    ];

    return columnsOrdersList;
};
