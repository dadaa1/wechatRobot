const { tulingReplyMsg } = require('../messageReply/base/getTulingReply');
const { getConfig } = require('../utils/getConfig');

module.exports = (bot, msg) => {
  const user = bot.contacts[msg.FromUserName];
  const type = msg.MsgType === bot.CONF.MSGTYPE_TEXT ? 'text' : 'other';
  const userList = getConfig().list;
  if (userList.some(item => item === user.getDisplayName())) {
    if (type === 'text') {
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
