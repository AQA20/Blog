export const up = async ({ context: { sequelize } }) => {
  return sequelize.getQueryInterface().bulkInsert('roles', [
    {
      name: 'Admin',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Author',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Registered User',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Guest',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
export const down = ({ context: { sequelize } }) => {
  sequelize.getQueryInterface().bulkDelete('roles', null, {});
  return sequelize.query('ALTER TABLE roles AUTO_INCREMENT = 1;');
};
