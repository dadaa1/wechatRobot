// var p = require('child_process');
const fs = require('fs');
// p.exec('cls', err => {
//   if (err) {
//     console.log('醋味');
//   }
//   console.log('成功');
// });
function logger(bot, msg) {
  // console.log('123'.red);
  const contact = bot.contacts[msg.FromUserName];
  const displayName = contact.getDisplayName();
  // console.log(displayName, '的:', msg.Content);
  if (!bot.Contact.isSelf(contact)) {
    console.log(displayName, '的:', msg.Content);
  }
}

module.exports = {
  logger
};
