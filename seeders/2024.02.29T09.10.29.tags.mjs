export const up = async ({ context: { sequelize } }) => {
  return sequelize.getQueryInterface().bulkInsert('tags', [
    {
      name: 'Workouts',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Productivity',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Travel Tips',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Programming',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Self-Improvement',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
export const down = ({ context: { sequelize } }) => {
  sequelize.getQueryInterface().bulkDelete('tags', null, {});
  return sequelize.query('ALTER TABLE tags AUTO_INCREMENT = 1;');
};
