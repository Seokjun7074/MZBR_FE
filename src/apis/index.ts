import axios, { InternalAxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('Authorization')}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
