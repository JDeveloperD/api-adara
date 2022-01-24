require('dotenv').config()
const pkj = require('../package.json')

const API = {
  VERSION: 1,
  INFO: {
    name: pkj.name,
    version: pkj.version,
    description: pkj.description,
    author: pkj.author
  }
}

const SERVER = {
  HOST: 'http://localhost',
  PORT: 3002,
  HTTPS: false
}

const MONGODB = {
  URI: 'mongodb://localhost:27017/rest_api_starter'
}

const JSWT = {
  SESSION_SECRET: 'secret',
  SESSION_EXPIRE_IN: '2m'
}

const LOGGER = 'dev'

const GOOGLE = {
  CLIENT_ID: null,
  CLIENT_SECRET: null
}

const FACEBOOK = {
  APP_ID: null,
  APP_SECRET: null
}

module.exports = {
  API,
  SERVER,
  MONGODB,
  JSWT,
  GOOGLE,
  FACEBOOK,
  LOGGER
}
