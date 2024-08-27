import axios from "axios";

const getBaseUrl = () => {
    if (window.location.port === '5173' || window.location.port === '3000') {
        return 'http://127.0.0.1:5000/api';
    }

    return 'https://invitingyou-test-server.vercel.app/api';
};

const apiClient = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: true,
});

export default apiClient;
