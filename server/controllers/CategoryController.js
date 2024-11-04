import Category from '../models/Category.js';
import resHandler from '../services/ResHandler.js';
import Article from '../models/Article.js';
import Tag from '../models/Tag.js';
import softDelete from '../utils/softDelete.js';
import ImageService from '../services/ImageService.js';
import getQuery from '../utils/getQuery.js';
import ApiError from '../services/ApiError.js';
import db from '../config/databaseConnection.js';

export default class CategoryController {
  static #imgService = new ImageService();

  // Get a category by name or id
  static async getCategory(req, res, next) {
    const value = req.params.value;
    // Determine whether id or name was passed and return the corresponding query
    const query = getQuery(value, 'name');

    // Find the category depends on the query
    const category = await Category.findOne({
      where: { ...query, deletedAt: null },
    });

    if (!category) {
      throw new ApiError('Category was not found', 404);
    }
    // Return the response
    return resHandler(201, category, res);
  }

  // Get all of the categories
  static async getCategories(req, res, next) {
    // Fetch all categories from database
    const category = await Category.findAll({
      where: { deletedAt: null },
      limit: 16,
    });
    // Return the response
    return resHandler(200, category, res);
  }

  // Get a category with all of it's articles
  static async getCategoryWithArticles(req, res, next) {
    // Get the passed value
    const categoryId = req.params.id;
    // Find the category including it's articles
    const categoryArticles = await Article.findAll({
      where: { deletedAt: null, categoryId },
      attributes: ['id', 'title', 'description', 'thumbnailId'],
      include: [
        { model: Tag, attributes: ['id', 'name'] },
        { model: Category, attributes: ['id', 'name'] },
      ],
    });
    // Add the actual s3 image url for each article, await for all of the returning promises from map method
    const articlesWithFeaturedImgs = await Promise.all(
      categoryArticles.map(async (article) => {
        const ImageableWithImgUrl =
          await CategoryController.#imgService.getImageableWithImgUrl(
            article.thumbnailId,
            null,
            { imgLinkProperty: 'featuredImg', type: 'ARTICLE' },
          );
        article.setDataValue(
          'featuredImg',
          ImageableWithImgUrl.dataValues.featuredImg,
        );
        return article;
      }),
    );

    //Return the response
    return resHandler(200, articlesWithFeaturedImgs, res);
  }

  // Get categories ordered by ones with most amount of articles
  // Using raw query with sub query to prevent the ONLY_FULL_GROUP_BY error
  static async getCategoriesWithArticles(req, res, next) {
    const sequelize = db.sequelize;
    const categoriesWithCounts = await sequelize.query(
      `SELECT 
        Categories.id,
        Categories.name,
        Articles.title,
        Articles.description,
        Articles.thumbnailId,
        articleCounts.totalCount
      FROM Categories
      INNER JOIN Articles ON Categories.id = Articles.categoryId
      INNER JOIN (
          SELECT categoryId, COUNT(*) AS totalCount
          FROM Articles
          GROUP BY categoryId
      ) AS articleCounts ON Categories.id = articleCounts.categoryId 
      WHERE Articles.deletedAt IS NULL 
      ORDER BY articleCounts.totalCount DESC LIMIT 2`,
      {
        type: sequelize.QueryTypes.SELECT,
        raw: true,
        nest: true,
      },
    );
    // Return the response
    return resHandler(200, categoriesWithCounts, res);
  }
  static async createCategory(req, res, next) {
    // If category is already exist then return it
    // Otherwise create a new category
    const [category] = await Category.findOrCreate({
      where: {
        name: req.params.name,
      },
    });
    // Return the response
    return resHandler(201, category, res);
  }
  static async updateCategory(req, res, next) {
    // Get the passed categoryId from req.params object
    const categoryId = req.params.id;
    // Get the passed categoryName from req.params object
    const categoryName = req.params.name;
    // Update the category
    await Category.update(
      { name: categoryName },
      {
        where: {
          id: categoryId,
        },
      },
    );
    // Return the response
    return resHandler(201, 'Category updated successfully!', res);
  }

  static async deleteCategory(req, res, next) {
    // Get the passed categoryId from req.params object
    const categoryId = req.params.id;
    // Soft delete category
    const isDeleted = await softDelete(categoryId, Category, [
      { model: Article, name: 'Articles' },
    ]);

    // Check if category was successfully deleted
    if (isDeleted) {
      return resHandler(204, 'Category was successfully deleted!', res);
    }

    // Otherwise throw an error
    throw new ApiError(
      'Category cannot be deleted, it has one or more articles!',
      400,
    );
  }
}
