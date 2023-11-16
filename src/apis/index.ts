import axios, { InternalAxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('Authorization')}`;
    config.headers['member-id'] = `${localStorage.getItem('userId')}`;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
