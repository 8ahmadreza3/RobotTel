/* eslint-disable array-callback-return */
const { website, backend } = require('../config')
const component = require('../component')
const axios = require('axios')

const createPairbutton = (authors) => {
  const buttons = []
  for (let i = 0; i + 1 < authors.length; i += 2) {
    const pair = [authors[i]]
    if (i + 1 < authors.length) {
      pair.push(authors[i + 1])
    }
    buttons.push(
      pair.map((auhtor) => ({
        text: auhtor.name,
        url: website + 'author/' + auhtor.address
      }))
    )
  }
  if (authors.length % 2 !== 0) {
    const lastAuhtors = [{
      text: authors[authors.length - 1].name,
      url: website + 'author/' + authors[authors.length - 1].address
    }]
    buttons.push(lastAuhtors)
  }
  return buttons
}

module.exports = async (bot, callbackQuery) => {
  const authorsMessage = `

  کاربر گرامی می توانید نویسنده مورد نظر خود را انتخاب کنید و کتاب های نویسنده مورد نظر را ببینید🫰🏼`
  let authors
  await axios.get(backend + 'authors/recommend')
    .then((res) => {
      authors = res.data.data.authors
    })
  const inlineKeyboardInfo = [
    ...createPairbutton(authors),
    [{ text: 'نویسندگان بیشتر✍🏼', url: website + 'authors' },
      component.backButoon()]
  ]
  const authorsOptions = {
    reply_markup: {
      inline_keyboard: inlineKeyboardInfo
    }
  }
  component.sendMsgOption(bot, callbackQuery, authorsMessage, authorsOptions)
}
