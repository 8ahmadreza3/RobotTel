/* eslint-disable array-callback-return */
const { website, backend } = require('../config')
const component = require('../component')
const axios = require('axios')

module.exports = async () => {
  const booksMessage = `

  کاربر گرامی می توانید کتاب مورد نظر خود را انتخاب کنید و آگهی های مربوطه را ببینید🫰🏼`
  let books
  await axios.get(backend + 'books')
    .then((res) => {
      books = res.data.data.books
    })
  const bookButtons = books.map(book =>
    [{ text: book.name + ' از ' + book.author, url: website + 'book/' + book.address }]
  )
  const inlineKeyboardInfo = [
    ...bookButtons,
    [{ text: 'کتاب های بیشتر📚', url: website + 'books/hame' }],
    [component.backButoon()]
  ]
  const booksOptions = {
    reply_markup: {
      inline_keyboard: inlineKeyboardInfo
    }
  }
  return { booksMessage, booksOptions }
}
