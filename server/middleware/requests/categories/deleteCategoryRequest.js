import Joi from 'joi';

const deleteCategoryRequest = Joi.object({
  id: Joi.number().required(),
});

const deleteCategoryRequestMiddleware = (req, res, next) => {
  try {
    const { error } = deleteCategoryRequest.validate(req.params);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default deleteCategoryRequestMiddleware;
