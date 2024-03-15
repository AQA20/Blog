import { handleError, ErrorHandler } from '../services/ErrorHandler.js';

export default async (err, req, res, next) => {
  //todo add error login service use aws
  console.error(err);
  if (err instanceof ErrorHandler) {
    return handleError(err, res);
  }

  let statusCode = 500;
  switch (err.name) {
    case 'JsonWebTokenError':
      statusCode = 401;
      break;
    case 'ValidationError':
      statusCode = 400;
      break;
    default:
      statusCode = 500;
      break;
  }
  handleError(new ErrorHandler(statusCode, err.message), res);
};
