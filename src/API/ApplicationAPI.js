import axiosClient from './AxiosClient';
const ApplicationAPI = {
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

    getApplicationByStudentId(studentId, params, includeAuthorization = false) {
        const url = `/v1/application/student/${studentId}`;
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    applicationApprove(applicationId, params, includeAuthorization = false) {
        const url = `/v1/application/approve/${applicationId}`;
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig);
    },
    applicationReject(applicationId, data, includeAuthorization = false) {
        const url = `/v1/application/reject/${applicationId}`;
        const authorizedConfig = this.addAuthorizationHeader(data, includeAuthorization);
        return axiosClient.post(url, authorizedConfig);
    },
};
export default ApplicationAPI;
