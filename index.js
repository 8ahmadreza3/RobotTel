/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
const TelegramBot = require('node-telegram-bot-api')
const { supportId, token, tel, website } = require('./config')
const bot = new TelegramBot(token, { polling: true })

const createInLineButtons = buttones => buttones.map((button) => ({
  text: button.text,
  callback_data: button.callback_data
}))

const createBackButton = () => ({ text: 'بازگشت🔙', callback_data: 'back' })

const sendMessageWithOptions = (chatId, text, options) => {
  const defaultOption = { parse_mode: 'markdown' }
  bot.sendMessage(chatId, text, { ...defaultOption, ...options })
}

const editMessageWithOptions = (checkId, messageId, text, options) => {
  const defaultOption = { parse_mode: 'markdown' }
  bot.editMessageText(text, { chat_id: checkId, message_id: messageId, ...defaultOption, ...options })
}

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id
  const userName = msg.from.first_name
  const userLastName = msg.from.last_name || ''
  const welcome = `${userName} ${userLastName}\n عزیز به ربات همای کتاب خوش آمدی🙌`
  const startOptions = {
    reply_markup: {
      inline_keyboard: [
        createInLineButtons([{ text: 'درباره', callback_data: 'about' }, { text: 'پشتیبانی', callback_data: 'support' }])
      ]
    }
  }
  sendMessageWithOptions(chatId, welcome, startOptions)
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
        createBackButton()
      ]]
      const aboutMeOptions = {
        reply_markup: {
          inline_keyboard: inlineKeyboardInfo
        }
      }
      editMessageWithOptions(chatId, messageId, homayeketabInfo, aboutMeOptions)
      break
    case 'support' :
      const supportMessage = `
      کاربر گرامی 🤞
      می توانید با پشتیبانی ${supportId} پیام دهید
      همچنین در اینستاگرام با آیدی ${supportId} نیز فعال هستیم🤍`
      const inlineKeyboardSupport = [[
        createBackButton()
      ]]
      const supportOptions = { reply_markup: { inline_keyboard: inlineKeyboardSupport } }
      editMessageWithOptions(chatId, messageId, supportMessage, supportOptions)
      break
  }
  bot.answerCallbackQuery(callbackQuery.id)
})
