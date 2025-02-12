/* eslint-disable */

import { BASE_URL } from '../../constants/apiUrls';
import axios from 'axios';

export const fetchOrderStationsByOrderId = (orderId: string): Promise<any> => {
    const url = `${BASE_URL}/api/Orders/${orderId}`;
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

export const fetchBreakerCheckListsQues = (): Promise<any> => {
    const url = `${BASE_URL}/api/BreakerCheckLists`;
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

export const postCheckList = (props: any): Promise<any> => {
    const url = `${BASE_URL}/api/checklists`;
    const header = {
        'Content-Type': 'application/text',
    };

    const body = {};

    return new Promise((resolve, reject): any =>
        axios
            .post(url, body, { headers: header })
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
