/* eslint-disable array-callback-return */
const { website, backend } = require('../config')
const component = require('../component')
const axios = require('axios')

const createPairbutton = (books) => {
  const buttons = books.map((book, index) => {
    const nextBook = books[index + 1]
    return [
      { text: book.name + ' از ' + book.author, url: website + 'book/' + book.address },
      nextBook ? { text: book.name + ' از ' + book.author, url: website + 'book/' + nextBook.address } : null
    ].filter(Boolean)
  })
  const { length } = books
  if (length % 2 === 0) {
    buttons[buttons.length - 1].push({ text: books[length - 1].name + ' از ' + books[length - 1].author, url: website + 'books/' + books[length - 1].address })
  }
  return buttons
}

module.exports = async () => {
  const booksMessage = `

  کاربر گرامی می توانید کتاب مورد نظر خود را انتخاب کنید و آگهی های مربوطه را ببینید🫰🏼`
  let books
  await axios.get(backend + 'books/recommend')
    .then((res) => {
      books = res.data.data.books
    })
  const inlineKeyboardInfo = [
    ...createPairbutton(books),
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
