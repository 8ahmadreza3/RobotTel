module.exports = (bot, callbackQuery, text, options) => {
  const chatId = callbackQuery.message.chat.id
  const messageId = callbackQuery.message.message_id
  const defaultOption = { parse_mode: 'markdown' }
  bot.editMessageText(text, { chat_id: chatId, message_id: messageId, ...defaultOption, ...options })
}
