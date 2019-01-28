'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

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

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`listening on ${port}`);
});