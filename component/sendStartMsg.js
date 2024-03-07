module.exports = (bot, chatId, text, options) => {
  const defaultOption = { parse_mode: 'markdown' }
  bot.sendMessage(chatId, text, { ...defaultOption, ...options })
}
