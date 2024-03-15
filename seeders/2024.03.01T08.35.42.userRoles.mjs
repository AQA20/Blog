import User from '../models/User.js';
import Role from '../models/Role.js';
import UserRole from '../models/UserRole.js';

export const up = async () => {
  const users = await User.findAll();
  const roles = await Role.findAll();
  let increment = roles[0].id;
  for (const user of users.slice(0, roles.length)) {
    UserRole.create({
      role_id: increment,
      user_id: user.id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    increment++;
  }
};
export const down = ({ context: { sequelize } }) => {
  sequelize.getQueryInterface().bulkDelete('user_roles', null, {});
  return sequelize.query('ALTER TABLE user_roles AUTO_INCREMENT = 1;');
};
