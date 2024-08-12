import axiosClient from './AxiosClient';

const MentorApplyAPI = {
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

    findAllByMenteeNameAndMentorFullNameAndCampaignIdAndCompanyId(params, includeAuthorization = false) {
        const url = 'v1/mentor-apply/search';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    findMentorApplysByStudentId(studentId, includeAuthorization = false) {
        const url = `v1/mentor-apply/student/${studentId}`;
        const authorizedConfig = this.addAuthorizationHeader(includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
};

export default MentorApplyAPI;
