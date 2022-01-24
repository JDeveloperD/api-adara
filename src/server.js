/**
 * @fileoverview server.js, archivo de arranque del servidor
 * @version     1.0
 * @author      David Sandoval <ing.david1993@gmail.com>
 *
 * History
 * v1.0     -   creación del archivo
 */
import chalk from 'chalk'
import http from 'http'
import https from 'https'
import { readFileSync } from 'fs'
import app from './app'
import config from 'config'
import * as mongodb from 'services/databases/mongodb'

const ENVIRONMENT = config.util.getEnv('NODE_ENV').toUpperCase()
const { HOST, PORT, HTTPS, DOMAIN_NAME_CERT } = config.get('SERVER')
const { URI } = config.get('MONGODB')

console.info(`✔️  [ENVIRONMENT] =>  ${chalk.bgGreen.black(ENVIRONMENT)}`)

/**
 * ---------------------------------------------------------------------
 * Inicialización del servidor
 * ---------------------------------------------------------------------
 */
if (HTTPS) {
  const options = {
    key: readFileSync(`/etc/letsencrypt/live/${DOMAIN_NAME_CERT}/privkey.pem`),
    cert: readFileSync(`/etc/letsencrypt/live/${DOMAIN_NAME_CERT}/cert.pem`),
    ca: readFileSync(`/etc/letsencrypt/live/${DOMAIN_NAME_CERT}/chain.pem`)
  }

  https.createServer(options, app).listen(PORT, () => {
    console.info(`✔️  [SERVER] => ${chalk.bgGreen.black(`${HOST}:${PORT}`)} `)
  })
} else {
  http.createServer(app).listen(PORT, () => {
    console.info(`✔️  [SERVER] => ${chalk.bgGreen.black(`${HOST}:${PORT}`)} `)
  })
}

/**
 * ---------------------------------------------------------------------
 * Realizar la conección con la bd
 * ---------------------------------------------------------------------
 */

mongodb.connection(URI)
