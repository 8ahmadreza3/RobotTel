const component = require('../component')

module.exports = (msg, bot) => {
  const chatId = msg.chat.id
  const userName = msg.from.first_name
  const userLastName = msg.from.last_name || ''
  const welcomeMessage = `${userName} ${userLastName}\n عزیز به ربات همای کتاب خوش آمدی🙌🏼

می توانید در منوی اصلی از ربات استفاده کنید. 🫶🏼

اگر پیشنهاد یا انتقادی از ربات دارید خوشحال میشیم با ما در میان بگذارید. 🫱🏼‍🫲🏼
`
  const startOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'منو اصلی🗃️', callback_data: 'menu' }
        ],
        [
          { text: 'درباره📌', callback_data: 'about' },
          { text: 'پشتیبانی👨‍🔧', callback_data: 'support' },
          { text: 'سایت ما💡', callback_data: 'website' }
        ]
      ]
    }
  }
  component.sendStartMsg(bot, chatId, welcomeMessage, startOptions)
}
