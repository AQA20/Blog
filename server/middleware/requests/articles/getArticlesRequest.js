import Joi from 'joi';

const getArticleRequest = Joi.object({
  search: Joi.string().trim().allow(''),
  orderBy: Joi.string().trim().valid('views', 'shares', 'createdAt'),
  order: Joi.string().trim().valid('DESC', 'ASC'),
  page: Joi.number(),
  limit: Joi.number().max(10),
  status: Joi.alternatives().try(
    Joi.string().trim().valid('Approved', 'Pending', 'Trashed', 'Rejected'), // Match the exact format
    Joi.array().items(
      Joi.string().trim().valid('Approved', 'Pending', 'Trashed', 'Rejected'), // Match for arrays
    ),
  ),
});

const getArticleRequestMiddleware = (req, res, next) => {
  try {
    const { status } = req.query;

    if (status) {
      // Split the `status` parameter into an array and normalize case
      const parsedStatus = status.split(',');
      // If it's a single value, keep it as a string for validation
      req.query.status =
        parsedStatus.length === 1 ? parsedStatus[0] : parsedStatus;
    }
    const { error } = getArticleRequest.validate(req.query);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default getArticleRequestMiddleware;
