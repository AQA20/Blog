import { DataTypes, Model } from 'sequelize';
import db from '../config/databaseConnection.js';

const sequelize = db.sequelize;

class Comment extends Model {
  static APPROVED = 'Approved';
  static PENDING = 'Pending';
  static REJECTED = 'Rejected';
  static TRASHED = 'Trashed';

  static associate(models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Comment.belongsTo(models.Article, {
      foreignKey: 'article_id',
      as: 'article',
    });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Approved', 'Pending', 'Rejected', 'Trashed'),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        len: [45, 1000], // Validates length between 60 and 1000 characters
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments', // Specify the table name if it differs from the model name
    timestamps: true, // Enable timestamps
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Comment;
