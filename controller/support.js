const component = require('../component')
const { supportId, instagram } = require('../config')

module.exports = () => {
  const supportMessage = `
  کاربر گرامی 🤞
  می توانید با پشتیبانی ${supportId} در ارتباط باشید \n
همچنین در اینستاگرام ${instagram} نیز فعال هستیم🤍`
  const inlineKeyboardSupport = [[
    component.backButoon()
  ]]
  const supportOptions = { reply_markup: { inline_keyboard: inlineKeyboardSupport } }
  return { supportMessage, supportOptions }
}
