import apiClient from './apiClient';

export const fetchArticle = async (slug) => {
  try {
    const {
      data: { data },
    } = await apiClient.get(`/api/article-by-slug/${slug}`);
    return data;
  } catch (error) {
    throw new Error(`${error.message} - ${error.statusCode}`);
  }
};

export const fetchArticles = async () => {
  try {
    const {
      data: { data },
    } = await apiClient.get('/api/articles');

    return data;
  } catch (error) {
    throw new Error(`${error.message} - ${error.statusCode}`);
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
