import Joi from 'joi';

const deleteUserRequest = Joi.object({
  id: Joi.number().required(),
});

const deleteUserRequestMiddleware = (req, res, next) => {
  try {
    const { error } = deleteUserRequest.validate(req.params);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default deleteUserRequestMiddleware;
