//@ts-check
import axios from 'axios';
import { getToken } from './Common';

const axiosInstance = axios.create({
    baseURL: 'https://task-management-backend-dun.vercel.app',
});

axiosInstance.interceptors.request.use(
    config => {
        const token = getToken();
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;