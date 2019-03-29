const path = require('path');
const fs = require('fs');
const config = path.join(process.cwd(), 'config', 'bot.config.json');

module.exports = {
  getConfig: () => {
    delete require.cache[require.resolve(config)];
    return require(config);
  },
  setConfig: val => {
    const value = typeof val === 'object' ? JSON.stringify(val) : val;
    fs.writeFileSync(config, value);
  }
};
