const path = require('path');
const config = path.join(process.cwd(), 'config', 'bot.config.json');

module.exports = () => {
  delete require.cache[require.resolve(config)];
  return require(config);
};
