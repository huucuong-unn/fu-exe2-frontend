import axiosClient from '~/API/AxiosClient';

const MentorProfileAPI = {
    addAuthorizationHeader(config = {}, includeAuthorization) {
        if (includeAuthorization) {
            const token = JSON.parse(localStorage.getItem('accessToken'));
            config.headers = {
                Authorization: `Bearer ${token}`,
                ...config.headers,
            };
        }
        return config;
    },

    getAllMentorProfiles(mentorId, params = {}, includeAuthorization = false) {
        const url = `https://tortee-463vt.ondigitalocean.app/api/v1/mentor-profile/all/mentor/${mentorId}`;
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    getMentorProfileById(id, includeAuthorization = false) {
        const url = `https://tortee-463vt.ondigitalocean.app/api/v1/mentor-profile/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    // Additional API methods can be added here as needed
};

export default MentorProfileAPI;
