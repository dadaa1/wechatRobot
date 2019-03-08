const schedule = require('node-schedule');
const scheduleCronstyle = () => {
  schedule.scheduleJob('* * * * * *', () => {
    console.log('scheduleCronstyle:' + new Date());
  });
};

module.exports = {
  scheduleCronstyle
};
