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
  },
  {
    sequelize,
    timestamps: true,
  },
);

Article.associate = (models) => {
  Article.belongsTo(models.User, {
    through: 'authorId',
    as: 'author',
  });
  Article.belongsToMany(models.Tag, {
    through: 'ArticleTag',
    onDelete: 'CASCADE',
  });
  Article.belongsTo(models.Category, {
    foreignKey: 'categoryId',
    onDelete: 'SET NULL',
  });
  Article.hasMany(models.Image, {
    foreignKey: 'imageableId',
    constraints: false,
    scope: {
      imageableType: 'article',
    },
  });
};

// Article.hasMany(ArticleTag, { foreignKey: 'article_id'});

export default Article;
