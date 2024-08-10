const { createUserGroup, getList } = require("./joindb");
const { Markup, Telegraf } = require("telegraf");
const admin = 840023855;
const bot = new Telegraf("");

//_________InlineButtonlar____________
const iKb = Markup.inlineKeyboard;
const inBurl = Markup.button.url;
//_________oddiyButtonlar____________
const buttons = Markup.keyboard([
  ["Send Groups", "Send Users"],
  ["ForSend Groups", "ForSend Users"],
  ["Statistika"],
]).resize();
const back = Markup.keyboard([["Bekor Qilish"]]).resize();
let kanal = "https://t.me/joinchat/VerzQ0bL-cSaZW1o";
//_________Botda malumot saqlash_____
bot.context.db = {
  userSend: false,
  groupSend: false,
  forSendUser: false,
  forSendGroup: false,
  countUSer: 0,
  countGroup: 0,
};
//_________Start____________
bot.start(async (ctx) => {
  await ctx.replyWithHTML(
    `<b>Assalomu Alaykum👋. <b>\nMen Guruhdagi Kirdi Chiqdilarni yani Guruhga qo'shildi , Guruhdan chiqdi va Guruhga Odam qo'shdi yozuvlarini Tozalayman.</b>
    \nMen Guruhda to'liq ishlashim uchun Meni guruhingizda ADMIN qilishingiz kerak.</b> 
        
        🤖 @SmartJoinhiderBot 🤖`,
    iKb([
      [
        inBurl(
          "➕ Guruhga Qo'shish ➕",
          "telegram.me/SmartJoinhiderBot?startgroup=new"
        ),
      ],
      [inBurl("🤖 Botlar Kanali 🤖", kanal)],
      [
        inBurl(
          "Botni Guruhga Admin Qilish ✅",
          "https://t.me/BotIar_Kanali/10"
        ),
      ],
    ])
  );
  try {
    const type = ctx.chat.type;
    if (type === "group" || type === "supergroup") {
      await createUserGroup(ctx.chat.id, "group");
    } else {
      await createUserGroup(ctx.chat.id, "user");
    }
  } catch (error) {
    console.log(error + " user qoshilganda error");
  }
}).catch(error=>console.log(error));

//_________AdminCommanda____________
bot.command("admin", async (ctx) => {
  if (ctx.chat.id == admin) {
    await ctx.replyWithHTML("Admin panelga hush kelibsiz!", buttons);
  }
}).catch(error=>console.log(error));
//_________StatistikaBot_____________
bot.hears("Statistika", async (ctx) => {
  if (ctx.chat.id == admin) {
    let selGr = await getList("group").then((item) => item);
    let selUser = await getList("user").then((item) => item);
    let gr = selGr.length;
    let us = selUser.length;
    let all = gr + us;
    const text = `<b>📡 Bot statistics
👥 Groups: ${gr}
👤 Members: ${us}
🔁 All: ${all}</b>`;
    await ctx.replyWithHTML(text);
  }
}).catch(error=>console.log(error));
bot.hears("Bekor Qilish", async (ctx) => {
  ctx.db.userSend = false;
  ctx.db.groupSend = false;
  ctx.db.forSendUser = false;
  ctx.db.forSendGroup = false;
  await ctx.replyWithHTML("Ortga Qaytdingiz", buttons);
}).catch(error=>console.log(error));
//_________Send USers____________
bot.hears("Send Users", async (ctx) => {
  if (ctx.chat.id == admin) {
    ctx.db.userSend = true;
    await ctx.replyWithHTML("Userlarga yuboriladigan xabarni kiriting!", back);
  }
}).catch(error=>console.log(error));

bot.hears("Send Groups", async (ctx) => {
  if (ctx.chat.id == admin) {
    ctx.db.groupSend = true;
    await ctx.replyWithHTML("Guruhlarga yuboriladigan xabarni kiriting!", back);
  }
}).catch(error=>console.log(error));

bot.hears("ForSend Groups", async (ctx) => {
  if (ctx.chat.id == admin) {
    ctx.db.forSendGroup = true;
    await ctx.replyWithHTML(
      "Guruhlarga yuboriladigan forward xabarni kiriting!",
      back
    );
  }
}).catch(error=>console.log(error));

bot.hears("ForSend Users", async (ctx) => {
  if (ctx.chat.id == admin) {
    ctx.db.forSendUser = true;
    await ctx.replyWithHTML(
      "Userlarga yuboriladigan forward xabarni kiriting!",
      back
    );
  }
}).catch(error=>console.log(error));
bot.on("forward_date", async (ctx) => {
    if (ctx.chat.id == admin && ctx.db.forSendGroup) {
      ctx.db.forSendGroup = false;
      await sendForwardGroup(ctx);
    } else if (ctx.chat.id == admin && ctx.db.forSendUser) {
      ctx.db.forSendUser = false;
      await sendForwardUSer(ctx);
    }
  }).catch(error=>console.log(error));
  //_________GruxlarniTozalash______
  bot.on(
    [
      "left_chat_member",
      "new_chat_members",
      "new_chat_photo",
      "new_chat_title",
      "pinned_message",
    ],
    async (ctx) => {
      try {
        await ctx.deleteMessage(ctx.message.message_id);
      } catch (error) {
        console.log(error);
      }
    }
  ).catch(error=>console.log(error));
  bot.on("message", async (ctx) => {
    if (ctx.chat.id == admin && ctx.db.userSend) {
      try {
        await sendUsersMessage(ctx);
      } catch (error) {
        console.log(error);
      }
      ctx.db.userSend = false;
    } else if (ctx.chat.id == admin && ctx.db.groupSend) {
      try {
        await sendGroupMessage(ctx);
      } catch (error) {
          console.log(error)
      }
      ctx.db.groupSend = false;
    }
  }).catch(error=>console.log(error));
  
  bot.catch((err,ctx)=>{
    console.log("OOp crashed")
    ctx.reply("Xataolik yuz berdi")
  })
  
  bot.launch().catch(error=>console.log(error));
  async function sendUsersMessage(ctx) {
    let count = 0;
    let selUser = await getList("user").then((item) => item);
    console.log(selUser);
    for (let i = 0; i < selUser.length; i++) {
      const user = selUser[i];
      try {
        await bot.telegram.sendMessage(
          user.dataValues["chat_id"],
          ctx.message.text,
          { disable_notification: false }
        );
        count++;
      } catch (error) {
        console.log(error);
      }
      await sleep(80)
    }
    await ctx.telegram.sendMessage(
      admin,
      ${count} ta foydalanuvchiga habar yuborildi,
      buttons
    );
  }
  
  async function sendGroupMessage(ctx) {
    let count = 0;
    let selGrop = await getList("group").then((item) => item);
    for (let i = 0; i < selGrop.length; i++) {
      const user = selGrop[i];
      try {
        await bot.telegram.sendMessage(
          user.dataValues["chat_id"],
          ctx.message.text,
          { disable_notification: false }
        );
        count++;
      } catch (error) {
        console.log(error);
      }
      await sleep(80)
    }
    await ctx.telegram.sendMessage(
      admin,
      ${count} ta gruxga  habar yuborildi,
      buttons
    );
  }
  
  async function sendForwardGroup(ctx) {
    let count = 0;
    let selGrop = await getList("group").then((item) => item);
    for (let i = 0; i < selGrop.length; i++) {
      const group = selGrop[i];
      try {
        await bot.telegram.forwardMessage(
          group.dataValues["chat_id"],
          admin,
          ctx.message.message_id,
          { disable_notification: false }
        );
        count++;
      } catch (error) {
        console.log("Blocklagan gruxlar");
      }
      await sleep(80)
    }
    await ctx.telegram.sendMessage(
      admin,
      ${count} ta gruxga forward habar yuborildi,
      buttons
    );
  }
  
  async function sendForwardUSer(ctx) {
    let count = 0;
    let selUser = await getList("user").then((item) => item);
    for (let i = 0; i < selUser.length; i++) {
      const user = selUser[i];
      try {
        await bot.telegram.forwardMessage(
          user.dataValues["chat_id"],
          admin,
          ctx.message.message_id,
          { disable_notification: false }
        );
        count++;
      } catch (error) {
        console.log(error)
      }
      await sleep(80)
    }
    await ctx.telegram.sendMessage(
      admin,
      ${count} ta userga forward habar yuborildi,
      buttons
    );
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }