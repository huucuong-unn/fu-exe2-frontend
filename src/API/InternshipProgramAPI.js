import axiosClient from './AxiosClient';

const InternshipProgramAPI = {
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
    getTop3OutstandingInternshipProgram() {
        const url = `v1/internship-program/top_3`;
        return axiosClient.get(url);
    },
    searchInternshipPrograms(keyword, page, limit, location) {
        const url = `v1/internship-program?keyword=${keyword}&page=${page}&limit=${limit}&location=${location}`;
        return axiosClient.get(url);
    },
};

export default InternshipProgramAPI;
