require('colors');
const Wechat = require('wechat4u');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
// const utils = require('./utils/index');
const activeTask = require('./activeTask.js');
const message = require('./message.js');
// const reRequire = utils.debounce(() => {
//   delete require.cache[require.resolve('./message.js')];
//   try {
//     message = require('./message');
//     console.log('我更新了');
//   } catch (e) {
//     console.log('更新没成功呢');
//   }
// }, 200);

// fs.watch(path.join(__dirname, 'message.js'), { encoding: 'utf-8' }, () => {
//   reRequire();
// });

// const reRequireTask = utils.debounce(() => {
//   delete require.cache[require.resolve('./activeTask.js')];
//   try {
//     activeTask = require('./activeTask');
//     console.log('task我更新了');
//   } catch (e) {
//     console.log('task更新没成功呢');
//   }
// }, 200);

// fs.watch(path.join(__dirname, 'activeTask.js'), { encoding: 'utf-8' }, () => {
//   reRequireTask();
// });

// const bot = new Wechat();
const botPath = path.join(process.cwd(), 'config', 'sync-data.json');
let bot;
/**
 * 尝试获取本地登录数据，免扫码
 * 这里演示从本地文件中获取数据
 */
try {
  bot = new Wechat(require(botPath));
} catch (e) {
  bot = new Wechat();
}

/**
 * 启动机器人
 */
if (bot.PROP.uin) {
  // 存在登录数据时，可以随时调用restart进行重启
  bot.restart();
} else {
  bot.start();
}

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
  activeTask(bot);
  fs.writeFileSync(botPath, JSON.stringify(bot.botData));
  console.log('登录成功');
});

/**
 * 登出成功事件
 */
bot.on('logout', () => {
  fs.unlinkSync(botPath);
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
