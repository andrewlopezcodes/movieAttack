const debounce = (func, delay = 1000) => {
  let setTimeoutId;
  return (...args) => {
    if (setTimeoutId) {
      clearTimeout(setTimeoutId);
    }
    setTimeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay)
  };
};