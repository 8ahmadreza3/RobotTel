module.exports = (msg) => {
  const chatId = msg.chat.id
  const userName = msg.from.first_name
  const userLastName = msg.from.last_name || ''
  const welcomeMessage = `${userName} ${userLastName}\n عزیز به ربات همای کتاب خوش آمدی🙌

می توانید در منوی اصلی  از ربات استفاده کنید
  `
  const startOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'درباره📌', callback_data: 'about' },
          { text: 'پشتیبانی👨‍🔧', callback_data: 'support' },
          { text: 'منو اصلی🗃️', callback_data: 'menu' }
        ]
      ]
    }
  }
  return { chatId, welcomeMessage, startOptions }
}
