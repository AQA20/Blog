import Joi from 'joi';
import DOMPurify from 'isomorphic-dompurify';
import { validateWordsLength } from '../../../utils/validations.js';
import { existsInDatabase } from '../../../utils/joiCustomValidations.js';
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

const createArticleRequest = Joi.object({
  title: Joi.string().trim().min(40).max(60).required(),
  description: Joi.string().trim().min(160).max(300).required(),
  content: Joi.string()
    .custom(wordsCount)
    .custom((value) => {
      return DOMPurify.sanitize(value); // Sanitize HTML content
    }),
  categoryId: Joi.number()
    .required()
    .external(async (value, helpers) => {
      if (!value) return;
      return existsInDatabase(Category, value, helpers, 'Invalid categoryId');
    }),
});

// Middleware function to validate the article creation request
const createArticleRequestMiddleware = (req, res, next) => {
  try {
    // Validate the incoming request body using the validateAsync method.
    // This method is used because the validation logic might involve asynchronous operations.
    const { error } = createArticleRequest.validateAsync(req.body);

    // If validation fails (i.e., there are validation errors), pass the error to the next middleware.
    // This ensures that the error is handled in the appropriate error-handling middleware.
    if (error) {
      return next(error);
    }

    // If validation is successful, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Catch any unexpected errors and pass them to the next middleware (error handling).
    next(error);
  }
};

export default createArticleRequestMiddleware;
