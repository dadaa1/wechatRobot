const superagent = require('superagent');
const url = 'http://openapi.tuling123.com/openapi/api/v2';

const tulingReplyMsg = msg => {
  if (!msg) {
    return Promise.resolve('我不知道该怎么回答你哦');
  }
  return new Promise((res, rej) => {
    superagent
      .post(url)
      .send(createParams(msg))
      .end((err, res) => {
        if (err) rej(err);
        console.log('返回内容', res.body);
        res(res.body);
      });
  });
};

function createParams(text) {
  return {
    reqType: 0,
    perception: {
      inputText: {
        text: text
      }
    },
    userInfo: {
      apiKey: '59e806aacfea415ebf262a16754f129c',
      userId: ''
    }
  };
}

module.exports = {
  tulingReplyMsg
};
