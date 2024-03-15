import Image from '../models/Image.js';
import User from '../models/User.js';
import S3Service from '../services/S3Client.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fullPath = path.join(__dirname, '/images/profile-picture.jpeg');

const s3Service = new S3Service();

export const up = async ({ context: { sequelize } }) => {
  const fileUrl = s3Service.uploadFile(fullPath);
  const user = await User.findOne({ email: 'ahmedqss120@gmail.com' });
  return sequelize.getQueryInterface().bulkInsert('images', [
    {
      imageable_id: user.id,
      imageable_type: Image.USER,
      image_url: fileUrl,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async ({ context: { sequelize } }) => {
  const user = await User.findOne({ email: 'ahmedqss120@gmail.com' });
  const image = await Image.findOne({ imageable_id: user.id });
  if (image) {
    await s3Service.deleteFile(image.image_url);
    await image.destroy();
  }

  sequelize.getQueryInterface().bulkDelete('images', null, {});
  return sequelize.query('ALTER TABLE images AUTO_INCREMENT = 1;');
};
