const fs = require('fs');
const { tulingReplyMsg } = require('./getTulingReply');
let flag = false;
let i = 0;
const messageHandle = (bot, msg) => {
  const contact = bot.contacts[msg.FromUserName];
  const displayName = contact.getDisplayName();
  if (i < 1000) {
    i++;
    fs.appendFileSync(
      './cache/msg.json',
      JSON.stringify(msg, null, '\t') + ',',
      'utf8'
    );
  }
  if (msg.MsgType === bot.CONF.MSGTYPE_IMAGE) {
    // 图片消息
    bot
      .getMsgImg(msg.MsgId)
      .then(res => {
        fs.writeFileSync(`./media/${msg.MsgId}.jpg`, res.data);
      })
      .catch(err => {
        bot.emit('error', err);
      });
  }

  if (bot.Contact.isRoomContact(contact)) {
    // 判断是群消息【不去理会】
    console.log(displayName, '的群消息：');
    if (!flag) {
      // replyOnePublicMsg(bot, msg, displayName);
    }
  } else if (bot.Contact.isPublicContact(contact)) {
    // 公众号消息【不去理会】
    console.log(displayName, '的公众号消息');
  } else if (!bot.Contact.isSelf(item) && !bot.Contact.isSpContact(item)) {
    // 个人消息
    console.log(displayName, '的人消息');
    if (displayName === '萝卜') {
      tulingReplyMsg(msg.Content)
        .then(res => {
          return bot.sendMsg(res, msg.FromUserName);
        })
        .catch(err => {
          console.log('发送消息失败了');
          bot.emit('error', err);
        });
    }
  } else {
    // 其他的消息
    console.log(displayName, '未知消息');
    if (msg.MsgType == bot.CONF.MSGTYPE_VERIFYMSG) {
      // 添加好友请求
      addFriendRequest(bot, msg);
    }
  }
};

function addFriendRequest(bot, msg) {
  bot
    .verifyUser(msg.RecommendInfo.UserName, msg.RecommendInfo.Ticket)
    .then(res => {
      console.log(
        `通过了 ${bot.Contact.getDisplayName(msg.RecommendInfo)} 好友请求`
      );
    })
    .catch(err => {
      bot.emit('添加好友失败', err);
    });
}

function replyOnePublicMsg(bot, msg, displayName) {
  if (displayName === '[群] 程序员保健室') {
    const newMsg = msg.Content.split(':\n')[1];
    if (msg.MsgType === bot.CONF.MSGTYPE_TEXT) {
      if (newMsg === '关闭机器人') {
        flag = true;
        return;
      }
      tulingReplyMsg(newMsg)
        .then(res => {
          return bot.sendMsg(res, msg.FromUserName);
        })
        .catch(err => {
          console.log('发送消息失败了');
          bot.emit('error', err);
        });
    } else {
      bot.sendMsg('你发的消息我看不懂哦~', msg.FromUserName).catch(err => {
        console.log('发送消息失败了');
        bot.emit('error', err);
      });
    }
    // bot
    //   .sendMsg(
    //     '发送文本消息，可以包含emoji(😒)和QQ表情([坏笑])',
    //     msg.FromUserName
    //   )
    //   .catch(err => {
    //     console.log('发送消息失败了');
    //     bot.emit('error', err);
    //   });
  }
}

module.exports = {
  messageHandle
};
