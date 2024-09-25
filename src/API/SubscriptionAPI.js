import axiosClient from './AxiosClient';
const SubscriptionAPI = {
    getByUserId(id) {
        return axiosClient.get(`/v1/subscription/user/${id}`);
    },
};

export default SubscriptionAPI;
