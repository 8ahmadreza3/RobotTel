const component = require('../component')
const { supportId } = require('../config')

module.exports = () => {
  const supportMessage = `
  کاربر گرامی 🤞
  می توانید با پشتیبانی ${supportId} پیام دهید
  همچنین در اینستاگرام با آیدی ${supportId} نیز فعال هستیم🤍`
  const inlineKeyboardSupport = [[
    component.backButoon()
  ]]
  const supportOptions = { reply_markup: { inline_keyboard: inlineKeyboardSupport } }
  return { supportMessage, supportOptions }
}
