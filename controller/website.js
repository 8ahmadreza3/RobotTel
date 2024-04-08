const { website } = require('../config')
const component = require('../component')

module.exports = (bot, callbackQuery) => {
  const webMessage = `
کاربر گرامی هُمای‌‌کتاب
برای دسترسی سریع تر به وبسایت میتوانید گزینه ی مورد نظر خود را انتخاب کنید🫰🏼😉`
  const webOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'کتاب ها📚', url: website + 'books/hame' },
          { text: 'نویسندگان✍🏼', url: website + 'authors' },
          { text: 'دسته بندی🗂️', url: website + 'books/hame' }
        ], [
          { text: 'ثبت نام/ورود', url: website + 'auth' },
          { text: 'صفحه اصلی', url: website },
          { text: 'درباره ما', url: website + 'info' }
        ], [
          { text: 'درباره 🧩', callback_data: 'about' },
          { text: 'پشتیبانی📞', callback_data: 'support' },
          component.backButoon()
        ]
      ]
    }
  }
  component.editMsgOption(bot, callbackQuery, webMessage, webOptions)
}
