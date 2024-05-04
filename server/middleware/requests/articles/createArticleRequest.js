import Joi from 'joi';
import { validateWordsLength } from '../../../utils/validations.js';

// Custom validation function to count the number of words
const wordsCount = (value, helpers) => {
  if (!validateWordsLength(value, 300, 5000)) {
    return helpers.error(
      'Article content must be minimum of 300 words and max of 5000 words',
    );
  }
  return value;
};

const createArticleRequest = Joi.object({
  title: Joi.string().trim().min(40).max(60).required(),
  description: Joi.string().trim().min(160).max(300).required(),
  content: Joi.string().custom(wordsCount).required(),
  category: Joi.string().trim().lowercase().required(),
  tags: Joi.array().items(Joi.string().trim().lowercase()).min(1).max(5),
});

const createArticleRequestMiddleware = (req, res, next) => {
  try {
    const { error } = createArticleRequest.validate(req.body);
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default createArticleRequestMiddleware;
