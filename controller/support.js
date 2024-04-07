const component = require('../component')
const { supportId, instagram, tel } = require('../config')

module.exports = (bot, callbackQuery) => {
  const supportMessage = `
کاربر گرامی برای ارتباط با پشتیبانی می توانید با ${supportId} در تماس باشید .
لینک ارتباط در تلگرام:
${tel}
لینک ارتباط در اینستاگرام:
${instagram}
  `
  const inlineKeyboardSupport = [[
    component.backButoon()
  ]]
  const supportOptions = {
    reply_markup: { inline_keyboard: inlineKeyboardSupport }
  }
  component.editMsgOption(bot, callbackQuery, supportMessage, supportOptions)
}
