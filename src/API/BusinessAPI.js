import axiosClient from './AxiosClient';

const BusinessAPI = {
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

    getTop4FeaturedCompanies(includeAuthorization = false) {
        const url = 'v1/business/feature-company?page=1&limit=4';
        return axiosClient.get(url);
    },
};

export default BusinessAPI;
