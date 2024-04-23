import { DataTypes, Model } from 'sequelize';
import db from '../config/databaseConnection.js';

const sequelize = db.sequelize;

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Tag.associate = (models) => {
  Tag.belongsToMany(models.Article, {
    through: 'article_tags',
    foreignKey: 'tag_id',
    as: 'articles',
  });
};

export default Tag;
