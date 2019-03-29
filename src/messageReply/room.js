const moment = require('moment');
const MessageType = require('./base/messageType');

class Room extends MessageType {
  constructor(bot, msg) {
    super();
    this.contact = bot.contacts[msg.FromUserName];
    this.displayName = this.contact.getDisplayName();
    const [name, content] = msg.Content.split(':\n');
    this.name = name;
    this.content = content;
    this.init(bot, msg);
  }
  text(bot, msg) {
    // console.log(`${this.displayName}|${this.name}:\n${this.content}`);
    this.saveText(
      bot,
      msg,
      '群/' + this.displayName,
      this.name,
      this.content
    ).then(() => {
      console.log('写记录成功'.red);
    });
  }
  image(bot, msg) {
    this.saveText(
      bot,
      msg,
      '群/' + this.displayName,
      this.name,
      '[图片消息]'
    ).then(() => {
      console.log('图片写记录成功');
    });
    this.saveImg(
      bot,
      msg,
      '群/' + this.displayName + '/图片',
      `${msg.MsgId}[${this.name}]${moment().format('YYYY-MM-DD_hh-mm-ss')}.jpg`
    ).then(() => {
      console.log('图片保存成功');
    });
  }
  video() {}
  andio() {}
  file() {}
  emoji(bot, msg) {
    this.saveText(
      bot,
      msg,
      '群/' + this.displayName,
      this.name,
      '[表情消息]'
    ).then(() => {
      console.log('表情写记录成功'.red);
    });
    this.saveImg(
      bot,
      msg,
      '群/' + this.displayName + '/表情',
      `${msg.MsgId}[${this.name}]${moment().format('YYYY-MM-DD_hh-mm-ss')}.gif`
    ).then(() => {
      console.log('表情保存成功'.red);
    });
  }
  other() {}
}

module.exports = (bot, msg) => {
  new Room(bot, msg);
};
