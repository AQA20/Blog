import Joi from 'joi';

const createArticleCategoryRequest = Joi.object({
  category: Joi.string().trim().lowercase().required(),
});

const createArticleCategoryRequestMiddleware = (req, res, next) => {
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

export default createArticleCategoryRequestMiddleware;
