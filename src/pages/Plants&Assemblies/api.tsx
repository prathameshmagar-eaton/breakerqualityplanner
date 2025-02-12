/* eslint-disable */

import axios from 'axios';
import { BASE_URL } from '../../constants/apiUrls';

export const fetchPlantsList = (): Promise<any> => {
    const url = `${BASE_URL}/api/plants`;
    const header = {
        'Content-Type': 'application/text',
        'Access-Control-Allow-Origin': '*',
    };

    return new Promise((resolve, reject): any =>
        axios
            .get(url, { headers: header })
            .then((response) => {
                if (response.status === 200) {
                    resolve({ success: true, data: response?.data });
                }
            })
            .catch((error) => {
                reject({ success: false, data: error?.message, errorResponse: error?.response?.data });
            })
    );
};

export const fetchPlantDetailsByPlantId = (props: any): Promise<any> => {
    const { e, setPlantId } = props;

    setPlantId(e.target.value);
    const plantId = e.target.value;

    const url = `${BASE_URL}/api/plants/${plantId}`;
    const header = {
        'Content-Type': 'application/text',
        'Access-Control-Allow-Origin': '*',
    };

    return new Promise((resolve, reject): any =>
        axios
            .get(url, { headers: header })
            .then((response) => {
                if (response.status === 200) {
                    resolve({ success: true, data: response?.data });
                }
            })
            .catch((error) => {
                reject({ success: false, data: error?.message, errorResponse: error?.response?.data });
            })
    );
};

export const fetchOderDetailsByOrderId = (orderId: string): Promise<any> => {
    const url = `${BASE_URL}/api/Orders/${orderId}`;
    const header = {
        'Content-Type': 'application/text',
        'Access-Control-Allow-Origin': '*',
    };

    return new Promise((resolve, reject): any =>
        axios
            .get(url, { headers: header })
            .then((response) => {
                if (response.status === 200) {
                    resolve({ success: true, data: response?.data });
                }
            })
            .catch((error) => {
                reject({ success: false, data: error?.message, errorResponse: error?.response?.data });
            })
    );
};

export const fetchOderDetailsByLineId = (props: any): Promise<any> => {
    const { e, setLineId } = props;

    setLineId(e.target.value);
    const lineId = e.target.value;

    const url = `${BASE_URL}/api/Orders/parent/${lineId}`;
    const header = {
        'Content-Type': 'application/text',
    };

    return new Promise((resolve, reject): any =>
        axios
            .get(url, { headers: header })
            .then((response) => {
                if (response.status === 200) {
                    resolve({ success: true, data: response?.data });
                }
            })
            .catch((error) => {
                reject({ success: false, data: error?.message, errorResponse: error?.response?.data });
            })
    );
};

export const fetchStationsByLineId = (lineId: string): Promise<any> => {
    const url = `${BASE_URL}/api/Stations/parent/${lineId}`;
    const header = {
        'Content-Type': 'application/text',
    };

    return new Promise((resolve, reject): any =>
        axios
            .get(url, { headers: header })
            .then((response) => {
                if (response.status === 200) {
                    resolve({ success: true, data: response?.data });
                }
            })
            .catch((error) => {
                reject({ success: false, data: error?.message, errorResponse: error?.response?.data });
            })
    );
};

export const assignStationsToOrder = (props: any): Promise<any> => {
    console.log(props?.selectedOrderDetails?.selectedOrderDetails?.orderId);
    // const { selectedOrderDetails, values } = props;

    const orderId = props?.selectedOrderDetails?.selectedOrderDetails?.orderId;
    const url = `${BASE_URL}/api/Orders/${orderId}`;
    const header = {
        'Content-Type': 'application/json',
    };
    const orderStations: Array<{ [key: string]: any }> = [];

    props?.values?.stations.map((station: any) => {
        orderStations.push({ orderId: orderId, stationId: station?.stationId });
    });

    const body = {
        orderId: orderId,
        item: props?.selectedOrderDetails?.selectedOrderDetails?.item,
        description: props?.selectedOrderDetails?.selectedOrderDetails?.description,
        quantity: props?.selectedOrderDetails?.selectedOrderDetails?.quantity,
        date: props?.selectedOrderDetails?.selectedOrderDetails?.date,
        breakerType: props?.selectedOrderDetails?.selectedOrderDetails?.breakerType,
        sequenceNo: props?.selectedOrderDetails?.selectedOrderDetails?.sequenceNo,
        details: props?.selectedOrderDetails?.selectedOrderDetails?.details,
        lineId: props?.selectedOrderDetails?.selectedOrderDetails?.lineId,
        createdBy: props?.selectedOrderDetails?.selectedOrderDetails?.createdBy,
        createdWhen: props?.selectedOrderDetails?.selectedOrderDetails?.createdWhen,
        touchedBy: props?.selectedOrderDetails?.selectedOrderDetails?.touchedBy,
        touchedWhen: props?.selectedOrderDetails?.selectedOrderDetails?.touchedWhen,
        isDeleted: props?.selectedOrderDetails?.selectedOrderDetails?.isDeleted,
        orderStations,
    };

    console.log(body);
    return new Promise((resolve, reject): any =>
        axios
            .put(url, body, { headers: header })
            .then((response) => {
                if (response.status === 204) {
                    resolve({ success: true, data: response?.data });
                }
            })
            .catch((error) => {
                reject({ success: false, data: error?.message, errorResponse: error?.response?.data });
            })
    );
};

export const orderPost = (props: any): Promise<any> => {
    const { item, description, quantity, breakerType, sequenceNo, details, lineId } = props.values;

    const url = `${BASE_URL}/api/Orders`;
    const header = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    const body = {
        item,
        description,
        quantity,
        date: props?.formattedDate,
        breakerType,
        sequenceNo,
        details,
        lineId,
        orderStations: [],
        createdBy: 'E0440133',
        createdWhen: '2023-06-06T00:00:00+00:00',
        touchedBy: 'E0440133',
        touchedWhen: '2023-06-06T00:00:00+00:00',
        isDeleted: false,
    };

    return new Promise((resolve, reject): any =>
        axios
            .post(url, body, { headers: header })
            .then((response) => {
                if (response.status === 201) {
                    resolve({ success: true, data: response.data });
                }
            })
            .catch((error) => {
                reject({ success: false, data: error.message, errorResponse: error.response.data });
            })
    );
};
