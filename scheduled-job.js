
const line = require('@line/bot-sdk');
const schedule = require('node-schedule');

const defaultAccessToken = '***********************';
const defaultSecret = '***********************';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: '****',
  channelSecret: '******',
};

// create LINE SDK client
const client = new line.Client(config);

function scheduledRemind() {
    const msg = { type: 'text', text: "Don't forget to drink your medicine" };
    client.pushMessage('******', msg)
    .then(() => {
  
    })
    .catch((err) => {
      console.error(err);
    });
}
scheduledRemind();