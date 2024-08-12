import axiosClient from './AxiosClient';
const CampaignMentorProfileAPI = {
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
    chooseMentor(data, includeAuthorization = false) {
        return axiosClient.post('v1/campaign-mentor-profile/create', data);
    },
};

export default CampaignMentorProfileAPI;
