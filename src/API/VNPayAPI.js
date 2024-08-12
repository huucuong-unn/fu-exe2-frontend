import axiosClient from './AxiosClient';
const VNPayAPI = {
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

    doPay(data, includeAuthorization = false) {
        return axiosClient.post('/v1/vnpay/payment', data);
    },
    uploadImage(userProfile, form, includeAuthorization = false) {
        return axiosClient.post(`/v1/account/upload-image/${userProfile}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    downloadImage(id, includeAuthorization = false) {
        return axiosClient.post(`/v1/account/download-image/${id}`);
    },
    findAccountById(id) {
        return axiosClient.get(`/v1/account/${id}`);
    },
    login(data, includeAuthorization = false) {
        return axiosClient.post('/v1/auth/login', data);
    },
};

export default VNPayAPI;
