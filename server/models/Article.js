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
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thumbnail_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Approved', 'Pending', 'Rejected', 'Trashed'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Article',
    tableName: 'articles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Article.associate = (models) => {
  Article.belongsTo(models.User, {
    foreignKey: 'author_id',
    as: 'author',
  });
  Article.belongsToMany(models.Tag, {
    through: 'article_tags',
    foreignKey: 'article_id',
    as: 'tags',
    onDelete: 'CASCADE',
  });
  Article.belongsTo(models.Category, {
    foreignKey: 'category_id',
    as: 'category',
    onDelete: 'SET NULL',
  });
  Article.hasMany(models.Image, {
    foreignKey: 'imageable_id',
    constraints: false,
    scope: {
      imageable_type: 'article',
    },
  });
};

export default Article;
