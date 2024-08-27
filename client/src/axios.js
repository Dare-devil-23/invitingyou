import axios from "axios";

const getBaseUrl = () => {
    if (window.location.port === '5173') {
        return 'http://127.0.0.1:5000/api';
    }

    return 'https://api.production.com';
};

const apiClient = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: true,
});

export default apiClient;
