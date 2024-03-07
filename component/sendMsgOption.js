module.exports = (bot, callbackQuery, text, options) => {
  const chatId = callbackQuery.message.chat.id
  const defaultOption = { parse_mode: 'markdown' }
  bot.sendMessage(chatId, text, { ...defaultOption, ...options })
}
