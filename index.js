/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
const TelegramBot = require('node-telegram-bot-api')
const { token } = require('./config')
const bot = new TelegramBot(token, { polling: true })
const component = require('./component')
const controller = require('./controller')

bot.onText(/\/start/, msg => {
  const { chatId, welcomeMessage, startOptions } = controller.start()
  component.sendMsgOption(bot, chatId, welcomeMessage, startOptions)
})

bot.on('callback_query', callbackQuery => {
  const chatId = callbackQuery.message.chat.id
  const messageId = callbackQuery.message.message_id
  const data = callbackQuery.data
  switch (data) {
    case 'about' :
      const { infoMessage, infoOptions } = controller.about()
      component.sendMsgOption(bot, chatId, messageId, infoMessage, infoOptions)
      break
    case 'support' :
      const { supportMessage, supportOptions } = controller.support()
      component.sendMsgOption(bot, chatId, messageId, supportMessage, supportOptions)
      break
    case 'menu':
      const { menuMessage, menuOptions } = controller.menu()
      component.editMsgOption(bot, chatId, messageId, menuMessage, menuOptions)
      break
  }
  bot.answerCallbackQuery(callbackQuery.id)
})
