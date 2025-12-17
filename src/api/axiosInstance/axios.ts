import axios from 'axios';

const API = window.BASE_URL + '/api';
export const axiosInstance = axios.create({
    baseURL: API,
});
