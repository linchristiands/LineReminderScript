'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
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

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => 
    res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {

  // create a echoing text message
  const msg = { type: 'text', text: "毒を飲んでください!" };
  
  // use reply API
  var j = schedule.scheduleJob('*/5 * * * * *', function(){
    console.log('ScheduleJob');
    client.pushMessage(event.replyToken, msg)
    .then(() => {
      
    })
    .catch((err) => {
      // error handling
    });
  });
  client.replyMessage(event.replyToken, msg);
  
  return;
}

// listen on port
const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`listening on ${port}`);
});