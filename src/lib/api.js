import axios from 'axios';

// Create Axios instance with default base URL
const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_API_URL
      : process.env.PROD_API_URL,
});

// Add a request interceptor for error handling
api.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export const fetchImage = async (id) => {
  try {
    const response = await api.get(`/api/image/${id}`, {
      responseType: 'arraybuffer',
    });

    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error('Error fetching image:', error);
    // Handle error gracefully (e.g., display a placeholder)
  }
};

export default api;
