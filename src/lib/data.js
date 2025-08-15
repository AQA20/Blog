import apiClient from './apiClient';
import { notFound } from 'next/navigation';
import { cache } from 'react';

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

// wrap it with handleAsyncError to catch errors and fetch
// the article by its slug
export const fetchArticle = c
  handleAsyncError(async (slug) => {
    const {
      data: { data },
    } = await apiClient.get(`/article/${slug}`);
    return data;
  });

// wrap it with handleAsyncError to catch errors and fetch
// the all the articles
export const fetchArticles = 
  handleAsyncError(async (options) => {
    const { orderBy, order, search, limit, page } = options;
    const normalizedPage = page ? page : 1;
    const normalizedOrderBy = orderBy ? orderBy : 'createdAt';
    const normalizedOrder = order ? order : 'DESC';
    const normalizedLimit = limit ? limit : 5;
    const normalizedSearch = search ? search : '';
    const {
      data: { data },
    } = await apiClient.get(
      `/articles?orderBy=${normalizedOrderBy}&order=${normalizedOrder}&search=${normalizedSearch}&limit=${normalizedLimit}&page=${normalizedPage}`,
    );

    return data;
  });

// Wrap it with handleAsyncError to catch errors and fetch
// all of article slugs
export const fetchArticleSlugs = cache(handleAsyncError(async () => {
  const {
    data: { data },
  } = await apiClient.get('/article/slugs');

  return data;
}));

export const fetchSuggestions = handleAsyncError(async (search) => {
  const term = search || '';

  const {
    data: { data },
  } = await apiClient.get(`/articles/suggestions?search=${term}`);
  return data;
});

export const fetchTags = cache(
  handleAsyncError(async (limit = 6) => {
    const {
      data: { data },
    } = await apiClient.get(`/tags/?limit=${limit}`);

    return data;
  }),
);

export const fetchTagArticles = cache(handleAsyncError(async (tag, options) => {
  const { orderBy, order, page } = options;
  const normalizedOrderBy = orderBy ? orderBy : 'createdAt';
  const normalizedOrder = order ? order : 'DESC';
  const normalizedPage = page ? page : 1;
  const url = `/tag/${tag}/articles?orderBy=${normalizedOrderBy}&order=${normalizedOrder}&page=${normalizedPage}`
  const res = await fetch(url, { next: { revalidate: 60 } });
  const json = await res.json();
  return json.data.data;
}));

export const updateArticleShare = handleAsyncError(async (id) => {
  await apiClient.put(`/article/share/${id}`);
});

export const fetchRelatedArticles = handleAsyncError(async (articleId, categoryId, tags) => {
  const tagIds = tags.map((tag) => tag.id).join(',');
  const {
    data: { data },
  } = await apiClient.get(
    `/articles/related/${articleId}?categoryId=${categoryId}&tagIds=${tagIds}`,
  );
  return data;
});