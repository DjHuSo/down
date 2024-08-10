

const mysql = require('mysql')
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '903673669:AAG6RNhsfi5hIwjjOjBSVxbPjAJ73FxwlSQ';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bot"
})

conn.connect(function(err){
    if(err){
        throw err;
    }
    console.log("Connect")
})

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });



bot.on('inline_query' , query =>{
    const result =[]
    for(let i = 0; i<5; i++){
        result.push({
            type: 'article',
            id: i.toString(),
            title: 'Title'+ i,
            input_message_content:{
                message_text: `Article #${i+1}`
            }    })
    }

    bot.answerInlineQuery(query.id, result,{
        cache_time: 0
    })
})