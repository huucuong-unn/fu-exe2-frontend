import axiosClient from './AxiosClient';

const MentorAPI = {
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
        const url = 'v1/mentor/mentor-with-all-information';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    getMentorByMentorProfileId(id, includeAuthorization = false) {
        const url = `v1/mentor/find-by-mentor-profile-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    getMentorsByCompanyId(id, includeAuthorization = false) {
        const url = `v1/mentor/find-by-mentors-company-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    getMentorsByCompanyIdV2(id, params, includeAuthorization = false) {
        const url = `v1/mentor/similar-mentors/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    getMentorsForAdminSearch(params, includeAuthorization = false) {
        const url = `/v1/mentor/mentor-for-admin-search`;
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
    getMentorsSearch(id, includeAuthorization = false) {
        const url = `/v1/mentor/mentor-for-list-choose/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({ id }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
};

export default MentorAPI;
