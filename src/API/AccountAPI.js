import axiosClient from './AxiosClient';
const AccountAPI = {
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

    createAccount(data, includeAuthorization = false) {
        return axiosClient.post('/v1/account/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    createAccountForCompany(data, includeAuthorization = false) {
        return axiosClient.post('/v1/account/create-company', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    createAccountForMentor(data, includeAuthorization = false) {
        return axiosClient.post('/v1/account/create-mentor', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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

    //new
    login(data, includeAuthorization = false) {
        return axiosClient.post('/v1/user/login', data);
    },

    //new
    loginWithGoogle(data, includeAuthorization = false) {
        return axiosClient.post('/v1/user/login-google', data);
    },

    //new
    register(data, includeAuthorization = false) {
        return axiosClient.post('/v1/user/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    getAccountForAdminSearch(params, includeAuthorization = false) {
        const url = `/v1/account/account-for-admin`;
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    getAccountProfile(id, includeAuthorization = false) {
        const url = `/v1/student/${id}`;
        const authorizedConfig = this.addAuthorizationHeader(includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    changeStatus(id, includeAuthorization = false) {
        const url = `/v1/account/change-status/${id}`;
        const authorizedConfig = this.addAuthorizationHeader(includeAuthorization);
        return axiosClient.put(url, authorizedConfig);
    },

    approveAccount(id, includeAuthorization = false) {
        const url = `/v1/account/approve/${id}`;
        const authorizedConfig = this.addAuthorizationHeader(includeAuthorization);
        return axiosClient.post(url, authorizedConfig);
    },

    rejectAccount(id, data, includeAuthorization = false) {
        const url = `/v1/account/reject/${id}`;
        const authorizedConfig = this.addAuthorizationHeader(data, includeAuthorization);
        return axiosClient.post(url, authorizedConfig);
    },
    getPoint(id, includeAuthorization = false) {
        const url = `/v1/account/point/${id}`;
        const authorizedConfig = this.addAuthorizationHeader(includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
    getAllAccount() {
        const url = `/v1/user`;
        return axiosClient.get(url);
    },
};

export default AccountAPI;
