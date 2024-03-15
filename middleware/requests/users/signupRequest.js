import Joi from 'joi';

const signupRequest = Joi.object({
  name: Joi.string().alphanum().min(3).max(60).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).max(30).required(),
  repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password');

export default (req, res, next) => {
  try {
    const { error } = signupRequest.validate(req.body);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
