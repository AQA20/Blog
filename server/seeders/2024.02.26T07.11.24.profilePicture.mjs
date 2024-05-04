import S3Service from '../services/S3Client.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { handleAsyncError } from '../utils/handleErrors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fullPath = path.join(__dirname, '/images/profile-picture.jpeg');

const s3Service = new S3Service();

export const up = handleAsyncError(async ({ context: { sequelize } }) => {
  const queryInterface = sequelize.getQueryInterface();
  const fileUrl = await s3Service.uploadImg(fullPath);

  // Select random user let it be the first one
  const [user] = await queryInterface.select(null, 'Users', {
    attributes: ['id'],
  });
  await queryInterface.insert(null, 'Images', {
    imageableId: user.id,
    imageableType: 'User',
    name: fileUrl,
  });
});

export const down = handleAsyncError(async ({ context: { sequelize } }) => {
  const queryInterface = sequelize.getQueryInterface();
  // Select the first user
  const [user] = await queryInterface.select(null, 'Users', {
    attributes: ['id'],
  });
  const [image] = await queryInterface.select(null, 'Images', {
    where: { imageableId: user.id },
    attributes: ['name'],
  });
  await s3Service.deleteFile(image.name);
  await queryInterface.bulkDelete('Images', null, {});
});
