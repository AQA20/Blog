import { DataTypes, Model } from 'sequelize';
import db from '../config/databaseConnection.js';

const sequelize = db.sequelize;

class Category extends Model {}

Category.init(
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

Category.associate = (models) => {
  Category.hasMany(models.Article, { foreignKey: 'id' });
};

export default Category;
