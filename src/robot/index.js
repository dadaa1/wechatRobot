const { tulingReplyMsg } = require('../messageReply/base/getTulingReply');
const { getConfig } = require('../utils/getConfig');
let state = false; // 机器人状态
let flag = true; // 绑定监听的状态

module.exports = (bot, msg) => {
  lister(bot);
  if (!state) {
    return;
  }
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

function lister(bot) {
  if (flag) {
    flag = false;
    bot.on('开启机器人', () => {
      console.log('开启机器人成功'.green);
      state = true;
    });
    bot.on('关闭机器人', () => {
      console.log('关闭机器人成功'.green);
      state = false;
    });
  }
}
