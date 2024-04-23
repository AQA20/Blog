import { DataTypes, Model } from 'sequelize';
import db from '../config/databaseConnection.js';

const sequelize = db.sequelize;

class UserRole extends Model {}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

UserRole.associate = (models) => {
  UserRole.belongsTo(models.Role, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
  });
  UserRole.belongsTo(models.User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
};

export default UserRole;
