import Article from '../models/Article.js';
import Image from '../models/Image.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';
import ArticleTag from '../models/ArticleTag.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import S3Service from '../services/S3Client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fullPath = path.join(__dirname, '/article-samples/articles.json');

const articleSamples = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));

const s3Service = new S3Service();

export const up = async () => {
  const user = await User.findOne({ email: 'ahmedqss120@gmail.com' });

  articleSamples.articles.map(async (article) => {
    article.author_id = user.id;
    const imageUrl = s3Service.uploadFile(path.join(__dirname, article.image));
    delete article.image;
    const category = await Category.findOne({
      where: { name: article.category },
    });
    article.category_id = category.id;
    delete article.category;
    const createdArticle = await Article.create(article);
    const image = await Image.create({
      image_url: imageUrl,
      imageable_type: Image.ARTICLE,
      imageable_id: createdArticle.id,
    });
    await Article.update(
      { thumbnail_id: image.id },
      {
        where: { id: createdArticle.id },
      }
    );
    article.tags.forEach(async (tag) => {
      const dbTag = await Tag.findOne({ where: { name: tag } });
      await ArticleTag.create({
        article_id: createdArticle.id,
        tag_id: dbTag.id,
      });
    });
  });
};
export const down = async ({ context: { sequelize } }) => {
  const articleImages = await Image.findAll({ imageable_type: Image.ARTICLE });
  articleImages.forEach(
    async (image) => await s3Service.deleteFile(image.image_url)
  );
  articleImages.forEach(async (image) => image.destroy());
  sequelize.getQueryInterface().bulkDelete('articles', null, {});
  return sequelize.query('ALTER TABLE articles AUTO_INCREMENT = 1;');
};
