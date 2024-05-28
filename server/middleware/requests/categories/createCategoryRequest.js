import Joi from 'joi';

const createCategoryRequest = Joi.object({
  name: Joi.string().trim().min(5).max(20).required(),
});

const createCategoryRequestMiddleware = (req, res, next) => {
  try {
    const { error } = createCategoryRequest.validate(req.params);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default createCategoryRequestMiddleware;
