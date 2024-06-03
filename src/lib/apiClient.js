import axios from 'axios';

// Create Axios instance with default base URL
const apiClient = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8080',
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
    // reject with the specified error message from the server if it exist
    return Promise.reject(error.response?.data);
  },
);

export default apiClient;
