import ApiError from '../../services/ApiError.js';

const uploadFileRequestMiddleware = (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError('No file was uploaded', 400);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default uploadFileRequestMiddleware;
