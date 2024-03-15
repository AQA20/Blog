import { DataTypes, Model } from 'sequelize';
import db from '../config/databaseConnection.js';

const sequelize = db.sequelize;

class Role extends Model {}

Role.init(
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
    modelName: 'Role',
    tableName: 'roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Role.associate = (models) => {
  Role.belongsToMany(models.User, {
    through: 'user_roles',
    foreignKey: 'role_id',
    as: 'users',
  });
  Role.belongsToMany(models.Permission, {
    through: 'role_permissions',
    foreignKey: 'role_id',
    as: 'permissions',
  });
};

export default Role;
