import ApiError from '../services/ApiError.js';

const devError = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    trace: err.stack,
  });
};

const prodError = (res, err) => {
  if (err?.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    // If programming error send a generic error message
    res.status(err.statusCode).json({
      status: 'failed',
      statusCode: 500,
      message: 'Something went wrong!',
    });
  }
};

const globalErrorHandler = async (err, req, res, next) => {
  //todo add error login service use aws & logger like winston

  // let statusCode = err.statusCode;
  // switch (err.name) {
  //   case 'JsonWebTokenError':
  //     statusCode = 401;
  //     break;
  //   case 'ValidationError':
  //     statusCode = 400;
  //     break;
  //   default:
  //     statusCode = err.statusCode;
  //     break;
  // }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Return a detailed error when in development environment!
  if (process.env.NODE_ENV === 'development') {
    devError(res, err);
  } else if (process.env.NODE_ENV === 'production') {
    // Don't leak too much information about the error in production environment

    // // If the error is related to validation property or authentication/authorization
    // // return the actual error even if in the production environment!
    // if (isUserError) {
    //   err = new ApiError(err.message, statusCode);
    // }
    prodError(res, err);
  }
};

export default globalErrorHandler;
