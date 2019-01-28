'use strict';
const https = require('https');
const line = require('@line/bot-sdk');
const express = require('express');

var Client = require('pg-native');
console.log(process.env.DATABASE_URL);
var client = new Client({
  ssl: true
});
client.connectSync(process.env.DATABASE_URL);

let saveData = [];

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'paPwxGUUg9arg/mP7wPO2sniRsapY4e95xKlrrbO7s7O5upBS2TYLe9ECCsC3+07QNePiw8PZOnfLQjVaKB0MWYhPzNRhNVr509KVJvvDQWNVGG7R9HXXJJqQVYPKRYs9Gl2BpTNz1lXoicll5wUKgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'f400faee797298198cd56b722d8c0674',
};

// create LINE SDK client
const lineclient = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => 
    res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
var replyLine;
// event handler
function handleEvent(event) {
    console.log("handle Event");
  var userId;
  var username;
  userId=event.source.userId;
  replyLine="Test Remindme";
  lineclient.replyMessage(event.replyToken, replyLine);
  return;
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});