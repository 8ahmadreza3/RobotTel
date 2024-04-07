const { website, tel, instagram } = require('../config')
const component = require('../component')

module.exports = (bot, callbackQuery) => {
  const aboutMessage = `
هُمای‌‌کتاب یک سامانه ی امانت دهی و تبادل کتاب📚 است که می توانید به راحتی هر چه تمام تر کتاب مد نظر خود را جستوجو🔎 و در مناسب ترین شرایط کتاب را به امانت بگیرید و یا اگر کتابی دارید که مایل به امانت دهی هستید سامانه ی ما پذیرای شماست✨
امیدواریم در این امر به شما کمکی کرده باشیم🤍

  تیم فناوری کارا

سایت ما ${website}
اینستاگرام ما 
${instagram}
خوشحال میشیم که ما رو دنبال کنید🤍`
  const inlineKeyboardInfo = [[
    { text: 'سایت ما', url: website },
    { text: 'پشتیبانی تلگرام', url: tel },
    component.backButoon()
  ]]
  const aboutOptions = {
    reply_markup: {
      inline_keyboard: inlineKeyboardInfo
    }
  }
  component.editMsgOption(bot, callbackQuery, aboutMessage, aboutOptions)
}
