
const { Telegraf } = require('telegraf')
const fs = require('fs');
const XLSX = require('xlsx')
const { createCanvas, loadImage, registerFont } = require('canvas')
const path = require('path')
const https = require('https')
const http = require('http')
const axios = require('axios')
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

bot.on('document', async (ctx) => {
    if(AdminId == ctx.from.id){
    const {file_id: fileId} = ctx.update.message.document;
    const fileUrl = await ctx.telegram.getFileLink(fileId);
     console.log(fileUrl.href)
     const file = fs.createWriteStream("new.xlsx");

const request = https.get(fileUrl.href, (response) => {
   response.pipe(file);
});
  

ctx.reply('Fayl yuklandi endi bazaga yozish uchun /read boyrug`ni bering! ')
}else {ctx.reply('Siz Admin emasiz?')}  

  });

// bot.on('document', async ctx =>{
//     console.log(ctx.message.document.file_id)
//     const {file_id: fileId} = ctx.update.message.document;
//     const fileUrl = await ctx.telegram.getFileLink(fileId);
// console.log(fileUrl.href)  

// const url = fileUrl.herf;
// const fileP = "local_file.xlsx";



// })

bot.command('read', ctx =>{
    if(AdminId == ctx.from.id){
    const workbook = XLSX.readFile('new.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    //console.log(data);
    for (let i = 0; i < data.length; i++) {
        const vaqt = data[i].Sana
        const chigit = data[i].Chigit ? data[i].Chigit : '0'
        const sheluxa = data[i].Sheluxa ? data[i].Sheluxa : '0'
        const kunjara = data[i].Kunjara ? data[i].Kunjara : '0'
        const shrot = data[i].Shrot ? data[i].Shrot : '0'
        const pressyog = data[i].Pressyog ? data[i].Pressyog : '0'
        const ekstrayog = data[i].Ekstrayog ? data[i].Ekstrayog : '0'
        const resyog = data[i].Qaytaishlanganyog ? data[i].Qaytaishlanganyog : '0'
        const tr1 = data[i].TR1 ? data[i].TR1 : '0'
        const press = data[i].Press ? data[i].Press : '0'
        const ekstra = data[i].Ekstraksiya ? data[i].Ekstraksiya : '0'
        const tr2 = data[i].TR2 ? data[i].TR2 : '0' 
        const raf = data[i].Rafinatsiya ? data[i].Rafinatsiya : '0'
        const gea = data[i].GEA ? data[i].GEA : '0'
        const qadoq = data[i].Qadoqlash ? data[i].Qadoqlash : '0'
        const kun = data[i].Kunlik ? data[i].Kunlik : '0'
        const jami = data[i].Jami ? data[i].Kunlik : '0'
        const kub = data[i].Kub ? data[i].Kub : '0'

        if (vaqt === '09.08.2024'){
                console.log( vaqt, chigit,sheluxa,kunjara,shrot,pressyog,ekstrayog,resyog,tr1,press,ekstra,tr2,raf,gea,qadoq,kun,jami,kub)
           
           ctx.reply(`<b>${i},${vaqt}</b>
            `, {parse_mode: "HTML"})
           }
        }
    
    
    
    }else {ctx.reply('Siz Admin emasiz?')}  
    

})

bot.on('message', ctx =>{
    let input1 = ctx.message.text.split(" ")
      
    const workbook = XLSX.readFile('new.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    //console.log(data);
    for (let i = 0; i < data.length; i++) {
        const vaqt = data[i].Sana
        const chigit = data[i].Chigit ? data[i].Chigit : '0'
        const sheluxa = data[i].Sheluxa ? data[i].Sheluxa : '0'
        const kunjara = data[i].Kunjara ? data[i].Kunjara : '0'
        const shrot = data[i].Shrot ? data[i].Shrot : '0'
        const pressyog = data[i].Pressyog ? data[i].Pressyog : '0'
        const ekstrayog = data[i].Ekstrayog ? data[i].Ekstrayog : '0'
        const resyog = data[i].Qaytaishlanganyog ? data[i].Qaytaishlanganyog : '0'
        const tr1 = data[i].TR1 ? data[i].TR1 : '0'
        const press = data[i].Press ? data[i].Press : '0'
        const ekstra = data[i].Ekstraksiya ? data[i].Ekstraksiya : '0'
        const tr2 = data[i].TR2 ? data[i].TR2 : '0' 
        const raf = data[i].Rafinatsiya ? data[i].Rafinatsiya : '0'
        const gea = data[i].GEA ? data[i].GEA : '0'
        const qadoq = data[i].Qadoqlash ? data[i].Qadoqlash : '0'
        const kun = data[i].Kunlik ? data[i].Kunlik : '0'
        const jami = data[i].Jami ? data[i].Kunlik : '0'
        const kub = data[i].Kub ? data[i].Kub : '0'
        const sum = data[i].Som ? data[i].Som : '0'

        if(vaqt === input1[0]){
                console.log( vaqt, chigit,sheluxa,kunjara,shrot,pressyog,ekstrayog,resyog,tr1,press,ekstra,tr2,raf,gea,qadoq,kun,jami,kub)
        
        
        
 const createImage = async (from, ctx) => {
  
    registerFont(path.join(process.cwd(), "fonts", "DoppiooneRegular.ttf"), {
      family: "DoppiooneRegular",
    });
    const templateImage = await loadImage(
      path.join(process.cwd(), "post.jpg")
    );
    const canvas = createCanvas(templateImage.width, templateImage.height);
    const ctx2d = canvas.getContext("2d");

    // Shablon rasmni koordinatalari to'g'ri bo'lishi uchun (0, 0) ga joylashtiramiz
    ctx2d.drawImage(templateImage, 0, 0);

    // Rasmga matn qo'shish
    ctx2d.font = "Bold 15px Arial";
    ctx2d.fillStyle = "#000";
    //ctx2d.
   
   
   

    // Matnni kerakli joyga sozlash
    ////// 1 - qator
    ctx2d.fillText(`${vaqt} da ishlab chiqarilgam maxshulotlar`, 100, 39); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Chigit', 40, 62); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Sheluxa', 40, 82); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Kunjara', 40, 102); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Shrot', 40, 122); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Press Yog`', 40, 142); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Ekstra Yog`', 40, 162); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Rafinatsiyalangan Yog`', 40, 182); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Elektrenergiya hisobi', 100, 204); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('TR1', 40, 227); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Ekstraksiya', 40, 247); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Press', 40, 267); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('TR2', 40, 287); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Rafinatsiya', 40, 307); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('GEA / LOST', 40, 327); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Qadoqlash', 40, 347); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Kunlik o`rtacha narx', 40, 367); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Jami', 40, 387); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Gaz hisobi', 100, 409); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Ishlatilgan', 40, 432); // Pozitsiyani kerakli joyga sozlang
    ctx2d.fillText('Narx', 40, 452); // Pozitsiyani kerakli joyga sozlang
    
/////// 2 - qator
    ctx2d.fillText(chigit, 280, 62); // Chigit
    ctx2d.fillText(sheluxa, 280, 82); // Sheluxa
    ctx2d.fillText(kunjara, 280, 102); // Kunjara
    ctx2d.fillText(shrot, 280, 122); // Shrot
    ctx2d.fillText(pressyog, 280, 142); // Press Yog`
    ctx2d.fillText(ekstrayog, 280, 162); // Ekstra Yog`
    ctx2d.fillText(resyog, 280, 182); // Rafinatsiyalangan Yog`
    ctx2d.fillText(tr1, 280, 227); // TR1
    ctx2d.fillText(ekstra, 280, 247); // Ekstraksiya
    ctx2d.fillText(press, 280, 267); // Press
    ctx2d.fillText(tr2, 280, 287); // TR2
    ctx2d.fillText(raf, 280, 307); // Rafinatsiya
    ctx2d.fillText(gea, 280, 327); // GEA / LOST
    ctx2d.fillText(qadoq, 280, 347); // Qadoqlash
    ctx2d.fillText(kun, 280, 367); // Kunlik o`rtacha narx
    ctx2d.fillText(jami, 280, 387); // Jami
   ctx2d.fillText(kub, 280, 432); //  Ishlatilgan
    ctx2d.fillText(sum, 280, 452); // Narx

////////// 3 - qator
    ctx2d.fillText('kg', 435, 62); // Chigit
    ctx2d.fillText('kg', 435, 82); // Sheluxa
    ctx2d.fillText('kg', 435, 102); // Kunjara
    ctx2d.fillText('kg', 435, 122); // Shrot
    ctx2d.fillText('kg', 435, 142); // Press Yog`
    ctx2d.fillText('kg', 435, 162); // Ekstra Yog`
    ctx2d.fillText('kg', 435, 182); // Rafinatsiyalangan Yog`
    ctx2d.fillText('so`m', 435, 227); // TR1
    ctx2d.fillText('so`m', 435, 247); // Ekstraksiya
    ctx2d.fillText('so`m', 435, 267); // Press
    ctx2d.fillText('so`m', 435, 287); // TR2
    ctx2d.fillText('so`m', 435, 307); // Rafinatsiya
    ctx2d.fillText('so`m', 435, 327); // GEA / LOST
    ctx2d.fillText('so`m', 435, 347); // Qadoqlash
    ctx2d.fillText('so`m', 435, 367); // Kunlik o`rtacha narx
    ctx2d.fillText('so`m', 435, 387); // Jami
   ctx2d.fillText('kub', 435, 432); //  Ishlatilgan
    ctx2d.fillText('so`m', 435, 452); // Narx
    ctx2d.fillText('@Darital_hisobot', 80, 496)
    
    
    const width = 30
    const height = 30

    loadImage("./darital.jpg").then((image) => {
        ctx2d.drawImage(image, 32, 477, width, height );
        const Faylbuffer = canvas.toBuffer("image/png");
        fs.writeFileSync("./image.png", Faylbuffer);


         // Rasmni foydalanuvchiga yuborish
     ctx.replyWithPhoto(
        {
          source: Faylbuffer,
        },
        {
          caption: from,
        }
      );
      });
    // Canvas ni buffer ga qaytarish
    const finalImageBuffer = canvas.toBuffer();

    // Rasmni vaqtinchalik faylga saqlash
      const outputPath = "output.png";
       fs.writeFileSync(outputPath, finalImageBuffer);

 

  // Vaqtinchalik faylni o'chirish
  //   fs.unlinkSync(outputPath);
};
createImage('@Darital_hisobot',ctx)
        
        
            }
    }

})
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


bot.command('kun', ctx =>{
    let input1 = ctx.message.text.split(" ")
    var cc = `SELECT * FROM el  INNER JOIN gaz ON el.sana = gaz.sana INNER JOIN tavar ON el.sana = tavar.sana;`
    
    conn.query(cc , function (err, result, fields){
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
<b>Elektrenergiya hosobi:</b>
    TR1: ${formatNumber(im.tr1)} so'm
    Press: ${formatNumber(im.press)} so'm
    Ekstraksiya: ${formatNumber(im.ekstra)} so'm
    TR2: ${formatNumber(im.tr2)} so'm
    Rafinatsiya: ${formatNumber(im.raf)} so'm
    GEA/Lost: ${formatNumber(im.gea)} so'm
    Qadoqlash: ${formatNumber(im.qadoq)} so'm
    Kunlik o'rtacha narx: ${formatNumber(im.kun)} so'm
    Jami: ${formatNumber(im.sum)} so'm
<b>Gaz hisobi:</b>    
    Ishlatilgan: ${formatNumber(im.kub)} kub
    So'mda ${formatNumber(im.sum)} so'm`
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
    if(input.length != 3){
        ctx.reply("3 so`zdan  ko`p bo`lmasligi kerak")
        return
    }
    console.log(input[1])
    console.log(input[2])
const sum = input[2]*1500
console.log(Math.floor(sum))
    
    var sql = `INSERT INTO gaz (sana,kub,sum) VALUES ('${input[1]}','${input[2]}','${Math.floor(sum)}')`
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


bot.command('delt', ctx =>{
    if(AdminId == ctx.from.id){
    let input = ctx.message.text.split(" ")
    if(input.length != 2){
        ctx.reply("10 so`zdan  ko`p bo`lmasligi kerak")
        return
    }
    console.log(input[1])
    console.log(input[2])
    var sql = `DELETE FROM tavar WHERE sana = '${input[1]}'`
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
ctx.reply(`Ma'lumotlarni to'g'ri yozish bo'yicha qo'llanma! 
   Mahulot ma'lumotin yozish: <pre language='php'>/addt 20.07.2024 139337 15980 10060 82913 18117 5291 18313 15200</pre>
   Elektr ma'lumotini yozish:  <pre language='python'>/add 20.07.2024 139337 15980 10060 82913 18117 5291 18313 15200 152</pre>
   Gaz ma'lumotini yozish: <pre language='js'>/addgaz 20.07.2024 139337 15980</pre>
   Mahsulot ma'lumotni o'chirish: <pre language='js'>/delt 20.07.2024</pre>
   Elektr ma'lumotini o'chirish: <pre language='js'>/del 20.07.2024</pre>
   Gaz ma'lumotini o'chirish: <pre language='js'>/del gaz 20.07.2024</pre>
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
bot.hears('hi', (ctx) =>{
    console.log(ctx.message) 
    ctx.reply('Hey there')
    if(ctx.from.id == '699210956'){

        
    ctx.telegram.sendMessage(ctx.from.id,'🖕')}
})

//  setInterval(function() {
//    bot.telegram.sendMessage('699210956','Mansur Og`o na gap indi bezor bo`lmadingizmi?')
//   }, 5000)
  
bot.on('inline_query', async (ctx) => {
    var cc = `SELECT * FROM el  INNER JOIN gaz ON el.sana = gaz.sana INNER JOIN tavar ON el.sana = tavar.sana;`
    conn.query(cc, function (err, result, fields){
        if(err){
            throw err
        }

    const offset = parseInt(ctx.inlineQuery.offset) || 0;
  
    let items = [];
  
    for(var i = 0; i < result.length; i++) {
      items.push({ title: result[i].sana, desc: result[i].sana + ' sanadagi ishlab chiqarilgan mahsulotlar ', id:i, moreinfo: 'More info about item'+i+', mucho importante information'})
    }
  
    let results = items.slice(offset, offset+10).map((item) => ({
      type: "article",
      id: item.id,
      title: item.title,
      "thumb_url": "https://avatars.mds.yandex.net/i?id=7fc186c71af22e1078b49b15a7370763_sr-10122654-images-thumbs&n=13",
      description: item.desc,
      input_message_content: {
        message_text: '/kun '+item.title,
        parse_mode: 'Markdown'
      }
    }));
  
   // console.log('hello');
  
    let ourReturn = ctx.answerInlineQuery(results, {is_personal: true, next_offset: offset+results.length, cache_time: 10});
  
    return ourReturn;
})
  });

// bot.on('inline_query', (ctx)=>{
//      //  console.log(ctx.inlineQuery)
//        result =[
//         {type: 'article', id:'1', title:'08.08.2024', "thumb_url": "https://avatars2.githubusercontent.com/u/10547598?v=3&s=88", description:'tatstsjkasbab', input_message_content: {message_text:'/gaz 08.08.2024'}},
//         {type: 'article', id:'2', title:'08.08.2024',  "thumb_url": "https://avatars2.githubusercontent.com/u/10547598?v=3&s=88", description:'tatstsjkasbab', input_message_content: {message_text:'/gaz 08.08.2024'}},
//         {type: 'article', id:'3', title:'08.08.2024',  "thumb_url": "https://avatars2.githubusercontent.com/u/10547598?v=3&s=88", description:'tatstsjkasbab', input_message_content: {message_text:'/gaz 08.08.2024'}},
//         {type: 'article', id:'4', title:'08.08.2024',  "thumb_url": "https://avatars2.githubusercontent.com/u/10547598?v=3&s=88", description:'tatstsjkasbab', input_message_content: {message_text:'/gaz 08.08.2024'}},
//            {type: 'article', id:'5', title:'08.08.2024',  "thumb_url": "https://avatars2.githubusercontent.com/u/10547598?v=3&s=88", description:'tatstsjkasbab', input_message_content: {message_text:'/gaz 08.08.2024'}},   
//                 {type: 'article', id:'6', title:'title3',   "thumb_url": "https://avatars2.githubusercontent.com/u/10547598?v=3&s=88",description:'tatstsjkasbab', input_message_content: {message_text:'Text3'}}
//        ]

// ctx.answerInlineQuery(result)
//     })
    // let id = '1';
   
    // conn.query('SELECT * FROM el WHERE id = ' + id, function(err, rows, fields) {
    //     if(err) throw err
         
    //     // if user not found
    //     if (rows.length <= 0) {
    //    console.log('bazada yoq')
    //     }
    //     // if user found
    //     else {
    //     console.log('bazada bor')  
    //     }
    // })

bot.launch()




   





// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

const sana = '08.08.2024'
const sql = `SELECT * FROM tavar,el,gaz WHERE gaz.sana = '${sana}'`
var  ss = `SELECT * FROM((tavar INNER JOIN el ON el.sana = tavar.sana) INNER JOIN gaz ON gaz.sana = tavar.sana) WHERE tavar.sana ='${sana}'`
var xa = `SELECT * FROM el  INNER JOIN gaz ON el.sana = gaz.sana INNER JOIN tavar ON el.sana = tavar.sana  WHERE el.sana ='${sana}'`   
var cc = `SELECT * FROM el  INNER JOIN gaz ON el.sana = gaz.sana INNER JOIN tavar ON el.sana = tavar.sana;`
conn.query(cc, function (err, result, fields){
    if(err){
        throw err
    }
    
    
   //console.log(result)
    
    
    /*
result.forEach(im =>{
  ////  console.log(im.sana)
   
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
       console.log(text)
    
    
})*/

})
// const tt = '20.08.2024'
// conn.query('SELECT * FROM el WHERE sana = ?', tt, function (error, results, fields) {
//     if(results[0].sana == tt) {
//         console.log('bazada bor')
//       //tt.outputChatBox(`Ваш аккаунт был найден! ${results[0].sana}`);
//     }
//     else{
//         console.log('bazada yoq')
//      // tt.outputChatBox(`Ваш аккаунт не был найден!`);
//     }
//   });


