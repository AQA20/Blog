import Joi from 'joi';

const getArticleRequest = Joi.object({
  search: Joi.string().trim().allow(''),
  orderBy: Joi.string().trim().valid('views', 'shares', 'createdAt'),
  order: Joi.string().trim().valid('DESC', 'ASC'),
  page: Joi.number(),
  limit: Joi.number().max(6),
});

const getArticleRequestMiddleware = (req, res, next) => {
  try {
    const { error } = getArticleRequest.validate(req.query);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default getArticleRequestMiddleware;
