import axiosClient from './AxiosClient';
const PayosAPI = {
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

    goCheckout(data, includeAuthorization = false) {
        return axiosClient.post('/v1/order/create', data);
    },
};

export default PayosAPI;
