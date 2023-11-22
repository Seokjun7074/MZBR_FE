import axios, { InternalAxiosRequestConfig } from 'axios';

import { PATH } from '@/constants/path';

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { data } = error.response;

    if (data.status === 401 && data.errorCode === 'Unauthorized') {
      const refreshToken = localStorage.getItem('Authorization-refresh');
      if (refreshToken) {
        originalRequest.headers['Authorization-refresh'] = `Bearer ${refreshToken}`;
        const newResponse = await axiosInstance(originalRequest);
        delete originalRequest.headers['Authorization-refresh'];
        localStorage.setItem('Authorization', newResponse.data.Authorization);
        localStorage.setItem('Authorization-refresh', newResponse.data['Authorization-refresh']);
        originalRequest.headers.Authorization = `Bearer ${newResponse.data.Authorization}`;
        return axiosInstance(originalRequest);
      }
      alert('인증이 만료되었습니다. 다시 로그인해주세요');
      window.location.replace(PATH.ROOT);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
