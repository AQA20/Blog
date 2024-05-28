import ArticleTag from '../models/ArticleTag.js';
import resHandler from '../services/ResHandler.js';
import ApiError from '../services/ApiError.js';

export default class ArticleTagController {
  static async createArticleTag(req, res, next) {
    const tagId = req.params.tagId;
    const articleId = req.params.articleId;
    const [articleTag] = await ArticleTag.findOrCreate({
      where: {
        tagId,
        articleId,
      },
    });
    return resHandler(201, articleTag, res);
  }
  static async updateArticleTag(req, res, next) {
    const id = req.params.id;
    const tagId = req.body?.articleId;
    const articleId = req.body?.tagId;
    await ArticleTag.update(
      { articleId, tagId },
      {
        where: {
          id,
        },
      },
    );
    return resHandler(201, 'Tag updated successfully!', res);
  }

  static async deleteArticleTag(req, res, next) {
    const id = req.params.id;
    const articleTag = await ArticleTag.findByPk(id);
    if (!articleTag) {
      throw new ApiError('Article tag was not found', 404);
    }
    await articleTag.destroy();
    return resHandler(201, 'Article tag deleted successfully!', res);
  }
}
