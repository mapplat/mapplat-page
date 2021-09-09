import axios from 'axios';
import qs from 'qs';
import { SERVER_HOST } from '@/assets/env';

const instance = axios.create({
  baseURL: `${SERVER_HOST}/api`,
  timeout: 25000,
  headers: {
    token: localStorage.getItem('token'),
  },
  paramsSerializer(params) {
    return qs.stringify(params);
  },
});

instance.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error(error);
    return null;
  },
);
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return null;
  },
);

export default instance;
