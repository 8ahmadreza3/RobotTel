/* eslint-disable array-callback-return */
const { website, backend } = require('../config')
const component = require('../component')
const axios = require('axios')

const createPairbutton = (categories) => {
  const buttons = categories.map((category, index) => {
    const nextCategory = categories[index + 1]
    return [
      { text: category.name, url: website + 'books/' + category.address },
      nextCategory ? { text: nextCategory.name, url: website + 'books/' + nextCategory.address } : null
    ].filter(Boolean)
  })
  const { length } = categories
  if (length % 2 === 0) {
    buttons[length - 1].push({ text: categories[length - 1].name, url: website + 'books/' + categories[length - 1].address })
  }
  return buttons
}

module.exports = async () => {
  const categoriesMessage = `

  کاربر گرامی می توانید دسته بندی مورد نظر خود را انتخاب کنید و کتاب های دسته بندی را ببینید🫰🏼`
  const categories = await axios.get(backend + 'categories/recommend')
  const inlineKeyboardInfo = [
    ...createPairbutton(categories),
    [{ text: 'کتاب های بیشتر📚', url: website + 'books/hame' }],
    [component.backButoon()]
  ]
  const categoriesOptions = {
    reply_markup: {
      inline_keyboard: inlineKeyboardInfo
    }
  }
  return { categoriesMessage, categoriesOptions }
}
