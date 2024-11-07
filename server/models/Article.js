// article.js
import { DataTypes, Model } from 'sequelize';
import db from '../config/databaseConnection.js';
import Metrics from '../services/Metrics.js';
import ImageService from '../services/ImageService.js';

const sequelize = db.sequelize;

class Article extends Model {
  static APPROVED = 'Approved';
  static PENDING = 'Pending';
  static REJECTED = 'Rejected';
  static TRASHED = 'Trashed';
}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(60),
      unique: true,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(60),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thumbnailId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Approved', 'Pending', 'Rejected', 'Trashed'),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

Article.associate = (models) => {
  Article.belongsTo(models.User, {
    through: 'authorId',
    as: 'author',
  });
  Article.belongsToMany(models.Tag, {
    through: 'ArticleTags',
  });
  Article.belongsTo(models.Category, {
    foreignKey: 'categoryId',
  });
  Article.hasMany(models.Image, {
    foreignKey: 'imageableId',
    constraints: false,
    scope: {
      imageableType: 'ARTICLE',
    },
  });
  Article.hasMany(models.View, {
    foreignKey: 'articleId',
  });
  Article.hasMany(models.Share, {
    foreignKey: 'articleId',
  });

  Article.hasMany(models.ArticleTag, {
    foreignKey: 'articleId',
    as: 'articleTags',
  });
};

// After finding an article (or articles), retrieve image URLs from S3 and append them to the article objects.
Article.afterFind(async (data) => {
  // Instantiate an ImageService instance for handling image URL retrieval
  const imgService = new ImageService();
  // If data is an array of articles and no Images are included in the data, exit early
  if (Array.isArray(data) && !data[0]?.Images) return;

  // Helper function to attach image URLs to an article
  const attachImageUrls = (article) => {
    if (!article || !article?.Images) return;
    // Get the URL of the thumbnail (featured image) for the article
    const thumbnailUrl = imgService.getImageUrl(
      article.Images,
      article.thumbnailId,
    );
    article.setDataValue('featuredImg', thumbnailUrl); // Attach the thumbnail image URL

    if (article.Images) {
      // Get and attach all related image URLs for the article
      const allImages = imgService.getImageUrls(article.Images);
      article.setDataValue('Images', allImages); // Attach all image URLs
    }
  };

  // If data is an array of articles, process each article
  if (Array.isArray(data)) {
    data.forEach(attachImageUrls);
  } else {
    // If only one article is returned, process it
    attachImageUrls(data);
  }
});

// Hook to clean up by soft deleting associated records when an Article is updated
Article.afterUpdate(async (article, options) => {
  const transaction = options.transaction;
  const { categoryId, oldCategoryId } = options.context;
  // If categoryId is being updated
  if (categoryId) {
    // Check if old category can be deleted
    const categoriesCount = await Article.count({
      where: { categoryId: oldCategoryId },
      transaction,
    });
    // If no other articles set to this category
    if (categoriesCount === 0) {
      // Soft delete the old associated category
      await db.models.Category.destroy({
        where: { id: oldCategoryId },
        transaction,
      });
    }
  }
});

// Hook to clean up by soft deleting associated records when an Article is deleted
Article.afterDestroy(async (article, options) => {
  const transaction = options.transaction;

  // Check if tags can be deleted
  const tagDeletions = article.Tags.map(async (tag) => {
    const articleTagCount = await db.models.ArticleTag.count({
      where: { tagId: tag.id },
      transaction,
    });

    // If there was only one ArticleTag, which links the deleted Article with a Tag
    if (articleTagCount === 1) {
      // Soft delete associated ArticleTag and Tag
      await db.models.ArticleTag.destroy({
        where: { articleId: article.id },
        transaction,
      });
      return db.models.Tag.destroy({ where: { id: tag.id }, transaction });
    }
  });

  // Check if the category can be deleted
  let categoryDeletion;
  const categoryArticleCount = await Article.count({
    where: { categoryId: article.categoryId },
    transaction,
  });

  // If no other articles set to this category
  if (categoryArticleCount === 0) {
    categoryDeletion = db.models.Category.destroy({
      where: { id: article.categoryId },
      transaction,
    });
  }

  // Soft delete associated images
  const imageDeletions = article.Images.map(async (image) =>
    db.models.Image.destroy({ where: { id: image.id }, transaction }),
  );

  // Delete article metrics
  await Metrics.deleteMetrics(article.id, transaction);

  // Execute all deletions
  await Promise.all([...tagDeletions, categoryDeletion, ...imageDeletions]);
});

export default Article;
