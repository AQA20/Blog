import { DataTypes, Model } from 'sequelize';
import db from '../config/databaseConnection.js';

const sequelize = db.sequelize;

class RulePermission extends Model {}

RulePermission.init(
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
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'role_permissions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

RulePermission.associate = (models) => {
  RulePermission.belongsTo(models.Role, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
  });
  RulePermission.belongsTo(models.Permission, {
    foreignKey: 'permission_id',
    onDelete: 'CASCADE',
  });
};

export default RulePermission;
