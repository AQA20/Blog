import bcrypt from 'bcryptjs';
import { handleAsyncError } from '../utils/handleErrors.js';
import users from './samples/users.js';

export const up = handleAsyncError(async ({ context: { sequelize } }) => {
  const queryInterface = sequelize.getQueryInterface();
  const processedUsersData = await Promise.all(
    users.map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      return user;
    }),
  );
  await queryInterface.bulkInsert('Users', processedUsersData);
});
export const down = handleAsyncError(async ({ context: { sequelize } }) => {
  const queryInterface = sequelize.getQueryInterface();
  await queryInterface.bulkDelete('Users', null, {});
});
