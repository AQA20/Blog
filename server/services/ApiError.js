export default class ApiError extends Error {
  constructor(message, statusCode) {
    // Call the constructor of extended class
    super(message);
    this.statusCode = statusCode;
    // Determine whether it's a client error or server error
    this.status = statusCode >= 400 ? 'failed' : 'error';
    // This error class will only be used for operational errors
    this.isOperational = true;
    // Capture the stack trace to know where the error has occurred
    Error.captureStackTrace(this, this.constructor);
  }
}
