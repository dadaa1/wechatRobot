const { MessageType, createAndAppend } = require('../utils');
class Room extends MessageType {
  constructor(bot, msg) {
    super(bot, msg);
    this.contact = bot.contacts[msg.FromUserName];
    this.displayName = this.contact.getDisplayName();
    this.init(bot, msg);
  }
  text(bot, msg) {
    const [name, content] = msg.Content.split(':\n');
    console.log(`${this.displayName}|${name}:\n${content}`);
  }
  image(bot, msg) {
    bot
      .getMsgImg(msg.MsgId)
      .then(res =>
        createAndAppend('群/' + this.displayName, `${msg.MsgId}.jpg`, res.data)
      )
      .then(() => {
        console.log('文件保存成功');
      })
      .catch(err => {
        console.log('文件保存失败');
        bot.emit('error', err);
      });
  }
  video() {}
  andio() {}
  file() {}
  emoji() {
    console.log('有表情消息');
  }
  other() {}
}

module.exports = (bot, msg) => {
  new Room(bot, msg);
};
