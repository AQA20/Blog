// User.js
import { DataTypes, Model } from 'sequelize';
import db from '../config/databaseConnection.js';
import bcrypt from 'bcryptjs';
import UserRole from './UserRole.js';
import Role from './Role.js';
import Permission from './Permission.js';

const sequelize = db.sequelize;

class User extends Model {
  async getUserRoles() {
    return await UserRole.findAll({
      where: { user_id: this.id },
      include: {
        model: Role,
        include: { model: Permission, as: 'permissions' },
      },
    });
  }

  async isAdmin() {
    const userRoles = await this.getUserRoles();
    return userRoles.some((userRole) => userRole.Role.name === 'Admin');
  }
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(60),
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

User.associate = (models) => {
  User.hasMany(models.Article, {
    foreignKey: 'author_id',
    as: 'articles',
  });
  User.belongsToMany(models.Role, {
    through: 'user_roles',
    foreignKey: 'user_id',
    as: 'roles',
    onDelete: 'CASCADE',
  });
};

// Hash the password before saving
User.beforeCreate((user) => {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  user.setDataValue('password', hashedPassword);
});

// Set password to null after saving
User.afterCreate((user) => {
  user.setDataValue('password', null);
});

//Set password to null after updating
User.afterUpdate((user) => {
  user.setDataValue('password', null);
});

export default User;
