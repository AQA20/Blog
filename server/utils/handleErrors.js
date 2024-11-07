const handleAsyncError = (func) => {
  return async (...args) => {
    try {
      await func(...args);
    } catch (error) {
      console.error('Caught an error in handleAsyncError:', error);
    }
  };
};

const handleAsyncApiError = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next); // Await here to fully capture async behavior
    } catch (error) {
      console.error('Caught an error in handleAsyncApiError:', error);
      next(error);
    }
  };
};

export { handleAsyncError, handleAsyncApiError };
