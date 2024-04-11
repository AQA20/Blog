const debounce = (cb, timeout) => {
  // Save timeoutId after the debounce function is done executing
  let timeoutId;

  // Closure
  return (...args) => {
    // Reset previous timeout
    clearTimeout(timeoutId);
    // Set a new timeout & call the cb function
    // with whatever args have been passed
    timeoutId = setTimeout(() => cb(args), timeout);
  };
};

export default debounce;
