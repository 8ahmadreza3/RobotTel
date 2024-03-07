/* eslint-disable array-callback-return */
const { website, backend } = require('../config')
const component = require('../component')
const axios = require('axios')

module.exports = async () => {
  const auhtorsMessage = `

  کاربر گرامی می توانید نویسنده مورد نظر خود را انتخاب کنید و کتاب های نویسنده مورد نظر را ببینید🫰🏼`
  const authors = await axios.get(backend + 'authors/recommend')
  const inlineKeyboardInfo = [
    authors.map(author =>
      [{ text: author.name + ' از ' + author.author, url: website + 'author/' + author.address }]
    ),
    [{ text: 'نویسندگان بیشتر', url: website + 'authors' }],
    component.backButoon()
  ]
  const authorsOptions = {
    reply_markup: {
      inline_keyboard: inlineKeyboardInfo
    }
  }
  return { auhtorsMessage, authorsOptions }
}
