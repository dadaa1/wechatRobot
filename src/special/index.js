const { tulingReplyMsg } = require('../messageReply/base/getTulingReply');

module.exports = (bot, msg) => {
  const user = bot.contacts[msg.FromUserName];
  const type = msg.MsgType === bot.CONF.MSGTYPE_TEXT ? 'text' : 'other';
  if (user.getDisplayName() === '小鱼') {
    if (type === 'text') {
      console.log('kaish ');
      tulingReplyMsg(msg.Content)
        .then(data => {
          return bot.sendMsg(data, msg.FromUserName);
        })
        .catch(() => {
          console.log('发送消息失败了');
        });
    } else {
      bot.sendMsg('[奸笑][奸笑][奸笑]', msg.FromUserName);
    }
  }
};
