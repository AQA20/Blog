// article.js
import { DataTypes, Model } from 'sequelize';
import db from '../config/databaseConnection.js';

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
};

export default Article;
