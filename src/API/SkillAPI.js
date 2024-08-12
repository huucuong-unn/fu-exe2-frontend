import axiosClient from './AxiosClient';

const SkillAPI = {
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
    getALLByCompanyId(id, includeAuthorization = false) {
        const url = `v1/skill/skills-by-company-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    getAll(includeAuthorization = false) {
        const url = 'v1/skill/all';
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
};

export default SkillAPI;
