/** @type {import('sequelize-cli').Migration} */
export const up = async ({ context: { sequelize, DataTypes } }) => {
  await sequelize.getQueryInterface().createTable('images', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
};

export const down = async ({ context: { sequelize } }) => {
  await sequelize.getQueryInterface().dropTable('images');
};
