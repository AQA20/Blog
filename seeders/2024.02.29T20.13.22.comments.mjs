import Article from '../models/Article.js';
import Comment from '../models/Comment.js';

export const up = async () => {
  // Fetch all articles
  const articles = await Article.findAll({
    where: {
      status: Article.APPROVED,
    },
  });

  // Since this is test data, just add
  // the same comment for all of the articles
  articles.map(async (article) => {
    Comment.create({
      status: Comment.APPROVED,
      content: 'محتوى مميز جدا شكرا لك, سوف اعود لقراءة المزيد',
      user_id: article.author_id,
      article_id: article.id,
      created_at: new Date(),
      updated_at: new Date(),
    });
  });
};
export const down = ({ context: { sequelize } }) => {
  // Delete all comments from db
  sequelize.getQueryInterface().bulkDelete('comments', null, {});
  // Set auto increment id to 0
  return sequelize.query('ALTER TABLE comments AUTO_INCREMENT = 1;');
};
