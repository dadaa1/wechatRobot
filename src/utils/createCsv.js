const moment = require('moment');

module.exports = (name, content, id) => {
  const newName = name.replace(',', '{逗号}');
  const newContent = content.replace(',', '{逗号}');
  const now = moment().format('YYYY-MM-DD_hh:mm:ss');
  return `${id},${now},${newName},${newContent}\n`;
};
