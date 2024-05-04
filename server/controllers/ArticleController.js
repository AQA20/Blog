import db from '../config/databaseConnection.js';
import Article from '../models/Article.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';
import Image from '../models/Image.js';
import ArticleTag from '../models/ArticleTag.js';
import S3Client from '../services/S3Client.js';
import resHandler from '../services/ResHandler.js';
import ApiError from '../services/ApiError.js';
import createSlug from '../utils/createArticleSlug.js';
import DOMPurify from 'isomorphic-dompurify';

export default class ArticleController {
  static s3client = new S3Client();
  static sequelize = db.sequelize;

  static async #fetchImg(id) {
    const { name } = await Image.findByPk(id, {
      attributes: ['name'],
    });
    return await ArticleController.s3client.getFile(name);
  }

  static async #fetchImgs(images) {
    return await Promise.all(
      images.map(async (image) => {
        const imgUrl = await ArticleController.#fetchImg(image.id);
        image.setDataValue('imgUrl', imgUrl);
        return image;
      }),
    );
  }

  static async fetchAllArticles() {
    const articles = await Article.findAll({
      where: { status: Article.APPROVED },
      attributes: { exclude: ['content'] },
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Tag, attributes: ['id', 'name'] },
        { model: Image, attributes: ['id', 'name'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    return articles;
  }
  static async getSidebarArticles(req, res, next) {
    const articles = await Article.findAll({
      limit: 3,
      where: { status: Article.APPROVED },
      attributes: { exclude: ['content'] },
      include: [
        { model: Tag, attributes: ['id', 'name'] },
        { model: Image, attributes: ['id', 'name'] },
      ],
    });

    const articlesWithImgs = await Promise.all(
      articles.map(async (article) => {
        const featuredImg = await ArticleController.#fetchImg(
          article.thumbnailId,
        );
        article.setDataValue('featuredImg', featuredImg);
        const images = await ArticleController.#fetchImgs(article.Images);
        article.setDataValue('Images', images);
        return article;
      }),
    );
    return resHandler(200, articlesWithImgs, res);
  }

  static async getArticles(req, res, next) {
    const articles = await ArticleController.fetchAllArticles();
    const articlesWithImgs = await Promise.all(
      articles.map(async (article) => {
        const featuredImg = await ArticleController.#fetchImg(
          article.thumbnailId,
        );
        article.setDataValue('featuredImg', featuredImg);
        const images = await ArticleController.#fetchImgs(article.Images);
        article.setDataValue('Images', images);
        return article;
      }),
    );
    return resHandler(200, articlesWithImgs, res);
  }
  static async getTags(req, res, next) {
    const tags = await Tag.findAll({
      include: [
        {
          model: Article,
          attributes: ['id', 'title', 'description', 'thumbnailId', 'slug'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return resHandler(200, tags, res);
  }

  static async #getArticle(id, slug) {
    let query = {};
    if (id) {
      query = { id };
    } else {
      query = { slug };
    }
    const article = await Article.findOne({
      where: { status: Article.APPROVED, ...query },
      include: [
        { model: User, as: 'author', attributes: ['id', 'name'] },
        { model: Category, attributes: ['id', 'name'] },
        { model: Tag, attributes: ['id', 'name'] },
        { model: Image, attributes: ['id', 'name'] },
      ],
    });
    const featuredImg = await ArticleController.#fetchImg(article.thumbnailId);
    article.setDataValue('featuredImg', featuredImg);
    const images = await ArticleController.#fetchImgs(article.Images);
    article.setDataValue('images', images);
    return article;
  }

  static async getArticleById(req, res, next) {
    const article = await ArticleController.#getArticle(req.params.id, null);
    if (!article) {
      throw new ApiError('Article is not found', 404);
    }
  }
  static async getArticleBySlug(req, res, next) {
    const article = await ArticleController.#getArticle(null, req.params.slug);
    if (!article) {
      throw new ApiError('Article is not found', 404);
    }
    return resHandler(200, article, res);
  }
  static async #createArticleImage(articleId, name) {
    const image = await Image.create({
      imageableId: articleId,
      imageableType: Image.ARTICLE,
      name: name,
    });

    return image;
  }

  static async #createArticleCategory(category) {
    // Create category
    const [createdCategory] = await Category.findOrCreate({
      where: {
        name: category,
      },
    });
    return createdCategory.dataValues;
  }

  static async #createArticleTag(tag, articleId) {
    const [dbTag] = await Tag.findOrCreate({
      where: { name: tag },
    });
    await ArticleTag.create({
      tagId: dbTag.id,
      articleId,
    });
    return dbTag.dataValues;
  }

  static async #handleArticleImage(file, articleId) {
    const name = await ArticleController.s3client.uploadImg(null, file);
    const image = await ArticleController.#createArticleImage(articleId, name);
    if (file.isThumbnail) {
      await Article.update(
        { thumbnailId: image.id },
        {
          where: { id: articleId },
        },
      );
    }
    return image.dataValues;
  }

  static async #createArticleTags(tags, articleId) {
    return await Promise.all(
      tags.map(async (tag) => {
        return await ArticleController.#createArticleTag(tag, articleId);
      }),
    );
  }

  static async #createArticleImages(images, articleId) {
    return await Promise.all(
      images.map(async (image) => {
        return await ArticleController.#handleArticleImage(image, articleId);
      }),
    );
  }

  static async createArticle(req, res, next) {
    if (!req.files || req.files.length === 0) {
      throw new ApiError('Article must contain one image at least', 400);
    }

    const tags = req.body?.tags;

    if (!tags || tags.length < 2) {
      throw new ApiError('Article must has 2 tags at least', 400);
    }

    const images = req.files;
    if (!images || images.length == 0) {
      throw new ApiError('Article must has 1 image at least', 400);
    }

    // Set authorId which references the user_id and it's required
    req.body.authorId = req.user.id;

    // sanitize html content
    req.body.content = DOMPurify.sanitize(req.body.content);

    // Set article publish state
    req.body.status = req.user.isAdmin ? Article.APPROVED : Article.PENDING;

    await ArticleController.sequelize.transaction(async (transaction) => {
      // Create article category
      const category = await ArticleController.#createArticleCategory(
        req.body.category,
      );

      req.body.categoryId = category.id;
      // Delete category since there is not corresponding
      // category column in articles table
      delete req.body.category;
      req.body.slug = createSlug(req.body.title);

      // Create article
      const article = await Article.create(req.body, {
        include: [
          { model: User, as: 'author', attributes: ['id', 'name'] },
          { model: Category, attributes: ['id', 'name'] },
        ],
      });
      // Create article tags
      const createdTags = await ArticleController.#createArticleTags(
        tags,
        article.id,
      );
      article.setDataValue('tags', createdTags);
      // Upload article images
      const createdImages = await ArticleController.#createArticleImages(
        images,
        article.id,
      );
      article.setDataValue('images', createdImages);
      article.thumbnailId = createdImages[0].id;
      await article.save();
      return resHandler(201, article, res);
    });
  }

  static async updateArticle(req, res) {
    const articleId = req.params.id;
    const tags = req.body?.tags;
    const category = req.body?.category;

    if (req.body.content) {
      // sanitize html content
      req.body.content = DOMPurify.sanitize(req.body.content);
    }

    // Create article category if not exist
    if (category) {
      const createdCategory =
        await ArticleController.#createArticleCategory(category);
      req.body.categoryId = createdCategory.id;
      // There is no corresponding column name for category in articles table
      delete req.body.category;
    }

    // Update article
    await Article.update(req.body, { where: { id: articleId } });

    // Create article tags
    tags && (await ArticleController.#createArticleTags(tags, articleId));

    const article = await Article.findByPk(req.params.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'name'] },
        { model: Category, attributes: ['id', 'name'] },
        { model: Tag, attributes: ['id', 'name'] },
        { model: Image, attributes: ['id', 'name'] },
      ],
    });

    return resHandler(201, article, res);
  }
  static async updateArticleStatus(req, res) {
    // Update article status
    await Article.update(
      { status: req.body.status },
      { where: { id: req.params.id } },
    );
    return resHandler(201, 'Article status has been updated', res);
  }

  static async setArticleThumbnail(req, res) {
    const imgUrl = await ArticleController.s3client.uploadImg(null, req.file);
    const image = await ArticleController.#createArticleImage(
      req.params.id,
      imgUrl,
    );

    await Article.update(
      { thumbnailId: image.id },
      { where: { id: req.params.id } },
    );

    return resHandler(
      201,
      "Article's thumbnail image was set successfully",
      res,
    );
  }

  static async createArticleCategory(req, res, next) {
    const [category] = await Category.findOrCreate({
      where: { name: req.body.category },
    });
    await Article.update(
      { categoryId: category.id },
      { where: { id: req.params.id } },
    );
    return resHandler(201, category, res);
  }
}
