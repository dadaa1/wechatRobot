const schedule = require('node-schedule');
const getConfig = require('./utils/getConfig');
const str = '早上好';

module.exports = bot => {
  const func = () => {
    const userList = getConfig().list;
    Object.keys(bot.contacts).forEach(item => {
      if (userList.some(user => bot.contacts[item].getDisplayName() === user)) {
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
