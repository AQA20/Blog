import Joi from 'joi';

const updateArticleTagRequest = Joi.object({
  articleId: Joi.number(),
  tagId: Joi.number(),
});

const updateArticleTagRequestMiddleware = (req, res, next) => {
  try {
    const { error } = updateArticleTagRequest.validate(req.body);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default updateArticleTagRequestMiddleware;
