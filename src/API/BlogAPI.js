import axiosClient from './AxiosClient';

const BlogAPI = {
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
    getBlogs() {
        const url = `v1/blog/outstanding`;
        return axiosClient.get(url);
    },
};

export default BlogAPI;
