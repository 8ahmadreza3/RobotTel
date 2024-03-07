require('dotenv').config()

module.exports = {
  token: process.env.TOKEN,
  website: process.env.WEBSITE,
  tel: process.env.TELEGRAM,
  supportId: process.env.SUPPORTID,
  backend: process.env.BACKEND
}
