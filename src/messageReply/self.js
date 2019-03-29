const momnet = require('moment');
const getConfig = require('../utils/getConfig');

module.exports = (bot, msg) => {
  const contact = bot.contacts[msg.ToUserName];
  if (bot.Contact.isSelf(contact)) {
    //我发送给我的消息
    if (msg.Content === '开启机器人') {
      bot.emit('开启机器人');
    }
    if (msg.Content === '关闭机器人') {
      bot.emit('关闭机器人');
    }
    if (msg.Content === '测试') {
      const userList = getConfig().list;
      bot.sendMsg(String(userList), msg.ToUserName);
    }
  }

  // if(msg.Content===)
};
