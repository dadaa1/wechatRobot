const schedule = require('node-schedule');
const str = '早上好';
module.exports = bot => {
  const func = () => {
    Object.keys(bot.contacts).forEach(item => {
      if (
        bot.contacts[item].getDisplayName() === '小鱼' ||
        bot.contacts[item].getDisplayName() === '井华'
      ) {
        bot
          .sendMsg(str, item)
          .catch(() => {
            return bot.sendMsg(str, item);
          })
          .catch(() => {
            bot.sendMsg(str, item);
          });
      }
    });
  };
  // 每天的7:50执行
  schedule.scheduleJob('0 50 7 * * *', func);
};
