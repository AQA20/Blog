import Joi from 'joi';

const deleteTagRequest = Joi.object({
  id: Joi.number().required(),
});

const deleteTagRequestMiddleware = (req, res, next) => {
  try {
    const { error } = deleteTagRequest.validate(req.params);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default deleteTagRequestMiddleware;
