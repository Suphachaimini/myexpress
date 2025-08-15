// index.js
require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

// ตั้งค่าจาก LINE Developers Console
const config = {
  channelAccessToken: '9PQxW+fjwpOQWywb8zrR8evepnPi+wayFaT/Ja5gyC4FN199lSnwD/lpTg9g02K6f4G9c3GbBcZJ8mjFG5v38SNBOoODUvsjWMoxwcy7Zq64itBaC8HeC2sy61SnIanjUMq0sHfnor7jhM6WgLrqCAdB04t89/1O/w1cDnyilFU=',
  channelSecret: '37733cd075b89e7e4ce59c67ea11628e'
};

app.use('/webhook', line.middleware(config));

// รับ webhook
app.post('/webhook', (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result));
});

// ตอบกลับข้อความ
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: `คุณพิมพ์ว่า: ${event.message.text}`
  });
}

const client = new line.Client(config);
app.get('/', (req, res) => {
  res.send('hello world, Suphachai');
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
