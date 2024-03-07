/* eslint-disable array-callback-return */
const { website, backend } = require('../config')
const component = require('../component')
const axios = require('axios')

module.exports = async () => {
  console.log('here')
  const authorsMessage = `

  کاربر گرامی می توانید نویسنده مورد نظر خود را انتخاب کنید و کتاب های نویسنده مورد نظر را ببینید🫰🏼`
  let authors
  await axios.get(backend + 'authors')
    .then((res) => {
      authors = res.data.data.authors
    })
  const authorsButton = authors.map(author =>
    [{ text: author.name, url: website + 'author/' + author.address }]
  )
  const inlineKeyboardInfo = [
    ...authorsButton,
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
