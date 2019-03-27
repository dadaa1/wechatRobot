require('colors');
const fs = require('fs');
function logger(bot, msg) {
  // console.log('123'.red);
  const contact = bot.contacts[msg.FromUserName];
  const displayName = contact.getDisplayName();
}

module.exports = {
  logger
};
