module.exports = (bot, checkId, messageId, text, options) => {
  const defaultOption = { parse_mode: 'markdown' }
  bot.editMessageText(text, { chat_id: checkId, message_id: messageId, ...defaultOption, ...options })
}
