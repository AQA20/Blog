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
    name: {
      type: DataTypes.STRING,
      unique: true,
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

Tag.associate = (models) => {
  Tag.belongsToMany(models.Article, {
    through: 'ArticleTag',
  });
};

export default Tag;
