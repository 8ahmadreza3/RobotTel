/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
const TelegramBot = require('node-telegram-bot-api')
const { supportId, token, tel, website } = require('./config')
const bot = new TelegramBot(token, { polling: true })
const component = require('./component')
const controller = require('./controller')

bot.onText(/\/start/, msg => {
  const { chatId, welcomeMessage, startOptions } = controller.startController()
  component.sendMsgOption(bot, chatId, welcomeMessage, startOptions)
})

bot.on('callback_query', callbackQuery => {
  const chatId = callbackQuery.message.chat.id
  const messageId = callbackQuery.message.message_id
  const data = callbackQuery.data
  switch (data) {
    case 'about' :
      const homayeketabInfo = `
      همای کتاب یک سامانه دسترسی به کتاب است که همگان می تواننده کتاب خود را به امانت بگذارند یا کتاب مورد نیاز را به امانت بگیرند.
      سایت ما ${website}
      خوشحال میشیم که ما رو دنبال کنید🤍`
      const inlineKeyboardInfo = [[
        { text: 'سایت ما', url: website },
        { text: 'پشتیبانی تلگرام', url: tel },
        component.backButoon()
      ]]
      const aboutMeOptions = {
        reply_markup: {
          inline_keyboard: inlineKeyboardInfo
        }
      }
      component.sendMsgOption(bot, chatId, messageId, homayeketabInfo, aboutMeOptions)
      break
    case 'support' :
      const supportMessage = `
      کاربر گرامی 🤞
      می توانید با پشتیبانی ${supportId} پیام دهید
      همچنین در اینستاگرام با آیدی ${supportId} نیز فعال هستیم🤍`
      const inlineKeyboardSupport = [[
        component.backButoon()
      ]]
      const supportOptions = { reply_markup: { inline_keyboard: inlineKeyboardSupport } }
      component.sendMsgOption(bot, chatId, messageId, supportMessage, supportOptions)
      break
    case 'menu':
      const { menuMessage, menuOptions } = controller.menuController()
      component.editMsgOption(bot, chatId, messageId, menuMessage, menuOptions)
      break
  }
  bot.answerCallbackQuery(callbackQuery.id)
})
