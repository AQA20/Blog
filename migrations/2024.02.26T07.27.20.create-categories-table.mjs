export const up = async ({ context: { sequelize, DataTypes } }) => {
  await sequelize.getQueryInterface().createTable('categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
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
  await sequelize.getQueryInterface().dropTable('categories');
};
