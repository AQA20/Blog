import Joi from 'joi';

const createTagRequest = Joi.object({
  name: Joi.string().trim().min(3).max(20).required(),
});

const createTagRequestMiddleware = (req, res, next) => {
  try {
    const { error } = createTagRequest.validate(req.params);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default createTagRequestMiddleware;
