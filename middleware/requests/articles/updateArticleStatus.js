import Joi from 'joi';

const updateArticleStatus = Joi.object({
  status: Joi.string()
    .valid('Approved', 'Pending', 'Rejected', 'Trashed')
    .required(),
});

export default (req, res, next) => {
  try {
    const { error } = updateArticleStatus.validate(req.body);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
