export const up = async ({ context: { sequelize, DataTypes } }) => {
  await sequelize.getQueryInterface().createTable('articles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(60),
      unique: true,
      allowNull: false,
      validate: {
        len: [40, 60],
      },
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: {
        len: [120, 160],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    thumbnail_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'images',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    status: {
      type: DataTypes.ENUM('Approved', 'Pending', 'Rejected', 'Trashed'),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
export const down = async ({ context: { sequelize } }) => {
  await sequelize.getQueryInterface().dropTable('articles');
};
