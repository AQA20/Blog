export const up = async ({ context: { sequelize } }) => {
  return sequelize.getQueryInterface().bulkInsert('role_permissions', [
    {
      role_id: 1,
      permission_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 1,
      permission_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 1,
      permission_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 1,
      permission_id: 4,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 1,
      permission_id: 5,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 1,
      permission_id: 6,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 1,
      permission_id: 7,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 2,
      permission_id: 8,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 2,
      permission_id: 9,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 2,
      permission_id: 10,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 2,
      permission_id: 11,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 2,
      permission_id: 12,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 3,
      permission_id: 13,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 3,
      permission_id: 14,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 3,
      permission_id: 15,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 4,
      permission_id: 16,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 4,
      permission_id: 17,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_id: 4,
      permission_id: 18,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
export const down = ({ context: { sequelize } }) => {
  sequelize.getQueryInterface().bulkDelete('role_permissions', null, {});
  return sequelize.query('ALTER TABLE role_permissions AUTO_INCREMENT = 1;');
};
