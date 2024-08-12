import axios from 'axios';
const handleAxiosError = (error) => {
    // Customize error handling based on your requirements.
    if (error.response) {
        // The request was made, but the server responded with an error status code (4xx or 5xx).
        console.error('Response error:', error.response);
        // You can use error.response.status to check the status code.
        if (error.response.status === 401) {
            // Unauthorized error (e.g., token expired), redirect to the login page.
            window.location.href = '/login';
        } else if (error.response.status === 403 || error.response.status === 500) {
            // Handle other error cases and redirect to an error page.
            // window.location.href = '/error';
        }
    }
};

const host = process.env.REACT_APP_BACKEND_APP_HOST_DEPLOY;

const axiosClient = axios.create({
    baseURL: `${host}/api/`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        handleAxiosError(error);
        return Promise.reject(error);
    },
);

export default axiosClient;
