import Article from '../models/Article.js';
import Comment from '../models/Comment.js';

export const up = async () => {
  const articles = await Article.findAll({
    where: {
      status: Article.APPROVED,
    },
  });
  articles.map(async (article) => {
    Comment.create({
      status: Comment.APPROVED,
      content:
        'Such an inspiring read! This article beautifully described the topic',
      user_id: article.author_id,
      article_id: article.id,
      created_at: new Date(),
      updated_at: new Date(),
    });
  });
};
export const down = ({ context: { sequelize } }) => {
  sequelize.getQueryInterface().bulkDelete('comments', null, {});
  return sequelize.query('ALTER TABLE comments AUTO_INCREMENT = 1;');
};
