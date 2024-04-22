// Image.js
import { DataTypes, Model } from 'sequelize';
import db from '../config/databaseConnection.js';

const sequelize = db.sequelize;

class Image extends Model {
  static USER = 'user';
  static ARTICLE = 'article';
  static COMMENT = 'comment';
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    imageable_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageable_type: {
      type: DataTypes.ENUM('article', 'comment', 'user'),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Image.associations = (models) => {
  Image.belongsTo(models.Article, {
    foreignKey: 'imageable_id',
    constraints: false,
  });
  Image.belongsTo(models.User, {
    foreignKey: 'imageable_id',
    constraints: false,
    as: 'user',
  });
  Image.belongsTo(models.Comment, {
    foreignKey: 'imageable_id',
    constraints: false,
    as: 'comment',
  });
};

export default Image;
