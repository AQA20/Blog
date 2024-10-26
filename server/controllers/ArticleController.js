import Article from '../models/Article.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';
import Image from '../models/Image.js';
import View from '../models/View.js';
import Share from '../models/Share.js';
import Metrics from '../services/Metrics.js';
import resHandler from '../services/ResHandler.js';
import S3Service from '../services/S3Client.js';
import ApiError from '../services/ApiError.js';
import createSlug from '../utils/createArticleSlug.js';
import DOMPurify from 'isomorphic-dompurify';
import db from '../config/databaseConnection.js';
import getQuery from '../utils/getQuery.js';
import { Op } from 'sequelize';

export default class ArticleController {
  static #s3Service = new S3Service();
  static #pageSize = 5;

  // Add the actual s3 image url for an array of images
  static #addImgUrls(images) {
    // Loop over the images array
    return images.map((image) => {
      // Fetch each image url from s3 using it's name
      const imgUrl = ArticleController.#s3Service.getFile(image.name);
      // Append the img url to image as imgUrl
      image.setDataValue('imgUrl', imgUrl);
      return image;
    });
  }

  // Add actual s3 image urls for an array of articles
  static #addArticleImgUrls(articles) {
    // Loop over the article
    const articlesWithImgs = articles.map((article) => {
      // Get the thumbnailImg from the article.Images array
      // Instead of querying the database
      const thumbnailImg = article.Images.find(
        (image) => image.id === article.thumbnailId,
      );
      // Get the actual s3 image url for the article thumbnail image
      const featuredImg = ArticleController.#s3Service.getFile(
        thumbnailImg.name,
      );
      // Append the image url to the article
      article.setDataValue('featuredImg', featuredImg);
      // Add the actual s3 url for all of the article images
      const images = ArticleController.#addImgUrls(article.Images);
      // Append the new images which have the image urls
      article.setDataValue('Images', images);
      return article;
    });
    return articlesWithImgs;
  }

  // Update article shares or views
  static async #updateArticleMetrics(req, options) {
    const { articleId, model, metricName } = options;
    if (
      [articleId, model, metricName].some(
        (item) => !item || item === 'undefined',
      )
    ) {
      throw new Error(
        'Missing required options, make sure to pass all of the required options (articleId, metric, metricName)',
      );
    }

    // Default cookie
    const cookie = {
      secure: process.env.NODE_ENV === 'production', // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
      origin: 'strict', // Restricts cookie to same-site requests
      maxAge: 86400000, // One day In ms
    };

    // Get the user's ip address
    const ipAddress =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    // Get uuid from cookies if it was set previously
    const uuid = req.cookies?.[metricName];

    // Create a data object containing the necessary data to update a metric
    const data = { uuid, ipAddress, articleId };
    const metricUUID = await Metrics.updateMetric(model, data);
    return {
      metricUUID,
      cookie,
    };
  }

  // Update article shares
  static async updateShareArticle(req, res, next) {
    const articleId = req.params.id;

    const { metricUUID, cookie } =
      await ArticleController.#updateArticleMetrics(req, {
        articleId,
        model: Share,
        metricName: 'shareUUID',
      });
    res.cookie('shareUUID', metricUUID, cookie);
    return resHandler(200, 'Article share counts have been updated', res);
  }

  static async getArticle(req, res, next) {
    const value = req.params.value;
    // Determine whether id or slug was passed and return the corresponding query
    const query = getQuery(value, 'slug');
    db.sequelize.transaction(async (t) => {
      const article = await Article.findOne({
        where: { status: Article.APPROVED, ...query },
        include: [
          {
            model: User,
            required: true,
            as: 'author',
            attributes: ['id', 'name'],
          },
          { model: Category, attributes: ['id', 'name'] },
          {
            model: Tag,
            through: {
              attributes: [],
              where: {
                deletedAt: null,
              },
            },
            attributes: ['id', 'name'],
          },
          { model: Image, attributes: ['id', 'name'] },
        ],
      });
      if (!article) {
        return next(new ApiError('Article is not found', 404));
      }
      const thumbnailImg = article.Images.find(
        (image) => image.id === article.thumbnailId,
      );

      // Fetch article's featured image from s3
      const featuredImg = ArticleController.#s3Service.getFile(
        thumbnailImg.name,
      );
      // Attach the featuredImg to the article object
      article.setDataValue('featuredImg', featuredImg);
      // Fetch other articles images from s3
      const images = await ArticleController.#addImgUrls(article.Images);
      article.setDataValue('Images', images);

      const { metricUUID, cookie } =
        await ArticleController.#updateArticleMetrics(req, {
          articleId: article.id,
          model: View,
          metricName: 'viewUUID',
        });
      res.cookie('viewUUID', metricUUID, cookie);
      return resHandler(200, article, res);
    });
  }

  // Find all of the articles with the necessary relations sorted by data in specific order
  static async #getAllArticles(options) {
    const { search, orderBy, order, pageSize, offset } = options;
    let searchQuery;
    if (search) {
      searchQuery = {
        title: {
          [Op.like]: `${search}%`,
        },
      };
    } else {
      searchQuery = {};
    }

    const { rows, count } = await Article.findAndCountAll({
      where: {
        status: Article.APPROVED,
        ...searchQuery,
        thumbnailId: {
          [Op.ne]: null,
        },
      },
      attributes: {
        exclude: ['content'],
        // Include a sub query to count views for each article
        include: [
          [
            db.sequelize.literal(
              '(SELECT COUNT(*) FROM Views WHERE Views.articleId = Article.id)',
            ),
            'views',
          ],
          [
            db.sequelize.literal(
              '(SELECT COUNT(*) FROM Shares WHERE Shares.articleId = Article.id)',
            ),
            'shares',
          ],
        ],
      },

      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
        {
          model: Tag,
          through: {
            attributes: [],
            where: {
              deletedAt: null,
            },
          },
          attributes: ['id', 'name'],
        },
        {
          model: Image,
          where: { imageableType: Image.ARTICLE },
          attributes: ['id', 'name'],
        },
      ],
      offset,
      limit: pageSize,
      order: [[db.sequelize.literal(orderBy), order]],
      distinct: true,
    });

    // Fetch article images
    const articlesWithImgs = ArticleController.#addArticleImgUrls(rows);
    return { articles: articlesWithImgs, count };
  }

  // Get search article suggestions
  static async getSearchSuggestions(req, res, next) {
    try {
      const search = req.query.search;
      const articles = await Article.findAll({
        where: {
          status: Article.APPROVED,
          deletedAt: null,
          title: {
            [Op.like]: `${search}%`,
          },
        },
        limit: 5,
        attributes: ['title', 'slug'],
        order: [['createdAt', 'DESC']],
      });
      return resHandler(200, articles, res);
    } catch (error) {
      console.error('Error fetching search suggestions:', error); // Log the error for debugging
      return resHandler(500, 'Internal Server Error', res);
    }
  }

  static async getArticles(req, res, next) {
    const query = req.query;
    const badValues = ['undefined', 'null'];
    if (Object.values(query).some((value) => badValues.indexOf(value) !== -1)) {
      throw new ApiError('Bad request unexpected value', 400);
    }
    // Get optional queries
    const search = query.search || '';
    const orderBy = query.orderBy || 'createdAt';
    const order = query.order || 'DESC';
    const page = query.page ? Number(req.query.page) : 1;
    const pageSize = query?.limit
      ? Number(query.limit)
      : ArticleController.#pageSize;
    const offset = (page - 1) * pageSize;

    const { count, articles } = await ArticleController.#getAllArticles({
      search,
      orderBy,
      order,
      pageSize,
      offset,
    });

    const data = {
      currentPage: page,
      totalPages: Math.ceil((count || 0) / pageSize),
      articles,
    };
    return resHandler(200, data, res);
  }

  static async createArticle(req, res, next) {
    // Set authorId which references the user_id and it's required
    req.body.authorId = req.user.id;

    // sanitize html content
    req.body.content = DOMPurify.sanitize(req.body.content);

    // Set article publish state
    req.body.status = Article.PENDING;

    // Create an article slug using article's title
    req.body.slug = createSlug(req.body.title);

    // Create article
    const article = await Article.create(req.body, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'name'] },
        { model: Category, attributes: ['id', 'name'] },
        { model: Image, attributes: ['id', 'name'] },
        { model: Tag, required: true, attributes: ['id', 'name'] },
      ],
    });
    return resHandler(201, article, res);
  }

  static async updateArticle(req, res) {
    const articleId = req.params.id;
    const content = req.body?.content;
    const thumbnailId = req.body?.thumbnailId;

    // Managed transactions
    // all queries will automatically look for a transaction on the namespace
    // as we have cls-hooked (CLS) module and instantiate a namespace in config/databaseConnection.js.
    await db.sequelize.transaction(async (t) => {
      if (thumbnailId) {
        const imageableModel = await Image.findByPk(thumbnailId);
        if (!imageableModel) {
          throw new ApiError('Incorrect thumbnailId', 400);
        }
      }

      if (content) {
        // sanitize html content
        req.body.content = DOMPurify.sanitize(content);
      }

      // Update article
      await Article.update(req.body, { where: { id: articleId } });

      // Refetch the updated article
      const article = await Article.findByPk(articleId, {
        include: [
          { model: User, as: 'author', attributes: ['id', 'name'] },
          { model: Category, attributes: ['id', 'name'] },
          { model: Image, attributes: ['id', 'name'] },
          { model: Tag, attributes: ['id', 'name'] },
        ],
      });

      const thumbnailImg = article.Images.find(
        (image) => image.id === article.thumbnailId,
      );
      const featuredImg = ArticleController.#s3Service.getFile(
        thumbnailImg.name,
      );
      article.setDataValue('featuredImg', featuredImg);

      // Return the updated article
      return resHandler(201, article, res);
    });
  }

  static async updateArticleStatus(req, res) {
    // Update article status on accessible by admins
    await Article.update(
      { status: req.body.status },
      { where: { id: req.params.id } },
    );
    return resHandler(201, 'Article status has been updated', res);
  }
}
