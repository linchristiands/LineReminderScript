
const line = require('@line/bot-sdk');
const schedule = require('node-schedule');

const defaultAccessToken = '***********************';
const defaultSecret = '***********************';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'paPwxGUUg9arg/mP7wPO2sniRsapY4e95xKlrrbO7s7O5upBS2TYLe9ECCsC3+07QNePiw8PZOnfLQjVaKB0MWYhPzNRhNVr509KVJvvDQWNVGG7R9HXXJJqQVYPKRYs9Gl2BpTNz1lXoicll5wUKgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'f400faee797298198cd56b722d8c0674',
};

// create LINE SDK client
const client = new line.Client(config);

function scheduledRemind() {
    const msg = { type: 'text', text: "毒を飲んでください!" };
    client.pushMessage(userId, msg)
    .then(() => {
  
    })
    .catch((err) => {
      console.error(err);
    });
}
sayHello();