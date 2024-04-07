/* eslint-disable array-callback-return */
const { website, backend } = require('../config')
const component = require('../component')
const axios = require('axios')

const createPairbutton = (books) => {
  const buttons = []
  for (let i = 0; i + 1 < books.length; i += 2) {
    const pair = [books[i]]
    if (i + 1 < books.length) {
      pair.push(books[i + 1])
    }
    buttons.push(
      pair.map((book) => ({
        text: book.name,
        url: website + 'book/' + book.address
      }))
    )
  }
  if (books.length % 2 !== 0) {
    const lastBook = [{
      text: books[books.length - 1].name,
      url: website + 'book/' + books[books.length - 1].address
    }]
    buttons.push(lastBook)
  }
  return buttons
}

module.exports = async (bot, callbackQuery) => {
  const booksMessage = `

  کاربر گرامی می توانید کتاب مورد نظر خود را انتخاب کنید و آگهی های مربوطه را ببینید🫰🏼`
  let books
  await axios.get(backend + 'books/recommend')
    .then((res) => {
      books = res.data.data.books
    })
  const inlineKeyboardInfo = [
    ...createPairbutton(books),
    [{ text: 'کتاب های بیشتر📚', url: website + 'books/hame' },
      component.backButoon()]
  ]
  const booksOptions = {
    reply_markup: {
      inline_keyboard: inlineKeyboardInfo
    }
  }
  component.sendMsgOption(bot, callbackQuery, booksMessage, booksOptions)
}
