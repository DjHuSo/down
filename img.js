const { createCanvas, loadImage, registerFont } = require('canvas')
const fs = require('fs')

const path = require('path')

 const createImage = async (from, ctx) => {
  
    registerFont(path.join(process.cwd(), "fonts", "DoppiooneRegular.ttf"), {
      family: "DoppiooneRegular",
    });
    const templateImage = await loadImage(
      path.join(process.cwd(), "photo.jpg")
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
    ctx2d.fillText('08.08.2024 da ishlab chiqarilgam maxshulotlar', 100, 39); // Pozitsiyani kerakli joyga sozlang
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
    ctx2d.fillText('7527', 280, 62); // Chigit
    ctx2d.fillText('752', 280, 82); // Sheluxa
    ctx2d.fillText('27527', 280, 102); // Kunjara
    ctx2d.fillText('4174', 280, 122); // Shrot
    ctx2d.fillText('4747', 280, 142); // Press Yog`
    ctx2d.fillText('774747', 280, 162); // Ekstra Yog`
    ctx2d.fillText('4524', 280, 182); // Rafinatsiyalangan Yog`
    ctx2d.fillText('452452', 280, 227); // TR1
    ctx2d.fillText('452452', 280, 247); // Ekstraksiya
    ctx2d.fillText('2528', 280, 267); // Press
    ctx2d.fillText('4272', 280, 287); // TR2
    ctx2d.fillText('752', 280, 307); // Rafinatsiya
    ctx2d.fillText('752', 280, 327); // GEA / LOST
    ctx2d.fillText('752', 280, 347); // Qadoqlash
    ctx2d.fillText('757552', 280, 367); // Kunlik o`rtacha narx
    ctx2d.fillText('56456', 280, 387); // Jami
   ctx2d.fillText('5544', 280, 432); //  Ishlatilgan
    ctx2d.fillText('545', 280, 452); // Narx

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
    ctx2d.fillText('@Darital_hisobot', 80, 492)
    

    const width = 30
    const height = 30

    loadImage("./darital.jpg").then((image) => {
        ctx2d.drawImage(image, 32, 471, width, height );
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync("./image.png", buffer);
      });
    // Canvas ni buffer ga qaytarish
    const finalImageBuffer = canvas.toBuffer();

    // Rasmni vaqtinchalik faylga saqlash
      const outputPath = "output.png";
       fs.writeFileSync(outputPath, finalImageBuffer);

  /*  // Rasmni foydalanuvchiga yuborish
    await ctx.replyWithPhoto(
      {
        source: finalImageBuffer,
      },
      {
        caption: from,
      }
    );
*/
  // Vaqtinchalik faylni o'chirish
  //   fs.unlinkSync(outputPath);
};
createImage('test', '121212')