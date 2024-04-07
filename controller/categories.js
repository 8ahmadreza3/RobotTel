/* eslint-disable array-callback-return */
const { website, backend } = require('../config')
const component = require('../component')
const axios = require('axios')

const createPairbutton = (categories) => {
  const buttons = []
  for (let i = 0; i + 1 < categories.length; i += 2) {
    const pair = [categories[i]]
    if (i + 1 < categories.length) {
      pair.push(categories[i + 1])
    }
    buttons.push(
      pair.map((category) => ({
        text: category.name,
        url: website + 'books/' + category.address
      }))
    )
  }
  if (categories.length % 2 !== 0) {
    const lastCategory = [{
      text: categories[categories.length - 1].name,
      url: website + 'author/' + categories[categories.length - 1].address
    }]
    buttons.push(lastCategory)
  }
  return buttons
}

module.exports = async (bot, callbackQuery) => {
  const categoriesMessage = `

  کاربر گرامی می توانید دسته بندی مورد نظر خود را انتخاب کنید و کتاب های دسته بندی را ببینید🫰🏼`
  let categories
  await axios.get(backend + 'categories/recommend')
    .then((res) => {
      categories = res.data.data.categories
    })
  const inlineKeyboardInfo = [
    ...createPairbutton(categories),
    [{ text: 'کتاب های بیشتر📚', url: website + 'books/hame' },
      component.backButoon()]
  ]
  const categoriesOptions = {
    reply_markup: {
      inline_keyboard: inlineKeyboardInfo
    }
  }
  component.sendMsgOption(bot, callbackQuery, categoriesMessage, categoriesOptions)
}
