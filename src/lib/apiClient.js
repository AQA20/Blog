import axios from 'axios';

// Create Axios instance with default base URL
const apiClient = axios.create({
  baseURL: process.env.API_URL,
});

// Add a request interceptor for error handling
apiClient.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error.response?.data);
  },
);

export default apiClient;
