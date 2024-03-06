module.exports = () => {
  const menuMessage = `منوی اصلی💎\n
  همای کتاب در خدمت شماست.

می توانید گزینه ی مورد نظر خود را انتخاب کنید😉`
  const menuOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'کتاب ها', callback_data: 'books' },
          { text: 'نویسندگان', callback_data: 'authors' },
          { text: 'درباره', callback_data: 'about' },
          { text: 'پشتیبانی', callback_data: 'support' }
        ]
      ]
    }
  }
  return { menuMessage, menuOptions }
}
