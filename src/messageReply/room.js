const moment = require('moment');
const { MessageType, createAndAppend } = require('../utils');
const createCsv = require('../utils/createCsv');
class Room extends MessageType {
  constructor(bot, msg) {
    super(bot, msg);
    this.contact = bot.contacts[msg.FromUserName];
    this.displayName = this.contact.getDisplayName();
    const [name, content] = msg.Content.split(':\n');
    this.name = name;
    this.content = content;
    this.init(bot, msg);
  }
  text(bot, msg) {
    console.log(`${this.displayName}|${this.name}:\n${this.content}`);
    const csv = createCsv(this.name, this.content, msg.MsgId);
    createAndAppend('群/' + this.displayName, '聊天记录.csv', csv)
      .then(() => {
        console.log('写记录成功');
      })
      .catch(e => {
        console.log('写记录失败', e);
      });
  }
  image(bot, msg) {
    bot
      .getMsgImg(msg.MsgId)
      .then(res =>
        createAndAppend(
          '群/' + this.displayName,
          `[${this.name}]${moment().format('YYYY-MM-DD_hh:mm:ss')}|${
            msg.MsgId
          }.jpg`,
          res.data
        )
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
