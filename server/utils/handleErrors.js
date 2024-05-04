const handleAsyncError = (func) => {
  return (...args) => {
    return func(...args).catch((error) => {
      console.error(error);
      throw error;
    });
  };
};

const handleAsyncApiError = (func) => {
  return (req, res, next) => {
    return func(req, res, next).catch((error) => {
      console.error(error);
      next(error);
    });
  };
};

export { handleAsyncError, handleAsyncApiError };
