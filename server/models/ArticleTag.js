import { DataTypes, Model } from 'sequelize';
import db from '../config/databaseConnection.js';

const sequelize = db.sequelize;

class ArticleTag extends Model {}

ArticleTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tag_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'ArticleTag',
    tableName: 'article_tags',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

ArticleTag.associate = (models) => {
  // Define associations
  ArticleTag.belongsTo(models.Tag, {
    foreignKey: 'tag_id',
    onDelete: 'CASCADE',
  });
  ArticleTag.belongsTo(models.Article, {
    foreignKey: 'article_id',
    onDelete: 'CASCADE',
  });
};

export default ArticleTag;
