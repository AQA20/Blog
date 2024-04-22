import { ErrorHandler } from '../../services/ErrorHandler.js';

export default (req, res, next) => {
  try {
    if (!req.file) {
      throw new ErrorHandler(400, 'No file was uploaded');
    }
    next();
  } catch (error) {
    next(error);
  }
};
