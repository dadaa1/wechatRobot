const MessageType = require('./base/messageType');

class Person extends MessageType {
  constructor(bot, msg) {
    super();
    this.init(bot, msg);
  }
  text(bot, msg) {}
  image(bot, msg) {}
  video(bot, msg) {}
  andio(bot, msg) {}
  file(bot, msg) {}
  emoji(bot, msg) {}
  other(bot, msg) {}
}

module.exports = (bot, msg) => {
  new Person(bot, msg);
};
