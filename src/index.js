const Wechat = require('wechat4u');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const utils = require('./utils/index');
let message = require('./message.js');
const reRequire = utils.debounce(() => {
  delete require.cache[require.resolve('./message.js')];
  try {
    message = require('./message');
    console.log('我更新了');
  } catch (e) {
    console.log('更新没成功呢');
  }
}, 200);

fs.watch(path.join(__dirname, 'message.js'), { encoding: 'utf-8' }, () => {
  reRequire();
});

const bot = new Wechat();
bot.start();

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
 * 登录成功事件
 */
bot.on('login', () => {
  console.log('登录成功');
});

/**
 * 登出成功事件
 */
bot.on('logout', () => {
  console.log('登出成功');
});

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
  console.log('发生了未知的错误', err);
});
