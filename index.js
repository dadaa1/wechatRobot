const Wechat = require('wechat4u');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
let message = require('./message.js');

fs.watch(
  path.join(__dirname, 'message.js'),
  { encoding: 'utf-8' },
  (eventType, filename) => {
    delete require.cache[require.resolve('./message.js')];
    try {
      message = require('./message');
      console.log('我更新了');
    } catch (e) {
      console.log('更新没成功呢');
    }
  }
);

const bot = new Wechat();
bot.start();

const qun = [];
const gongzhonghao = [];
const geren = [];
/**
 * uuid事件，参数为uuid，根据uuid生成二维码
 */
bot.on('uuid', uuid => {
  qrcode.generate('https://login.weixin.qq.com/l/' + uuid, {
    small: true
  });
  console.log('二维码链接：', 'https://login.weixin.qq.com/qrcode/' + uuid);
});

/**
 * 登录用户头像事件，手机扫描后可以得到登录用户头像的Data URL
 */
bot.on('user-avatar', avatar => {
  console.log('登录用户头像Data URL：', avatar);
});
/**
 * 登录成功事件
 */
bot.on('login', () => {
  console.log('登录成功');
  // 保存数据，将数据序列化之后保存到任意位置
  // console.log(bot);
});

/**
 * 登出成功事件
 */
bot.on('logout', () => {
  console.log('登出成功');
  // 清除数据
  // fs.unlinkSync('./sync-data.json');
});

// /**
//  * 联系人更新事件，参数为被更新的联系人列表
//  */
// bot.on('contacts-updated', contacts => {
//   // console.log(contacts);
//   contacts.forEach(item => {
//     if (bot.Contact.isPublicContact(item)) {
//       gongzhonghao.push({
//         id: item.UserName,
//         value: item.NickName
//       });
//     } else if (bot.Contact.isRoomContact(item)) {
//       qun.push({
//         id: item.UserName,
//         value: item.NickName
//       });
//     } else if (!bot.Contact.isSelf(item) && !bot.Contact.isSpContact(item)) {
//       geren.push({
//         id: item.UserName,
//         value: item.RemarkName || item.NickName
//       });
//     }
//   });
//   fs.writeFileSync('./cache/qun.json', JSON.stringify(qun), 'utf8');
//   fs.writeFileSync('./cache/ren.json', JSON.stringify(geren), 'utf8');
//   fs.writeFileSync('./cache/hao.json', JSON.stringify(gongzhonghao), 'utf8');
//   fs.writeFileSync('./cache/data.json', JSON.stringify(bot.contacts), 'utf8');
//   console.log('联系人数量：', Object.keys(bot.contacts).length);
// });

/**
 * 如何处理会话消息
 */
bot.on('message', msg => {
  /**
   * 获取消息时间
   */
  console.log(`----------${msg.getDisplayTime()}----------`);
  message.messageHandle(bot, msg);
});

/**
 * 错误事件，参数一般为Error对象
 */
bot.on('error', err => {
  // console.error('错误：', err.tips);
});
