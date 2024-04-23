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

const router = express.Router();

// Get all articles
router.get('/articles', ArticleController.getArticles);

// Get article
router.get('/article/:id', ArticleController.getArticle);

// Get sidebar articles
router.get('/sidebar/articles', ArticleController.getSidebarArticles);

// Create article
router.post(
  '/create-article',
  authorized,
  isAdmin,
  multerImageUpload.array('files', 5),
  createArticleRequest,
  ArticleController.createArticle,
);

// Update article
router.put(
  '/article/:id/update',
  authorized,
  isAdmin,
  multerImageUpload.array('files', 5),
  updateArticleRequest,
  ArticleController.updateArticle,
);

// Update article status
router.put(
  '/article/:id/status',
  authorized,
  isAdmin,
  updateArticleStatus,
  ArticleController.updateArticleStatus,
);

// Set article thumbnail
router.post(
  '/article/:id/set-thumbnail',
  authorized,
  isAdmin,
  multerImageUpload.single('file'),
  uploadFileRequest,
  ArticleController.setArticleThumbnail,
);

// Create article category
router.post(
  '/article/:id/create-category',
  authorized,
  isAdmin,
  createArticleCategoryRequest,
  ArticleController.createArticleCategory,
);

export default router;
