import axiosClient from './AxiosClient';

const CompanyAPI = {
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
    getAllWithStatusActive(params, includeAuthorization = false) {
        const url = 'v1/company/company-status-true';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
    searchSortCompany(params, includeAuthorization = false) {
        const url = 'v1/company/search-sort';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
    getCompanyById(id, includeAuthorization = false) {
        const url = `v1/company/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    getAllWithStatusActiveWithoutPaging(includeAuthorization = false) {
        const url = 'v1/company/company-status-true-without-paging';
        const authorizedConfig = this.addAuthorizationHeader(includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
};

export default CompanyAPI;
