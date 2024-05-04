import express from 'express';
import ArticleController from '../controllers/ArticleController.js';
import authorized from '../middleware/authorized.js';
import isAdmin from '../middleware/isAdmin.js';
import createArticleRequest from '../middleware/requests/articles/createArticleRequest.js';
import updateArticleRequest from '../middleware/requests/articles/updateArticleRequest.js';
import updateArticleStatus from '../middleware/requests/articles/updateArticleStatus.js';
import multerImageUpload from '../middleware/multerImageUpload.js';
import uploadFileRequest from '../middleware/requests/uploadFileRequest.js';
import createArticleCategoryRequest from '../middleware/requests/articles/createArticleCategoryRequest.js';
import { handleAsyncApiError } from '../utils/handleErrors.js';

const router = express.Router();

// Get all articles
router.get('/articles', handleAsyncApiError(ArticleController.getArticles));

// Get article by id
router.get(
  '/article/:id',
  handleAsyncApiError(ArticleController.getArticleById),
);

// Get article by title
router.get(
  '/article-by-slug/:slug',
  handleAsyncApiError(ArticleController.getArticleBySlug),
);

// Get sidebar articles
router.get(
  '/sidebar/articles',
  handleAsyncApiError(ArticleController.getSidebarArticles),
);

// Get tags
router.get('/tags', handleAsyncApiError(ArticleController.getTags));

// Create article
router.post(
  '/create-article',
  authorized,
  isAdmin,
  multerImageUpload.array('files', 5),
  createArticleRequest,
  handleAsyncApiError(ArticleController.createArticle),
);

// Update article
router.put(
  '/article/:id/update',
  authorized,
  isAdmin,
  updateArticleRequest,
  handleAsyncApiError(ArticleController.updateArticle),
);

// Update article status
router.put(
  '/article/:id/status',
  authorized,
  isAdmin,
  updateArticleStatus,
  handleAsyncApiError(ArticleController.updateArticleStatus),
);

// Set article thumbnail
router.post(
  '/article/:id/set-thumbnail',
  authorized,
  isAdmin,
  multerImageUpload.single('file'),
  uploadFileRequest,
  handleAsyncApiError(ArticleController.setArticleThumbnail),
);

// Create article category
router.post(
  '/article/:id/create-category',
  authorized,
  isAdmin,
  createArticleCategoryRequest,
  handleAsyncApiError(ArticleController.createArticleCategory),
);

export default router;
