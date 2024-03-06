const { website, tel } = require('../config')
const component = require('../component')

module.exports = () => {
  const infoMeassage = `
      همای کتاب یک سامانه دسترسی به کتاب است که همگان می تواننده کتاب خود را به امانت بگذارند یا کتاب مورد نیاز را به امانت بگیرند.
      سایت ما ${website}
      
      خوشحال میشیم که ما رو دنبال کنید🤍`
  const inlineKeyboardInfo = [[
    { text: 'سایت ما', url: website },
    { text: 'پشتیبانی تلگرام', url: tel },
    component.backButoon()
  ]]
  const infoOptions = {
    reply_markup: {
      inline_keyboard: inlineKeyboardInfo
    }
  }
  return { infoMeassage, infoOptions }
}
