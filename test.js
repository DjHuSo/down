const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// Bot tokeningizni o'rnating
const bot = new Telegraf('7190846597:AAHRjtggIRQ36YBLaZ_KuBsrWU0oyfeTuRY');

// Kanal username yoki ID sini o'rnating
const channelId = '';
// Admin bilan bog'lanish uchun foydalanuvchi ID sini o'rnating
const adminChatId = '341160833';

// Foydalanuvchi ma'lumotlari va xabar ID larini saqlash uchun ob'ektlar
let userData = {};
let messageIds = {};

// Start buyrug'i
bot.start((ctx) => {
    const chatId = ctx.chat.id;
    userData[chatId] = {}; // Foydalanuvchi ma'lumotlarini saqlash uchun bo'sh ob'ekt yaratish
    messageIds[chatId] = []; // Xabar ID larini saqlash uchun bo'sh massiv yaratish

    ctx.reply("Assalomu alaykum! Tibbiy so'rovnomaga xush kelibsiz. Iltimos, kontakt ma'lumotlaringizni yuboring:",
        Markup.keyboard([
            [Markup.button.contactRequest('📱 Telefon raqamni yuborish')]
        ]).resize()
    ).then((message) => {
        messageIds[chatId].push(message.message_id);
    }).catch(err => console.error('Xabar yuborishda xatolik:', err));

    // Kanaldan yangi foydalanuvchi haqida xabar berish
    ctx.telegram.sendMessage(channelId, `Yangi foydalanuvchi botga qo'shildi: ${ctx.from.first_name} (@${ctx.from.username || 'username yo\'q'})`)
        .catch(err => console.error('Telegram xatoligi:', err));
});

// Xatoliklarni ushlash uchun middleware
bot.catch((err, ctx) => {
    console.error(`Bot xatosi (${ctx.updateType}):`, err);
    ctx.reply('Xatolik yuz berdi, iltimos, keyinroq qayta urinib ko\'ring.');
});

// Kontaktni qabul qilish
bot.on('contact', (ctx) => {
    const chatId = ctx.chat.id;
    userData[chatId] = userData[chatId] || {};
    userData[chatId].phoneNumber = ctx.message.contact.phone_number;
    messageIds[chatId] = messageIds[chatId] || [];
    messageIds[chatId].push(ctx.message.message_id);

    // Kontakt yuborilgandan so'ng klaviaturani olib tashlash
    ctx.reply("Rahmat! Endi ismingiz va familiyangizni kiriting (masalan, Abdulhamid Haydarov):", Markup.removeKeyboard())
        .then((message) => {
            messageIds[chatId].push(message.message_id);
        }).catch(err => console.error('Xabar yuborishda xatolik:', err));
});

// Matnni qabul qilish
bot.on('text', (ctx) => {
    const chatId = ctx.chat.id;
    userData[chatId] = userData[chatId] || {};
    messageIds[chatId] = messageIds[chatId] || [];
    messageIds[chatId].push(ctx.message.message_id);

    if (!userData[chatId].name) {
        const [name, surname] = ctx.message.text.split(' ');
        userData[chatId].name = name;
        userData[chatId].surname = surname || '';ctx.reply("Iltimos, tug'ilgan sanangizni kiriting (kun-oy-yil formatida, masalan, 01-01-2000):")
        .catch(err => console.error('Xabar yuborishda xatolik:', err));
} else if (!userData[chatId].birthDate) {
    userData[chatId].birthDate = ctx.message.text;
    ctx.reply("Endi yashash joyingizni tanlang:",
        Markup.keyboard([
            ['Toshkent', 'Samarqand'],
            ['Andijon', 'Farg‘ona'],
            ['Qashqadaryo', 'Surxondaryo'],
            ['Namangan', 'Buxoro'],
            ['Jizzax', 'Sirdaryo'],
            ['Xorazm', 'Navoiy'],
            ['Qoraqolpog‘iston', 'Toshkent Shahri'],
        ]).resize()
    ).then((message) => {
        messageIds[chatId].push(message.message_id);
    }).catch(err => console.error('Xabar yuborishda xatolik:', err));
} else if (!userData[chatId].region) {
    userData[chatId].region = ctx.message.text;
    ctx.reply("Iltimos, tuman yoki shahar nomini kiriting:", Markup.removeKeyboard())
        .then((message) => {
            messageIds[chatId].push(message.message_id);
        }).catch(err => console.error('Xabar yuborishda xatolik:', err));
} else if (!userData[chatId].city) {
    userData[chatId].city = ctx.message.text;
    ctx.reply("Bo'yingizni kiriting (sm):")
        .then((message) => {
            messageIds[chatId].push(message.message_id);
        }).catch(err => console.error('Xabar yuborishda xatolik:', err));
} else if (!userData[chatId].height && /^[0-9]+$/.test(ctx.message.text)) {
    userData[chatId].height = ctx.message.text;
    ctx.reply("Vazningizni kiriting (kg):")
        .then((message) => {
            messageIds[chatId].push(message.message_id);
        }).catch(err => console.error('Xabar yuborishda xatolik:', err));
} else if (!userData[chatId].weight && /^[0-9]+$/.test(ctx.message.text)) {
    userData[chatId].weight = ctx.message.text;
    ctx.reply("Qon guruhiingizni tanlang:",
        Markup.inlineKeyboard([
            [Markup.button.callback('O(I)', 'bloodType_O')],
            [Markup.button.callback('A(II)', 'bloodType_A')],
            [Markup.button.callback('B(III)', 'bloodType_B')],
            [Markup.button.callback('AB(IV)', 'bloodType_AB')],
            [Markup.button.callback('Bilmayman', 'bloodType_bilmaydi')]
        ])
    ).then((message) => {
        messageIds[chatId].push(message.message_id);
    }).catch(err => console.error('Xabar yuborishda xatolik:', err));
} else {
    // Kutilmagan xabarlar
    handleUnexpectedMessage(ctx);
}
});

// Qon guruhi tugmalari uchun harakatlarni boshqarish
bot.action(['bloodType_O', 'bloodType_A', 'bloodType_B', 'bloodType_AB', 'bloodType_bilmaydi'], (ctx) => {
const chatId = ctx.chat.id;
userData[chatId].bloodType = ctx.match[0].split('_')[1];

ctx.reply("Sizning rezus omilingiz (Rh) qanday?",
    Markup.inlineKeyboard([
        [Markup.button.callback('Musbat (+)', 'rh_positive')],
        [Markup.button.callback('Manfiy (-)', 'rh_negative')],
        [Markup.button.callback('Bilmayman', 'rh_unknown')]
    ])
).then((message) => {
    messageIds[chatId].push(message.message_id);
}).catch(err => console.error('Xabar yuborishda xatolik:', err));
ctx.answerCbQuery();
});

// Rh omil tugmalari uchun harakatlarni boshqarish
bot.action(['rh_positive', 'rh_negative', 'rh_unknown'], (ctx) => {
const chatId = ctx.chat.id;
const rhFactors = {
    'rh_positive': 'Musbat (+)',
    'rh_negative': 'Manfiy (-)',
    'rh_unknown': 'Bilmayman'
};
userData[chatId].rhFactor = rhFactors[ctx.match[0]];ctx.reply("Sizda yuqumli kasalliklar bormi?",
    Markup.inlineKeyboard([
        [Markup.button.callback('Bor', 'infectiousDisease_yes')],
        [Markup.button.callback('Yo\'q', 'infectiousDisease_no')]
    ])
).then((message) => {
    messageIds[chatId].push(message.message_id);
}).catch(err => console.error('Xabar yuborishda xatolik:', err));
ctx.answerCbQuery();
});

// Yuqumli kasalliklar tugmalari uchun harakatlarni boshqarish
bot.action(['infectiousDisease_yes', 'infectiousDisease_no'], (ctx) => {
const chatId = ctx.chat.id;
userData[chatId].infectiousDisease = ctx.match[0] === 'infectiousDisease_yes';

// Oldingi xabarlarni o'chirish
if (messageIds[chatId] && messageIds[chatId].length > 0) {
    messageIds[chatId].forEach(msgId => {
        ctx.telegram.deleteMessage(ctx.chat.id, msgId)
            .catch(err => console.error('Xabarni o\'chirishda xatolik:', err));
    });
    messageIds[chatId] = [];
}

// Foydalanuvchi ma'lumotlarini kanalda yuborish
const userInfo = `
Foydalanuvchi ma'lumotlari:
Ism: ${userData[chatId].name}
Familiya: ${userData[chatId].surname}
Telefon raqami: ${userData[chatId].phoneNumber}
Tug'ilgan sanasi: ${userData[chatId].birthDate}
Hudud: ${userData[chatId].region}
Shahar/tuman: ${userData[chatId].city}
Bo'yi: ${userData[chatId].height} sm
Vazni: ${userData[chatId].weight} kg
Qon guruhi: ${userData[chatId].bloodType}
Rezus omili: ${userData[chatId].rhFactor}
Yuqumli kasallik: ${userData[chatId].infectiousDisease ? 'Bor' : 'Yo\'q'}
`;

ctx.telegram.sendMessage(channelId, userInfo)
    .catch(err => console.error('Telegram xatoligi:', err));

ctx.reply("Rahmat! So'rovnoma yakunlandi.")
    .catch(err => console.error('Xabar yuborishda xatolik:', err));
ctx.answerCbQuery();
});

// Kutilmagan xabarlar uchun funksiya
function handleUnexpectedMessage(ctx) {
ctx.reply("Noma'lum xabar oldim. Iltimos, ko'rsatmalarni bajaring.")
    .catch(err => console.error('Xabar yuborishda xatolik:', err));

// Adminni xabardor qilish
const alertMessage = `Nomalum xabar olindi:\nFoydalanuvchi: ${ctx.from.first_name}\nUsername: @${ctx.from.username}\nXabar: ${ctx.message.text}`;
ctx.telegram.sendMessage(adminChatId, alertMessage)
    .catch(err => console.error('Admin xabar yuborishda xatolik:', err));
}

// Vercel uchun doimiy harakat
const keepAlive = () => {
http.get('https://tibbiyot-ten.vercel.app/');
};

setInterval(keepAlive, 300000); // Har 5 daqiqada "ping" qiladi

// Botni ishga tushirish
bot.launch().then(() => console.log('Bot ishga tushdi...'))
.catch(err => console.error('Botni ishga tushirishda xatolik:', err));