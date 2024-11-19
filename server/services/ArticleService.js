import Article from '../models/Article.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';
import Image from '../models/Image.js';
import Metrics from '../services/Metrics.js';
import db from '../config/databaseConnection.js';
import { Op } from 'sequelize';

export default class ArticleService {
  // Default page size
  static #pageSize = 5;

  // Update article shares or views
  static async updateArticleMetrics(req, options) {
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

  // Fetch an article with the specified associated models
  static async fetchArticle(query) {
    return await Article.findOne({
      where: { status: Article.APPROVED, ...query },
      include: [
        {
          model: User, // Model
          required: true, // forces an inner join
          as: 'author', // Alias name
          attributes: ['id', 'name'], // Columns to include
        },
        { model: Category, attributes: ['id', 'name'] },
        {
          model: Tag,
          attributes: ['id', 'name'],
        },
        { model: Image, attributes: ['id', 'name'] },
      ],
    });
  }

  // Find all of the articles with the necessary relations sorted by data in specific order
  static async getAllArticles(options) {
    // Destructure values from options object
    const { search, orderBy, order, pageSize, offset, status } = options;
    let searchQuery = {};
    if (search) {
      searchQuery = {
        title: {
          [Op.like]: `${search}%`,
        },
      };
    }

    // Find and count the articles
    const { rows, count } = await Article.findAndCountAll({
      where: {
        status,
        ...searchQuery,
        thumbnailId: {
          [Op.ne]: null, // Where thumbnailId not equal to null
        },
      },
      attributes: {
        exclude: ['content'], // Columns to exclude
        // Include a sub query to count views and shares for each article
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
          attributes: ['id', 'name'],
        },
        {
          model: User, // Model
          required: true, // forces an inner join
          as: 'author', // Alias name
          attributes: ['id', 'name'], // Columns to include
        },
      ],
      offset,
      limit: pageSize,
      order: [[db.sequelize.literal(orderBy), order]],
      distinct: true, // Remove duplicate rows
    });

    return { articles: rows, count };
  }
}
