const { createAndAppend, MessageType } = require('../utils');
class Room extends MessageType {
  constructor(bot, msg) {
    super();
    this.contact = bot.contacts[msg.FromUserName];
    this.displayName = this.contact.getDisplayName();
    super.init(bot, msg);
  }
  text(bot, msg) {
    const [name, content] = msg.Content.split(':\n');
    console.log(`${this.displayName}|${name}:\n${content}`);
  }
  image(bot, msg) {
    bot
      .getMsgImg(msg.MsgId)
      .then(res => {
        createAndAppend(
          '../../cache/qun/' + this.displayName,
          `${msg.MsgId}.jpg`,
          res.data
        )
          .then(() => {
            console.log('文件保存成功');
          })
          .catch(() => {
            console.log(this.displayName, '的图片保存失败');
          });
      })
      .catch(err => {
        console.log(err);
        bot.emit('error', err);
      });
  }
  video() {}
  andio() {}
  file() {}
  emoji() {}
  other() {}
}

module.exports = (bot, msg) => {
  new Room(bot, msg);
};
