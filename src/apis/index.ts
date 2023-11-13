import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer `,
    'Authorization-refresh': 'Bearer ',
    ' member-id': '1',
  },
});
