const createAndAppend = require('./file');

function debounce(method = () => {}, wait = 250) {
  let timer = null;
  return (...arg) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      method.apply(this, arg);
    }, wait);
  };
}

module.exports = {
  debounce,
  createAndAppend
};
