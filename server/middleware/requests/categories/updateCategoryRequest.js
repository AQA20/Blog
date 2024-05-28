import Joi from 'joi';

const updateCategoryRequest = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().trim().min(10).max(20).required(),
});

const updateCategoryRequestMiddleware = (req, res, next) => {
  try {
    const { error } = updateCategoryRequest.validate(req.params);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default updateCategoryRequestMiddleware;
