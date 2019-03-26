const roomMessageHandle = require('./room');
const personMessageHandle = require('./person');
const otherMessageHandle = require('./other');
const oneSelfMessageHandle = require('./self');
const publicMessageHandle = require('./public');

module.exports = {
  roomMessageHandle,
  personMessageHandle,
  otherMessageHandle,
  oneSelfMessageHandle,
  publicMessageHandle
};
