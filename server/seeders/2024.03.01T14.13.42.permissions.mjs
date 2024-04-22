export const up = async ({ context: { sequelize } }) => {
  return sequelize.getQueryInterface().bulkInsert('permissions', [
    {
      name: 'manage_posts',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'manage_comments',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'manage_users',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'manage_categories',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'manage_tags',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'manage_settings',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'access_admin_panel',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'create_posts',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'edit_own_posts',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'delete_own_posts',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'manage_own_tags',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'manage_own_categories',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'comment',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'edit_profile',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'change_password',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'register',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'login',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'reset_password',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
export const down = ({ context: { sequelize } }) => {
  sequelize.getQueryInterface().bulkDelete('permissions', null, {});
  return sequelize.query('ALTER TABLE permissions AUTO_INCREMENT = 1;');
};
