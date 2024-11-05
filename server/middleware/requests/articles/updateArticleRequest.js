import Joi from 'joi';
import DOMPurify from 'isomorphic-dompurify';
import { validateWordsLength } from '../../../utils/validations.js';
import { existsInDatabase } from '../../../utils/joiCustomValidations.js';
import Image from '../../../models/Image.js';
import Category from '../../../models/Category.js';

// Custom validation function to count the number of words
const wordsCount = (value, helpers) => {
  if (!validateWordsLength(value, 300, 5000)) {
    return helpers.error(
      'Article content must be minimum of 300 words and max of 5000 words',
    );
  }
  return value;
};

// .custom() is designed for synchronous operations while .validateAsync() is used
// for asynchronous operations
const updateArticleRequest = Joi.object({
  title: Joi.string().trim().min(40).max(60),
  description: Joi.string().trim().min(160).max(300),
  // Used custom here as the operation is synchronous
  content: Joi.string()
    .custom(wordsCount)
    .custom((value) => {
      return DOMPurify.sanitize(value); // Sanitize HTML content
    }),
  // Used external here as the operation is asynchronous
  categoryId: Joi.number().external(async (value, helpers) => {
    if (!value) return;
    return existsInDatabase(Category, value, helpers, 'Invalid categoryId');
  }),
  // Used external here as the operation is asynchronous
  thumbnailId: Joi.number().external(async (value, helpers) => {
    if (!value) return;
    return existsInDatabase(Image, value, helpers, 'Invalid thumbnailId');
  }),
});

const updateArticleRequestMiddleware = async (req, res, next) => {
  try {
    const { error } = await updateArticleRequest.validateAsync(req.body, {
      abortEarly: false,
    });
    if (error) {
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default updateArticleRequestMiddleware;
