const createAndAppend = require('./file');
class MessageType {
  constructor(bot, msg) {
    this.bot = bot;
    this.msg = msg;
  }
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
  saveImg(dir, name) {
    this.bot
      .getMsgImg(this.msg.MsgId)
      .then(res => createAndAppend(dir, name, res.data))
      .then(() => {
        console.log(`${name}保存成功`);
      })
      .catch(err => {
        console.log(`${name}图片保存失败`);
        this.bot.emit('error', err);
      });
  }
}
module.exports = MessageType;
