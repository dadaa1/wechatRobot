// const fs = require('fs');
// const path = require('path');
// let specialReply = require('./special');
// fs.watch(
//   path.join(__dirname, 'special', 'index.js'),
//   { encoding: 'utf-8' },
//   () => {
//     delete require.cache[require.resolve('./special/index.js')];
//     try {
//       specialReply = require('./special/index.js');
//       console.log('special我更新了');
//     } catch (e) {
//       console.log('special更新没成功呢');
//     }
//   }
// );
// const { otherMessageHandle } = require('./messageReply');
// let personMessageHandle = require('./messageReply/person.js');
// fs.watch(
//   path.join(__dirname, 'messageReply', 'person.js'),
//   { encoding: 'utf-8' },
//   () => {
//     delete require.cache[require.resolve('./messageReply/person.js')];
//     try {
//       personMessageHandle = require('./messageReply/person.js');
//       console.log('person我更新了');
//     } catch (e) {
//       console.log('person更新没成功呢');
//     }
//   }
// );
// let roomMessageHandle = require('./messageReply/room.js');
// fs.watch(
//   path.join(__dirname, 'messageReply', 'room.js'),
//   { encoding: 'utf-8' },
//   () => {
//     delete require.cache[require.resolve('./messageReply/room.js')];
//     try {
//       roomMessageHandle = require('./messageReply/room.js');
//       // console.log('room我更新了');
//     } catch (e) {
//       console.log('room更新没成功呢');
//     }
//   }
// );

// let publicMessageHandle = require('./messageReply/public.js');
// fs.watch(
//   path.join(__dirname, 'messageReply', 'public.js'),
//   { encoding: 'utf-8' },
//   () => {
//     delete require.cache[require.resolve('./messageReply/public.js')];
//     try {
//       publicMessageHandle = require('./messageReply/public.js');
//       // console.log('public我更新了');
//     } catch (e) {
//       console.log('public更新没成功呢');
//     }
//   }
// );

// let oneSelfMessageHandle = require('./messageReply/self.js');
// fs.watch(
//   path.join(__dirname, 'messageReply', 'self.js'),
//   { encoding: 'utf-8' },
//   () => {
//     delete require.cache[require.resolve('./messageReply/self.js')];
//     try {
//       oneSelfMessageHandle = require('./messageReply/self.js');
//       // console.log('oneSelf我更新了');
//     } catch (e) {
//       console.log('oneSelf更新没成功呢');
//     }
//   }
// );

// let { logger } = require('./log/index.js');
// fs.watch(path.join(__dirname, 'log', 'index.js'), { encoding: 'utf-8' }, () => {
//   delete require.cache[require.resolve('./log/index.js')];
//   try {
//     const log = require('./log/index.js');
//     logger = log.logger;
//     // console.log('log我更新了');
//   } catch (e) {
//     console.log('log更新没成功呢');
//   }
// });
const { logger } = require('./log');
const specialReply = require('./special');
const {
  roomMessageHandle,
  personMessageHandle,
  otherMessageHandle,
  oneSelfMessageHandle,
  publicMessageHandle
} = require('./messageReply');
console.log('我手动触发更新了 ');
let state = true;
function lister(bot) {
  bot.on('开启机器人', () => {
    console.log('开启机器人成功'.green);
    state = true;
  });
  bot.on('关闭机器人', () => {
    console.log('关闭机器人成功'.green);
    state = false;
  });
}
function messageHandle(bot, msg) {
  global.bot = bot;
  global.msg = msg;
  lister(bot);
  if (state) {
    specialReply(bot, msg);
  }
  logger(bot, msg);
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
