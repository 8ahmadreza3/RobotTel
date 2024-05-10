const TelegramBot = require('node-telegram-bot-api')
const { token, port } = require('./config')
const bot = new TelegramBot(token, { polling: true })
const bootApp = require('./app')
const express = require('express')
const app = express()

app.listen(port, () => {
  console.log(`app is running on port:${port}`)
})
bootApp(bot)
