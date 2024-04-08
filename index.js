/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
const TelegramBot = require('node-telegram-bot-api')
const { token } = require('./config')
const bot = new TelegramBot(token, { polling: true })
const controller = require('./controller')

bot.onText(/\/start/, msg => {
  controller.start(msg, bot)
})

bot.on('callback_query', async (callbackQuery) => {
  const data = callbackQuery.data
  switch (data) {
    case 'about' :
      controller.about(bot, callbackQuery)
      break
    case 'support' :
      controller.support(bot, callbackQuery)
      break
    case 'menu':
      controller.menu(bot, callbackQuery)
      break
    case 'website':
      controller.website(bot, callbackQuery)
      break
    case 'books':
      await controller.books(bot, callbackQuery)
      break
    case 'authors':
      await controller.authors(bot, callbackQuery)
      break
    case 'categories':
      await controller.categories(bot, callbackQuery)
      break
  }
  bot.answerCallbackQuery(callbackQuery.id)
})
