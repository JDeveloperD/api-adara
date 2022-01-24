// @ts-check
import config from 'config'
import createError from 'http-errors'

const ENVIRONMENT = config.util.getEnv('NODE_ENV')

/**
 * Error Handler 404
 * @param {import('express').Request} _req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 */
function error404 (_req, _res, next) {
  next(createError(404, 'La ruta no existe'))
}

/**
 * Error Handler App
 * @param {import('../types').HttpErrors} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 */
function generalErrorHandler (err, req, res, _next) {
  res.locals.message = err.message
  res.locals.error = ENVIRONMENT === 'development' ? err : {}

  res.status(err.status || 500)
  res.json({ code: err.status, message: err.message })
}

export {
  error404,
  generalErrorHandler
}
