import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import type { CommonResult } from '@yudao-quad-terminal/shared-types';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || '/admin-api',
  timeout: 30000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['tenant-id'] = localStorage.getItem('TENANT_ID') || '1';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (response: AxiosResponse<CommonResult>) => {
    const res = response.data;
    if (res.code === 0) {
      return res.data;
    }
    ElMessage.error(res.msg || '系统异常');
    return Promise.reject(new Error(res.msg || 'Error'));
  },
  (error) => {
    ElMessage.error(error.message || '网络请求失败');
    return Promise.reject(error);
  }
);

export const request = {
  get: <T = any>(config: AxiosRequestConfig): Promise<T> => {
    return service.request({ ...config, method: 'GET' });
  },
  post: <T = any>(config: AxiosRequestConfig): Promise<T> => {
    return service.request({ ...config, method: 'POST' });
  },
  put: <T = any>(config: AxiosRequestConfig): Promise<T> => {
    return service.request({ ...config, method: 'PUT' });
  },
  delete: <T = any>(config: AxiosRequestConfig): Promise<T> => {
    return service.request({ ...config, method: 'DELETE' });
  },
};

export default service;
