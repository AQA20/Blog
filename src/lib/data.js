import apiClient from './apiClient';

export const fetchImage = async (id) => {
  try {
    const response = await apiClient.get(`/api/image/${id}`, {
      responseType: 'arraybuffer',
    });
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    throw new Error(`Error fetching image: ${error.message}}`);
  }
};

export const fetchArticles = async () => {
  try {
    const {
      data: { data },
    } = await apiClient.get('/api/articles');
    return data;
  } catch (error) {
    throw new Error(`Error fetching articles: ${error.message}}`);
  }
};

export const fetchSidebarData = async () => {
  try {
    const {
      data: { data },
    } = await apiClient.get('/api/sidebar/articles');
    return data;
  } catch (error) {
    throw new Error(`Error fetching sidebar data: ${error.message}}`);
  }
};
