import apiClient from './apiClient';
import { notFound } from 'next/navigation';

// Wrapper function to handle asynchronous errors (Instead of repeating try/catch block in each asynchronous function)
const handleAsyncError = (func) => {
  return async (...args) => {
    try {
      return await func(...args);
    } catch (error) {
      console.error('error', error);
      if (error?.message === 'Article is not found') {
        return notFound();
      }
      if (error?.message && error?.statusCode) {
        throw new Error(`${error?.message} - ${error?.statusCode}`);
      }
      throw new Error(error);
    }
  };
};

export const fetchArticle = handleAsyncError(async (slug, cookies) => {
  const {
    data: { data },
  } = await apiClient.get(`/api/article/${slug}`, {
    headers: {
      Cookie: cookies,
    },
  });
  return data;
});

export const fetchArticles = handleAsyncError(async (options) => {
  const { orderBy, order, search, limit, page } = options;
  const normalizedPage = page ? page : 1;
  const normalizedOrderBy = orderBy ? orderBy : 'createdAt';
  const normalizedOrder = order ? order : 'DESC';
  const normalizedLimit = limit ? limit : 5;
  const normalizedSearch = search ? search : '';
  const {
    data: { data },
  } = await apiClient.get(
    `/api/articles?orderBy=${normalizedOrderBy}&order=${normalizedOrder}&search=${normalizedSearch}&limit=${normalizedLimit}&page=${normalizedPage}`,
  );

  return data;
});

export const fetchSuggestions = handleAsyncError(async (search) => {
  const term = search || '';

  const {
    data: { data },
  } = await apiClient.get(`/api/articles/suggestions?search=${term}`);
  return data;
});

export const fetchTags = handleAsyncError(async (limit = 7) => {
  const {
    data: { data },
  } = await apiClient.get(`/api/tags/?limit=${limit}`);

  return data;
});

export const fetchTagArticles = handleAsyncError(async (tag, options) => {
  const { orderBy, order, page } = options;
  const normalizedOrderBy = orderBy ? orderBy : 'createdAt';
  const normalizedOrder = order ? order : 'DESC';
  const normalizedPage = page ? page : 1;
  const {
    data: { data },
  } = await apiClient.get(
    `/api/tag/${tag}/articles?orderBy=${normalizedOrderBy}&order=${normalizedOrder}&page=${normalizedPage}`,
  );
  return data;
});

export const updateArticleShare = handleAsyncError(async (id) => {
  await apiClient.put(`/api/article/share/${id}`);
});
