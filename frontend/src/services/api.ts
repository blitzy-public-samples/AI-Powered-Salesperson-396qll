import axios, { AxiosInstance } from 'axios';
import { get_settings } from 'app/core/config';

const API_BASE_URL = get_settings().API_BASE_URL;

// HUMAN ASSISTANCE NEEDED
// The following function may need additional error handling and authentication logic
export function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      // TODO: Add authentication logic here
      // For example, add a token to the headers
      // const token = getAuthToken();
      // if (token) {
      //   config.headers['Authorization'] = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // TODO: Add error handling logic here
      // For example, handle 401 Unauthorized errors
      // if (error.response && error.response.status === 401) {
      //   // Redirect to login page or refresh token
      // }
      return Promise.reject(error);
    }
  );

  return instance;
}