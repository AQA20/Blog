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
  // Fetch a user who will be use as author for the article
  const user = await User.findOne({ email: 'admin@500words.com' });

  // Loop over Articles
  articleSamples.articles.map(async (article) => {
    // Assign article author
    article.author_id = user.id;
    // Upload article image to s3
    const imageUrl = s3Service.uploadFile(path.join(__dirname, article.image));
    // Delete article.image property as it doesn't exist in article table
    delete article.image;

    // Create Article categories
    const category = await Category.create({ name: article.category });
    article.category_id = category.id;
    // Delete article Category because it doesn't exist in article table
    delete article.category;
    // Create article
    const createdArticle = await Article.create(article);
    // Create the article image
    const image = await Image.create({
      image_url: imageUrl,
      imageable_type: Image.ARTICLE,
      imageable_id: createdArticle.id,
    });

    // Set the article featured/thumbnail image
    await Article.update(
      { thumbnail_id: image.id },
      {
        where: { id: createdArticle.id },
      }
    );

    // Create article tags
    article.tags.forEach(async (tag) => {
      const dbTag = await Tag.create({ name: tag });
      await ArticleTag.create({
        article_id: createdArticle.id,
        tag_id: dbTag.id,
      });
    });
  });
};
export const down = async ({ context: { sequelize } }) => {
  // Fetch all Article images
  const articleImages = await Image.findAll({ imageable_type: Image.ARTICLE });
  // Delete each image from s3
  articleImages.forEach(
    async (image) => await s3Service.deleteFile(image.image_url)
  );
  // Delete each image from database
  articleImages.forEach(async (image) => image.destroy());
  // Delete all articles
  sequelize.getQueryInterface().bulkDelete('articles', null, {});
  // Reset auto increment id
  return sequelize.query('ALTER TABLE articles AUTO_INCREMENT = 1;');
};
