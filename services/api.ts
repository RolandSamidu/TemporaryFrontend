import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Base URL for your backend (update based on your deployment or local setup)
const BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL (e.g., ngrok for local testing)

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token storage (simple in-memory for this example; use AsyncStorage for persistence)
let token: string | null = null;

export const setAuthToken = (newToken: string | null) => {
  token = newToken;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Request interceptor to attach token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;