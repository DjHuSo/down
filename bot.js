const { Telegraf } = require('telegraf')
const { message, callbackQuery } = require('telegraf/filters')

const AdminId = '341160833'
const bot = new Telegraf('7060721197:AAGSOItzg7JPxxDCuB7nrnJuYGBqE_lag9o')
const mysql = require('mysql')
const { keyboard, inlineKeyboard } = require('telegraf/markup')
const { query } = require('express')
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
  
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

/*
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
})*///
bot.command('el', ctx =>{
   
        let input1 = ctx.message.text.split(" ")
      
        conn.query("SELECT * FROM el", function (err, result, fields){
            if(err){
                throw err
            }
        result.forEach(im =>{
          ////  console.log(im.sana)
            if(im.sana === input1[1]){
             //   console.log(im.sana , im.sum)
             //   console.log(input1[1])
                text = `<b>${im.sana} kuni ishlatilgan elektr</b>
    TR1: ${formatNumber(im.tr1)} so'm
    Press: ${formatNumber(im.press)} so'm
    Ekstraksiya: ${formatNumber(im.ekstra)} so'm
    TR2: ${formatNumber(im.tr2)} so'm
    Rafinatsiya: ${formatNumber(im.raf)} so'm
    GEA/Lost: ${formatNumber(im.gea)} so'm
    Qadoqlash: ${formatNumber(im.qadoq)} so'm
    Kunlik o'rtacha narx: ${formatNumber(im.kun)} so'm
    Jami: ${formatNumber(im.sum)} so'm`
                ctx.reply(text ,  {
                    parse_mode: "HTML"})
            } 
            
        })
       
        })
       
      
})

bot.command('gaz', ctx =>{
    let input1 = ctx.message.text.split(" ")
    
    conn.query("SELECT * FROM gaz", function (err, result, fields){
        if(err){
            throw err
        }
    result.forEach(im =>{
      ////  console.log(im.sana)
        if(im.sana === input1[1]){
         //   console.log(im.sana , im.sum)
         //   console.log(input1[1])
            text = `<b>${im.sana} kuni ishlatilgan gaz</b>
 Ishlatilgan: ${formatNumber(im.kub)} kub
 So'mda ${formatNumber(im.sum)} so'm` 
            ctx.reply(text,  {
                parse_mode: "HTML"})
        } 
        
    })
   
    })
   
    
})

bot.command('tavar', ctx =>{
    let input1 = ctx.message.text.split(" ")
   
    conn.query("SELECT * FROM tavar", function (err, result, fields){
        if(err){
            throw err
        }
    result.forEach(im =>{
      ////  console.log(im.sana)
        if(im.sana === input1[1]){
         //   console.log(im.sana , im.sum)
         //   console.log(input1[1])
            text = `<b>${im.sana} kuni chiqgan mahsulotlar</b>
    Chigit: ${formatNumber(im.chigit)}
    Sheluxa: ${formatNumber(im.sheluxa)}
    Kunjara: ${formatNumber(im.kunjara)}
    Shrot: ${formatNumber(im.shrot)}
    Press yog': ${formatNumber(im.presyog)}
    Ekstra yog': ${formatNumber(im.ekstrayog)}
    Qayta ishlangan yog': ${formatNumber(im.resyog)}
    Rafinatsiyalangan yog': ${formatNumber(im.rafyog)}` 
            ctx.reply(text,  {
                parse_mode: "HTML"})
        } 
        
    })
   
    })
   
    
})
bot.command('add', ctx =>{
    if(AdminId == ctx.from.id){
    let input = ctx.message.text.split(" ")
    const userId = ctx.chat.id
    if(input.length != 11 && userId === AdminId){
        ctx.reply("10 so`zdan  ko`p bo`lmasligi kerak Yoki Admin emassiz")
        return
    }
    console.log(input[1])
    console.log(input[2])
    var sql = `INSERT INTO el (sana,tr1,press,ekstra,tr2,raf,gea,qadoq,sum,kun) VALUES ('${input[1]}','${input[2]}','${input[3]}','${input[4]}','${input[5]}','${input[6]}','${input[7]}','${input[8]}','${input[9]}','${input[10]}')`
    conn.query(sql,function(err, result){
        if(err){
            throw err
        }
        console.log(`${input[1]} Maffaqiyatli yuklandi`)
        ctx.reply(`${input[1]} Maffaqiyatli yuklandi`)
    })
}else {ctx.reply('Siz Admin emasiz?')}  
})

bot.command('addt', ctx =>{
    if(AdminId == ctx.from.id){
    let input = ctx.message.text.split(" ")
    if(input.length != 10){
        ctx.reply("10 so`zdan  ko`p bo`lmasligi kerak")
        return
    }
    console.log(input[1])
    console.log(input[2])
    var sql = `INSERT INTO tavar (sana,chigit,sheluxa,kunjara,shrot,presyog,ekstrayog,resyog,rafyog) VALUES ('${input[1]}','${input[2]}','${input[3]}','${input[4]}','${input[5]}','${input[6]}','${input[7]}','${input[8]}','${input[9]}')`
    conn.query(sql,function(err, result){
        if(err){
            throw err
        }
        console.log(`${input[1]} Tavarlar maffaqiyatli yuklandi`)
        ctx.reply(`${input[1]} Tavarlar maffaqiyatli yuklandi`)
    })
}else {ctx.reply('Siz Admin emasiz?')}  
})

bot.command('addgaz', ctx =>{
    if(AdminId == ctx.from.id){
    let input = ctx.message.text.split(" ")
    if(input.length != 4){
        ctx.reply("3 so`zdan  ko`p bo`lmasligi kerak")
        return
    }
    console.log(input[1])
    console.log(input[2])
    var sql = `INSERT INTO gaz (sana,kub,sum) VALUES ('${input[1]}','${input[2]}','${input[3]}')`
    conn.query(sql,function(err, result){
        if(err){
            throw err
        }
        console.log(`${input[1]}Gaz maffaqiyatli yuklandi`)
        ctx.reply(`${input[1]} Gaz maffaqiyatli yuklandi`)
    })
}else {ctx.reply('Siz Admin emasiz?')}  
})
bot.command('del', ctx =>{
    if(AdminId == ctx.from.id){
    let input = ctx.message.text.split(" ")
    if(input.length != 2){
        ctx.reply("10 so`zdan  ko`p bo`lmasligi kerak")
        return
    }
    console.log(input[1])
    console.log(input[2])
    var sql = `DELETE FROM el WHERE sana = '${input[1]}'`
    conn.query(sql,function(err, result){
        if(err){
            throw err
        }
        console.log(`${input[1]} Maffaqiyatli o'chirildi`)
        ctx.reply(`${input[1]} Maffaqiyatli o'chirildi`)
    })
}else {ctx.reply('Siz Admin emasiz?')}  
})


bot.command('delgaz', ctx =>{
    if(AdminId == ctx.from.id){
    let input = ctx.message.text.split(" ")
    if(input.length != 2){
        ctx.reply("10 so`zdan  ko`p bo`lmasligi kerak")
        return
    }
    console.log(input[1])
    console.log(input[2])
    var sql = `DELETE FROM gaz WHERE sana = '${input[1]}'`
    conn.query(sql,function(err, result){
        if(err){
            throw err
        }
        console.log(`${input[1]} Maffaqiyatli o'chirildi`)
        ctx.reply(`${input[1]} Maffaqiyatli o'chirildi`)
    })
}else {ctx.reply('Siz Admin emasiz?')}  
})
bot.telegram.setMyCommands([
    { command: "/start", description: "Botni ishga tushurish" },
    
  ]);
  



  
////// panel
bot.command('panel', ctx =>{
    if(AdminId == ctx.from.id){
ctx.reply(`Malumotlarni to'g'ri yozish bo'yicha qo'llanma! 
   Mahulot malumotin yozish: <pre language='php'>/addt 20.07.2024 139337 15980 10060 82913 18117 5291 18313 15200</pre>
   Elektr malumotini yozish:  <pre language='python'>/add 20.07.2024 139337 15980 10060 82913 18117 5291 18313 15200 152</pre>
   Gaz malumotini yozish: <pre language='js'>/addgaz 20.07.2024 139337 15980</pre>
    `, {parse_mode: "HTML"})
      //// qaytarib yuborish  bot.telegram.sendCopy(ctx.from.id, ctx.message);

    }else{
        ctx.reply('Sizda admin huquqlari yo\'q... ❌');
    }

})
function handleUnexpectedMessage(ctx) {
    ctx.reply("Noma'lum xabar oldim. Iltimos, ko'rsatmalarni bajaring.")
        .catch(err => console.error('Xabar yuborishda xatolik:', err));

    // Adminni xabardor qilish
    const alertMessage = `Noma'lum xabar olindi:\nFoydalanuvchi: ${ctx.from.first_name}\nUsername: @${ctx.from.username}\nXabar: ${ctx.message.text}`;
    ctx.telegram.sendMessage(AdminId, alertMessage)
        .catch(err => console.error('Admin xabar yuborishda xatolik:', err));
}

  bot.start((ctx) =>{
    // ctx.reply('Botimizga xush kelibsiz')
     ctx.reply(`Botdan foydalanish uchun 
        /tavar 20.07.2024
        /el 20.07.2024
        /gaz 20.07.2024
Sanalar misol uchun yozilgan kerakli sanani o'zingiz kiritasiz bazada yo'q ma'lumotlar yozilsa bot javob qaytarmaydi! `)
     ctx.telegram.sendMessage(AdminId, `Yangi foydalanuvchi botga qo'shildi: ${ctx.from.first_name} (@${ctx.from.username || 'username yo\'q'})`)
    // console.log(ctx)
     .catch(err => console.error('Telegram xatoligi:', err));})
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) =>{ ctx.reply('Hey there')
 
})
bot.on('text', (ctx)=>{
        // Kutilmagan xabarlar
//   /  handleUnexpectedMessage(ctx);
})


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))