const { logger } = require('./log/index');
const fs = require('fs');
const path = require('path');
const {
  personMessageHandle,
  otherMessageHandle,
  oneSelfMessageHandle,
  publicMessageHandle
} = require('./messageReply');

let roomMessageHandle = require('./messageReply/room.js');
fs.watch(
  path.join(__dirname, 'messageReply', 'room.js'),
  { encoding: 'utf-8' },
  () => {
    delete require.cache[require.resolve('./messageReply/room.js')];
    try {
      roomMessageHandle = require('./messageReply/room.js');
      console.log('room我更新了');
    } catch (e) {
      console.log('room更新没成功呢');
    }
  }
);
console.log('我手动触发更新了 ');

function messageHandle(bot, msg) {
  // logger(bot, msg);
  const contact = bot.contacts[msg.FromUserName];
  if (bot.Contact.isRoomContact(contact)) {
    // 群消息
    roomMessageHandle(bot, msg);
  } else if (bot.Contact.isPublicContact(contact)) {
    // 公众号消息
    publicMessageHandle(bot, msg);
  } else if (
    !bot.Contact.isSelf(contact) &&
    !bot.Contact.isSpContact(contact)
  ) {
    //用户消息
    personMessageHandle(bot, msg);
  } else if (bot.Contact.isSelf(contact)) {
    //自己的消息
    oneSelfMessageHandle(bot, msg);
  } else {
    // 其他的消息
    otherMessageHandle(bot, msg);
  }
}

module.exports = {
  messageHandle
};
