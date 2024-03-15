import Joi from 'joi';

const createArticleCategoryRequest = Joi.object({
  category: Joi.string()
    .pattern(/^\w+(\s\w+)?$/)
    .trim()
    .lowercase()
    .required(),
});

export default (req, res, next) => {
  try {
    const { error } = createArticleCategoryRequest.validate(req.body);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
