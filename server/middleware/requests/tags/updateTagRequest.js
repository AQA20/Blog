import Joi from 'joi';

const updateTagRequest = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().trim().min(10).max(20).required(),
});

const updateTagRequestMiddleware = (req, res, next) => {
  try {
    const { error } = updateTagRequest.validate(req.params);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default updateTagRequestMiddleware;
