/* eslint-disable array-callback-return */
const { website, backend } = require('../config')
const component = require('../component')
const axios = require('axios')

const createPairbutton = (authors) => {
  const buttons = authors.map((author, index) => {
    const nextAuthor = authors[index + 1]
    return [
      { text: author.name, url: website + 'author/' + author.address },
      nextAuthor ? { text: nextAuthor.name, url: website + 'author/' + nextAuthor.address } : null
    ].filter(Boolean)
  })
  const { length } = authors
  if (length % 2 === 0) {
    buttons[length - 1].push({ text: authors[length - 1].name, url: website + 'author/' + authors[length - 1].address })
  }
  return buttons
}

module.exports = async () => {
  const authorsMessage = `

  کاربر گرامی می توانید نویسنده مورد نظر خود را انتخاب کنید و کتاب های نویسنده مورد نظر را ببینید🫰🏼`
  let authors
  await axios.get(backend + 'authors/recommend')
    .then((res) => {
      authors = res.data.data.authors
    })
  const inlineKeyboardInfo = [
    ...createPairbutton(authors),
    [{ text: 'نویسندگان بیشتر', url: website + 'authors' }],
    [component.backButoon()]
  ]
  const authorsOptions = {
    reply_markup: {
      inline_keyboard: inlineKeyboardInfo
    }
  }
  return { authorsMessage, authorsOptions }
}
