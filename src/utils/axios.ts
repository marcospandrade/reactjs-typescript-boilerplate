import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import history from './history';

const instance = axios.create({
    baseURL: 'http://localhost:8000/terminals/'
});

instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return config;
    }
    if (config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
        //config.headers['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InJvb3QiLCJleHAiOjE2MzY0NzczMTMsImVtYWlsIjoiMTIzQGdtYWlsLmNvbSJ9.R6oj1hkxyILUTx4nhDgxcsxIN-HEWu2MTU0ohnfzPn0`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Necessário realizar login novamente');
        setTimeout(() => {
            history.push('/');
        }, 3000);
        return Promise.reject(error);
        //config.headers['Authorization'] = null;
    }
    toast.error(error.response?.data?.message || 'Algo deu errado...');
    return Promise.reject(error);
});

export default instance;
