const schedule = require('node-schedule');

module.exports = bot => {
  // const own = [];
  console.log('联系人', bot.contacts);
  // bot.on('contacts-updated', contacts => {
  //   contacts.forEach(item => {
  //     if (bot.Contact.isSelf(item) || bot.Contact.isSpContact(item)) {
  //       own.push({
  //         username: item.UserName,
  //         name: item.getDisplayName()
  //       });
  //     }
  //   });
  // });
  const func = () => {
    // console.log('scheduleCronstyle:' + new Date());
    // console.log(own);
    // if (own[0]) {
    //   bot
    //     .sendMsg('123', own[0].username)
    //     .then(() => {
    //       console.log(own[0].name, '数据发送成功');
    //     })
    //     .catch(e => {
    //       console.log('粗错了');
    //     });
    // }
    // own.forEach(item => {
    //   bot.sendMsg('123', item.username);
    // });
  };
  // schedule.scheduleJob('* * * * * *', func);
};
