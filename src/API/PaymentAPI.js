import axiosClient from './AxiosClient';

const PaymentAPI = {
    addAuthorizationHeader(config, includeAuthorization) {
        if (includeAuthorization) {
            const token = JSON.parse(localStorage.getItem('accessToken'));
            config.headers = {
                Authorization: `Bearer ${token}`,
                ...config.headers,
            };
        }
        return config;
    },
    getPayments() {
        const url = `v1/payment`;
        return axiosClient.get(url);
    },
};

export default PaymentAPI;
