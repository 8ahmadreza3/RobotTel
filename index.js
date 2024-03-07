/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
const TelegramBot = require('node-telegram-bot-api')
const { token } = require('./config')
const bot = new TelegramBot(token, { polling: true })
const component = require('./component')
const controller = require('./controller')

bot.onText(/\/start/, msg => {
  const { chatId, welcomeMessage, startOptions } = controller.start(msg)
  component.sendStartMsg(bot, chatId, welcomeMessage, startOptions)
})

bot.on('callback_query', async (callbackQuery) => {
  const data = callbackQuery.data
  switch (data) {
    case 'about' :
      const { aboutMessage, aboutOptions } = controller.about()
      component.editMsgOption(bot, callbackQuery, aboutMessage, aboutOptions)
      break
    case 'support' :
      const { supportMessage, supportOptions } = controller.support()
      component.editMsgOption(bot, callbackQuery, supportMessage, supportOptions)
      break
    case 'menu':
      const { menuMessage, menuOptions } = controller.menu()
      component.editMsgOption(bot, callbackQuery, menuMessage, menuOptions)
      break
    case 'books':
      const { booksMessage, booksOptions } = await controller.books()
      component.sendMsgOption(bot, callbackQuery, booksMessage, booksOptions)
      break
    // case 'authors':
    //   const { authorsMessage, authorsOptions } = controller.authors()
    //   component.sendMsgOption(bot, callbackQuery, authorsMessage, authorsOptions)
    //   break
    // case 'categories':
    //   const { categoriesMessage, categoriesOptions } = controller.categories()
    //   component.sendMsgOption(bot, callbackQuery, categoriesMessage, categoriesOptions)
    //   break
  }
  bot.answerCallbackQuery(callbackQuery.id)
})
