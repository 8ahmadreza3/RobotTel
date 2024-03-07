/* eslint-disable array-callback-return */
const { website, backend } = require('../config')
const component = require('../component')
const axios = require('axios')

const createPairbutton = (categories) => {
  let catArray
  for (let i = 0; i < categories.length; i += 2) {
    catArray.push([
      { text: categories[i].name, url: website + 'books/' + categories[i].address },
      { text: categories[i + 1].name, url: website + 'books/' + categories[i + 1].address }
    ])
  }
  if (categories.length % 2 === 0) {
    const { length } = categories
    catArray.push(
      [{ text: categories[length - 1].name, url: website + 'books/' + categories[length - 1].address }]
    )
  }
  return catArray
}

module.exports = async () => {
  const categoriesMessage = `

  کاربر گرامی می توانید دسته بندی مورد نظر خود را انتخاب کنید و کتاب های دسته بندی را ببینید🫰🏼`
  const categories = await axios.get(backend + 'categories')
  const inlineKeyboardInfo = [
    createPairbutton(categories),
    [{ text: 'کتاب های بیشتر📚', url: website + 'books/hame' }],
    component.backButoon()
  ]
  const categoriesOptions = {
    reply_markup: {
      inline_keyboard: inlineKeyboardInfo
    }
  }
  return { categoriesMessage, categoriesOptions }
}
