import { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { PATH } from '@/constants/path';

import { axiosInstance } from '@/apis';

interface ErrorResponsetype {
  status: number;
  errorCode: string;
}

export const addAccessToken = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('Authorization')}`;
  config.headers['member-id'] = `${localStorage.getItem('userId')}`;
  return config;
};

export const handelRefreshToken = async (error: AxiosError) => {
  const originalRequest = error.config!;
  if (!error.response || !originalRequest) throw new Error('에러가 발생했습니다.');

  const data = error.response.data as ErrorResponsetype;

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
};
