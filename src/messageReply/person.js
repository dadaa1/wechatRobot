const moment = require('moment');
const MessageType = require('./base/messageType');
class Person extends MessageType {
  constructor(bot, msg) {
    super();
    this.contact = bot.contacts[msg.FromUserName];
    this.displayName = this.contact.getDisplayName();
    this.content = msg.Content;
    this.init(bot, msg);
  }
  text(bot, msg) {
    this.saveText(
      bot,
      msg,
      '好友/' + this.displayName,
      this.displayName,
      this.content
    ).then(() => {
      console.log('写记录成功'.red);
    });
  }
  image(bot, msg) {
    this.saveText(
      bot,
      msg,
      '好友/' + this.displayName,
      this.displayName,
      '[图片消息]'
    ).then(() => {
      console.log('图片写记录成功');
    });
    this.saveImg(
      bot,
      msg,
      '好友/' + this.displayName,
      `${msg.MsgId}[${this.displayName}]${moment().format(
        'YYYY-MM-DD_hh-mm-ss'
      )}.jpg`
    ).then(() => {
      console.log('图片保存成功');
    });
  }
  video(bot, msg) {}
  andio(bot, msg) {}
  file(bot, msg) {}
  emoji(bot, msg) {}
  other(bot, msg) {}
}

module.exports = (bot, msg) => {
  new Person(bot, msg);
};
