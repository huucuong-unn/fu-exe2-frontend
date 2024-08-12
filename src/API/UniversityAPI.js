import axiosClient from './AxiosClient';
const UniversityAPI = {
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

    getAllForDropDownList() {
        return axiosClient.get('v1/university/drop-down-list');
    },

    getAllFeedbackSystem(params, includeAuthorization = true) {
        const config = { params };
        return axiosClient.get(
            '/staff/feedback/search_sort',
            this.addAuthorizationHeader(config, includeAuthorization),
        );
    },

    create(data, includeAuthorization = false) {
        return axiosClient.post('/feedback', data, this.addAuthorizationHeader({}, includeAuthorization));
    },

    checkFeedbacked(params, includeAuthorization = false) {
        return axiosClient.get(
            '/feedback/count-by-orderId',
            { params },
            this.addAuthorizationHeader({}, includeAuthorization),
        );
    },

    countReview(params, includeAuthorization = false) {
        return axiosClient.get(
            '/feedback/count-by-species-id-or-species-color-id-and-rating',
            { params },
            this.addAuthorizationHeader({}, includeAuthorization),
        );
    },

    countReview2(params, includeAuthorization = false) {
        return axiosClient.get(
            '/feedback/count-by-species-id',
            { params },
            this.addAuthorizationHeader({}, includeAuthorization),
        );
    },

    changeStatus(id, includeAuthorization = true) {
        return axiosClient.put(
            `/staff/feedback/change-status/${id}`,
            null,
            this.addAuthorizationHeader({}, includeAuthorization),
        );
    },
    countFeedbackForDashBoard(includeAuthorization = true) {
        return axiosClient.get(`marketer/feedback/count-all`, this.addAuthorizationHeader({}, includeAuthorization));
    },
};

export default UniversityAPI;
