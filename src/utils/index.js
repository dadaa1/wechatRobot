const fs = require('fs');
const path = require('path');
const MessageType = require('./messageType');
const warn = (...arg) => {
  console.log(...arg);
};

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
function createAndAppend(dir, name, data) {
  return new Promise((res, rej) => {
    fs.stat(dir, (err, stats) => {
      if (err) {
        fs.mkdir(dir, { recursive: true }, err => {
          if (err) {
            warn('创建文件夹错误', err);
            rej(err);
          }
          fs.appendFile(path.join(dir, name), data, err => {
            if (err) {
              warn('写文件错误', err);
              rej(err);
            }
            res();
          });
        });
      }
      if (stats.isDirectory()) {
        fs.appendFile(path.join(dir, name), data, err => {
          if (err) {
            warn('写文件错误', err);
            rej(err);
          }
        });
      }
    });
  });
}

module.exports = {
  debounce,
  createAndAppend,
  MessageType
};
