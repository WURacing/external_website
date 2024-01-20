import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const backendURL = import.meta.env.VITE_APP_BACKEND_API_URL;

const axiosInstance = axios.create({
  baseURL: backendURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      const newConfig = { ...config };
      newConfig.headers.Authorization = `Bearer ${token}`;
      return newConfig;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    return Promise.reject(error);
  },
);

const backendAPIRequest = async <T>(
  endpoint: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axiosInstance({
      url: endpoint,
      ...options,
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
};

export default backendAPIRequest;
