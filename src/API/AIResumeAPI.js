import axiosClient from './AxiosClient';

const AIResumeAPI = {
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
    reviewCV(id, includeAuthorization = false) {
        const url = `v1/coze/file`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
    getCoverLetter(data) {
        const url = `v1/coze/cover-letter`;
        return axiosClient.post(url, data);
    },
};

export default AIResumeAPI;
