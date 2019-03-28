const momnet = require('moment');
module.exports = (bot, msg) => {
  const user = bot.contacts[msg.ToUserName];
  const name = user.getDisplayName();
  console.log(name.green);
  if (msg.Content === '你好') {
    Object.keys(bot.contacts).forEach(key => {
      if (bot.contacts[key].getDisplayName() === '文件传输助手') {
        bot.sendMsg('现在时间是' + momnet().format('hh:mm:ss'), key);
      }
    });
  }
  if (msg.Content === '开启机器人') {
    bot.emit('开启机器人');
  }
  if (msg.Content === '关闭机器人') {
    bot.emit('关闭机器人');
  }
  // if(msg.Content===)
};
