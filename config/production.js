const fs = require('fs')

if (!fs.existsSync('.env')) {
  throw new Error('🔥🔥 => No existe el archivo .env cree una copia del archivo .env.example y coloque los valores de producción')
}

require('dotenv').config()

const SERVER = {
  HOST: process.env.HOST,
  PORT: 80,
  HTTPS: false,
  DOMAIN_NAME_CERT: null
}

const MONGODB = {
  URI: process.env.MONGODB_URI
}

const JSWT = {
  SESSION_SECRET: process.env.JSWT_SESSION_SECRET,
  SESSION_EXPIRE_IN: '2d'
}

const GOOGLE = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
}

const FACEBOOK = {
  APP_ID: process.env.FACEBOOK_APP_ID,
  APP_SECRET: process.env.FACEBOOK_APP_SECRET
}

module.exports = {
  SERVER,
  MONGODB,
  JSWT,
  GOOGLE,
  FACEBOOK
}
