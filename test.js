const Wechat = require('wechat4u');
const bot = new Wechat();
// console.log(Wechat, '|', bot);
// console.log(Wechat.Contact, '|', bot.Contact);

console.log(bot.Contact.isSelf);
