import Article from '../models/Article.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';
import Image from '../models/Image.js';
import ArticleTag from '../models/ArticleTag.js';
import S3Client from '../services/S3Client.js';
import fs from 'fs';
import resHandler from '../services/ResHandler.js';
import uppercaseFirstChar from '../utils/uppercaseFirstChar.js';
import { ErrorHandler } from '../services/ErrorHandler.js';

export default class ArticleController {
  static s3client = new S3Client();

  static #deleteLocalTempFile(filepath) {
    // Delete a local file by it's path
    fs.unlink(filepath, (error) => {
      if (error) throw error;
    });
  }

  static async fetchAllArticles() {
    try {
      const articles = await Article.findAll({
        where: { status: Article.APPROVED },
        include: [
          { model: User, as: 'author', attributes: ['id', 'name'] },
          { model: Category, as: 'category', attributes: ['id', 'name'] },
          { model: Tag, as: 'tags', attributes: ['id', 'name'] },
          { model: Image, attributes: ['id', 'image_url'] },
        ],
      });
      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  static async getArticles(req, res, next) {
    try {
      const articles = await ArticleController.fetchAllArticles();
      return resHandler(200, articles, res);
    } catch (error) {
      next(error);
    }
  }

  static async getArticle(req, res, next) {
    try {
      const article = await Article.findOne({
        where: { status: Article.APPROVED, id: req.params.id },
        include: [
          { model: User, as: 'author', attributes: ['id', 'name'] },
          { model: Category, as: 'category', attributes: ['id', 'name'] },
          { model: Tag, as: 'tags', attributes: ['id', 'name'] },
          { model: Image, attributes: ['id', 'image_url'] },
        ],
      });
      return resHandler(200, article, res);
    } catch (error) {
      next(error);
    }
  }
  static async getArticleThumbnail(req, res, next) {
    try {
      const article = await Article.findOne({
        where: { status: Article.APPROVED, id: req.params.id },
        include: [
          { model: User, as: 'author', attributes: ['id', 'name'] },
          { model: Category, as: 'category', attributes: ['id', 'name'] },
          { model: Tag, as: 'tags', attributes: ['id', 'name'] },
          { model: Image, attributes: ['id', 'image_url'] },
        ],
      });
      return resHandler(200, article, res);
    } catch (error) {
      next(error);
    }
  }

  static async #createArticleImage(articleId, url) {
    const image = await Image.create({
      imageable_id: articleId,
      imageable_type: Image.ARTICLE,
      image_url: url,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return image;
  }

  static async #createArticleCategory(category) {
    // Create category
    const [createdCategory] = await Category.findOrCreate({
      where: {
        name: uppercaseFirstChar(category),
      },
    });
    return createdCategory;
  }

  static async #createArticleTag(tag, articleId) {
    const [dbTag] = await Tag.findOrCreate({
      where: { name: uppercaseFirstChar(tag) },
    });
    await ArticleTag.create({
      tag_id: dbTag.id,
      article_id: articleId,
    });
  }

  static async #handleArticleImage(file, articleId) {
    const imgUrl = ArticleController.s3client.uploadFile(file.path);
    const image = await ArticleController.#createArticleImage(
      articleId,
      imgUrl
    );
    if (file.isThumbnail) {
      await Article.update(
        { thumbnail_id: image.id },
        { where: { id: articleId } }
      );
    }
  }

  static async createArticle(req, res, next) {
    try {
      if (!req.files || req.files.length === 0) {
        throw new ErrorHandler(400, 'Article must contain one image at least');
      }

      // Set author_id which references the user_id and it's required
      req.body.author_id = req.user.id;

      // Set article publish state
      req.body.status = req.user.isAdmin ? Article.APPROVED : Article.PENDING;

      // Create article category
      req.body.category_id = ArticleController.#createArticleCategory(
        req.body.category
      ).id;

      // Create article
      const article = await Article.create(req.body);
      // Create article tags
      for (const tag of req.body.tags) {
        ArticleController.#createArticleTag(tag, article.id);
      }
      // Upload article images
      for (const file of req.files) {
        ArticleController.#handleArticleImage(file, article.id);
      }
      return resHandler(201, article, res);
    } catch (error) {
      next(error);
    } finally {
      if (req.files) {
        for (const file of req.files) {
          ArticleController.#deleteLocalTempFile(file.path);
        }
      }
    }
  }

  static async updateArticle(req, res, next) {
    try {
      // Create article category
      if (req.body.category) {
        req.body.category_id = ArticleController.#createArticleCategory(
          req.body.category
        ).id;
      }

      // Create article
      await Article.update(req.body, { where: { id: req.params.id } });

      // Create article tags
      if (req.body.tags) {
        for (const tag of req.body.tags) {
          ArticleController.#createArticleTag(tag, article.id);
        }
      }

      // Upload article images if any
      if (req.files && req.files instanceof Array) {
        for (const file of req.files) {
          ArticleController.#handleArticleImage(file, article.id);
        }
      }

      const article = await Article.findByPk(req.params.id);

      return resHandler(201, article, res);
    } catch (error) {
      next(error);
    } finally {
      if (req.files) {
        for (const file of req.files) {
          ArticleController.#deleteLocalTempFile(file.path);
        }
      }
    }
  }
  static async updateArticleStatus(req, res, next) {
    try {
      // Update article status
      await Article.update(
        { status: req.body.status },
        { where: { id: req.params.id } }
      );
      return resHandler(201, 'Article status has been updated', res);
    } catch (error) {
      next(error);
    } finally {
      if (req.files) {
        for (const file of req.files) {
          ArticleController.#deleteLocalTempFile(file.path);
        }
      }
    }
  }

  static async setArticleThumbnail(req, res, next) {
    try {
      const imgUrl = ArticleController.s3client.uploadFile(req.file.path);
      const image = await ArticleController.#createArticleImage(
        req.params.id,
        imgUrl
      );

      await Article.update(
        { thumbnail_id: image.id },
        { where: { id: req.params.id } }
      );

      return resHandler(
        201,
        "Article's thumbnail image was set successfully",
        res
      );
    } catch (error) {
      next(error);
    } finally {
      ArticleController.#deleteLocalTempFile(req.file.path);
    }
  }

  static async createArticleCategory(req, res, next) {
    try {
      const [category] = await Category.findOrCreate({
        where: { name: req.body.category },
      });
      await Article.update(
        { category_id: category.id },
        { where: { id: req.params.id } }
      );
      return resHandler(201, category, res);
    } catch (error) {
      next(error);
    }
  }
}
