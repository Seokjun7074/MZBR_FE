import axios from 'axios';

import { addAccessToken, handelRefreshToken } from '@/apis/interceptor';

export const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(addAccessToken, (err) => {
  return Promise.reject(err);
});

axiosInstance.interceptors.response.use((response) => response, handelRefreshToken);
