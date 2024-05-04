import bcrypt from 'bcryptjs';
import { readFileAsync } from '../utils/fsUtils.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { handleAsyncError } from '../utils/handleErrors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fullPath = path.join(__dirname, '/samples/users.json');

export const up = handleAsyncError(async ({ context: { sequelize } }) => {
  const queryInterface = sequelize.getQueryInterface();
  let userSamples = await readFileAsync(fullPath);
  const usersData = JSON.parse(userSamples);
  const processedUsersData = await Promise.all(
    usersData.users.map(async (user) => {
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
