const component = require('../component')

module.exports = (bot, callbackQuery) => {
  const menuMessage = `منوی اصلی💎\n
  همای کتاب در خدمت شماست.

می توانید گزینه ی مورد نظر خود را انتخاب کنید😉`
  const menuOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'کتاب ها📚', callback_data: 'books' },
          { text: 'نویسندگان✍🏼', callback_data: 'authors' },
          { text: 'دسته بندی🗂️', callback_data: 'categories' }
        ], [
          { text: 'درباره 🧩', callback_data: 'about' },
          { text: 'پشتیبانی📞', callback_data: 'support' },
          { text: 'سایت ما💡', callback_data: 'website' }
        ]
      ]
    }
  }
  component.editMsgOption(bot, callbackQuery, menuMessage, menuOptions)
}
