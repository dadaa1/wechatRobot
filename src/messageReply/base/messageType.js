const createAndAppend = require('../../utils/file');
const createCsv = require('../../utils/createCsv');
class MessageType {
  constructor() {}
  text() {}
  image() {}
  video() {}
  andio() {}
  file() {}
  emoji() {}
  other() {}
  init(bot, msg) {
    switch (msg.MsgType) {
    case bot.CONF.MSGTYPE_TEXT:
      /**
         * 文本消息
         */
      this.text(bot, msg);
      break;
    case bot.CONF.MSGTYPE_IMAGE:
      /**
         * 图片消息
         */
      this.image(bot, msg);
      break;
    case bot.CONF.MSGTYPE_VOICE:
      /**
         * 语音消息
         */
      this.andio(bot, msg);
      break;
    case bot.CONF.MSGTYPE_EMOTICON:
      /**
         * 表情消息
         */
      this.emoji(bot, msg);
      break;
    case bot.CONF.MSGTYPE_VIDEO:
    case bot.CONF.MSGTYPE_MICROVIDEO:
      /**
         * 视频消息
         */
      this.video(bot, msg);
      break;
    case bot.CONF.MSGTYPE_APP:
      if (msg.AppMsgType == 6) {
        /**
           * 文件消息
           */
        this.file(bot, msg);
      }
      break;
    default:
      this.other(bot, msg);
      break;
    }
  }
  saveText(bot, msg, dir, who, contant) {
    const csv = createCsv(who, contant, msg.MsgId);
    return createAndAppend(dir, '聊天记录.csv', csv).catch(err => {
      console.log('写记录失败', err);
    });
  }
  saveImg(bot, msg, dir, name) {
    return bot
      .getMsgImg(msg.MsgId)
      .then(res => createAndAppend(dir, name, res.data))
      .catch(err => {
        console.log(`${name}图片保存失败`);
        bot.emit('error', err);
      });
  }
}
module.exports = MessageType;
