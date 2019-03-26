// const Wechat = require('wechat4u');
// const bot = new Wechat();
// // console.log(Wechat, '|', bot);
// // console.log(Wechat.Contact, '|', bot.Contact);

// console.log(bot.Contact.isSelf);

// const { tulingReplyMsg } = require('./getTulingReply');

// tulingReplyMsg('你好').then(res => {
//   console.log(res);
// });

// const { scheduleCronstyle } = require('./scheduleSendMsg');

// scheduleCronstyle();

const file = require('./src/utils/file');

file('群/大山', 'qiiiiq.txt', 'asfasfasdfasdfasd')
  .then(() => {
    console.log('succsess');
  })
  .catch(e => {
    console.log('失败l ', e);
  });
