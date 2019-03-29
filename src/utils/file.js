const fs = require('fs');
const path = require('path');
const warn = (...arg) => {
  console.log(...arg);
};

const projectPath = process.cwd();
//
function createAndAppend(dir, name, data) {
  const newName = name.replace(/[\\:*?"<>|]+/g, 'a');
  return new Promise((res, rej) => {
    const realPath = path.join(projectPath, 'output', dir);
    fs.stat(realPath, err => {
      if (err) {
        fs.mkdir(realPath, { recursive: true }, err => {
          if (err) {
            warn('创建文件夹失败', err);
            return rej(err);
          }
          fs.appendFile(path.join(realPath, newName), data, err => {
            if (err) {
              warn('写文件错误', err);
              return rej(err);
            }
            res();
          });
        });
        return;
      }
      fs.appendFile(path.join(realPath, newName), data, err => {
        if (err) {
          warn('写文件错误', err);
          return rej(err);
        }
        res();
      });
    });
  });
}

module.exports = createAndAppend;
