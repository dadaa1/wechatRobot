const fs = require('fs');

function logger(bot, msg) {
  // console.log('123'.red);
  const contact = bot.contacts[msg.FromUserName];
  const displayName = contact.getDisplayName();
  if (!bot.Contact.isSelf(contact)) {
    console.log(displayName, '的:', msg.Content);
  }
}

module.exports = {
  logger
};
