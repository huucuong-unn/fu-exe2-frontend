import axiosClient from './AxiosClient';
const TransactionAPI = {
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

    createApplication(data, includeAuthorization = false) {
        return axiosClient.post('/v1/application/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    getTransactionByAccountId(accountId, params, includeAuthorization = false) {
        const url = `/v1/transaction/account/${accountId}`;
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
    getAllTransactionForAdmin(params, includeAuthorization = false) {
        const url = '/v1/transaction/admin';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
};
export default TransactionAPI;
