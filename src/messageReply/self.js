const momnet = require('moment');
const { getConfig, setConfig } = require('../utils/getConfig');

module.exports = (bot, msg) => {
  const contact = bot.contacts[msg.ToUserName];
  if (bot.Contact.isSelf(contact)) {
    console.log(msg.Content.green);
    //我发送给我的消息
    if (msg.Content === '开启机器人') {
      bot.emit('开启机器人');
    }
    if (msg.Content === '关闭机器人') {
      bot.emit('关闭机器人');
    }
    if (msg.Content === '列表') {
      const userList = getConfig().list;
      bot.sendMsg(String(userList), msg.ToUserName);
    }
    if (msg.Content.split(' ')[0] === '增加') {
      const userList = getConfig();
      userList.list.push(msg.Content.split(' ')[1]);
      setConfig(userList);
      bot.sendMsg(JSON.stringify(userList), msg.ToUserName);
    }
  }

  // if(msg.Content===)
};
