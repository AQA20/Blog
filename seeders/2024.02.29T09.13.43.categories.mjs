export const up = async ({ context: { sequelize } }) => {
  return sequelize.getQueryInterface().bulkInsert('categories', [
    {
      name: 'Fitness',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Personal Development',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Travel',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Technology',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Health',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
export const down = ({ context: { sequelize } }) => {
  sequelize.getQueryInterface().bulkDelete('categories', null, {});
  return sequelize.query('ALTER TABLE categories AUTO_INCREMENT = 1;');
};
