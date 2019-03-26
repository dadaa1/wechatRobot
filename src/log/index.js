require('colors');
const fs = require('fs');
function logger(bot, msg) {
  // console.log('123'.red);
  const contact = bot.contacts[msg.FromUserName];
  const displayName = contact.getDisplayName();

  if (msg.MsgType === bot.CONF.MSGTYPE_IMAGE) {
    if (displayName === '[群] 🌟共产主义接班人🌟') {
      console.log('谁的照片', displayName);
      bot
        .getMsgImg(msg.MsgId)
        .then(res => {
          fs.writeFileSync(`../../sb/${msg.MsgId}.jpg`, res.data);
        })
        .catch(err => {
          bot.emit('error', err);
        });
    }
    // 图片消息
    bot
      .getMsgImg(msg.MsgId)
      .then(res => {
        fs.writeFileSync(`../../media/${msg.MsgId}.jpg`, res.data);
      })
      .catch(err => {
        bot.emit('error', err);
      });
  }
}

module.exports = {
  logger
};
