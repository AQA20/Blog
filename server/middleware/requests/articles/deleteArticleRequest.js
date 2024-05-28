import Joi from 'joi';

const deleteArticleRequest = Joi.object({
  id: Joi.number().required(),
});

const deleteArticleRequestMiddleware = (req, res, next) => {
  try {
    const { error } = deleteArticleRequest.validate(req.params);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default deleteArticleRequestMiddleware;
