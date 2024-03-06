/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
const TelegramBot = require('node-telegram-bot-api')
const { supportId, token } = require('./config')
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
      const { infoMessage, infoOptions } = controller.aboutController
      component.sendMsgOption(bot, chatId, messageId, infoMessage, infoOptions)
      break
    case 'support' :
      
      component.sendMsgOption(bot, chatId, messageId, supportMessage, supportOptions)
      break
    case 'menu':
      const { menuMessage, menuOptions } = controller.menuController()
      component.editMsgOption(bot, chatId, messageId, menuMessage, menuOptions)
      break
  }
  bot.answerCallbackQuery(callbackQuery.id)
})
