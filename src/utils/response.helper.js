// @ts-check
/**
 * @fileoverview response.helper.js, agregamos metodos de respuesta personalizadas al parámetro "res" de express
 * @version     1.0
 * @author      David Sandoval <ing.david1993@gmail.com>
 *
 * History
 * v1.0     -   creación del archivo
 */

const responseCode = {
  SUCCESS: 200,
  CREATED: 201,
  DELETED: 200,
  UPDATED: 200,
  NO_CONTENT: 204,
  INVALID_REQUEST: 400,
  UNSUPPORTED_RESPONSE_TYPE: 400,
  INVALID_SCOPE: 400,
  INVALID_GRANT: 400,
  INVALID_CREDENTIALS: 400,
  INVALID_REFRESH: 400,
  NO_DATA: 400,
  INVALID_DATA: 400,
  ACCESS_DENIED: 401,
  UNAUTHORIZED: 401,
  INVALID_CLIENTE: 401,
  FORBIDDEN: 403,
  RESOURCE_NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  RESOURCE_EXISTS: 409,
  CONFLICT: 409,
  RESOURCE_GONE: 410,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
  UNSUPPORTED_GRANT_TYPE: 501,
  NOT_IMPLEMENTED: 501,
  TEMPORARILY_UNAVAILABLE: 503
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('../types').CustomResponse} res
 * @param {import('express').NextFunction} next
 */
const responseHelper = (req, res, next = null) => {
  res.respond = ({ data = null, status = 200, message = '' }) => {
    const body = { code: status }

    if (message) body.message = message
    if (data) body.data = data

    return res.status(status).json(body)
  }

  res.fail = ({ description = 'Error', status = 400, errors = null }) => {
    const bodyError = { code: status }

    if (description) bodyError.description = description
    if (errors) bodyError.errors = errors

    return res.status(status).json(bodyError)
  }

  res.respondCreated = ({ data = null, message = '' }) => {
    return res.respond({ data, status: responseCode.CREATED, message })
  }

  res.respondDeleted = ({ data = null, message = '' }) => {
    return res.respond({ data, status: responseCode.DELETED, message })
  }

  res.respondUpdated = ({ data = null, message = '' }) => {
    return res.respond({ data, status: responseCode.UPDATED, message })
  }

  res.respondNoContent = () => {
    return res.respond({ data: null, status: responseCode.NO_CONTENT })
  }

  res.failUnauthorized = ({ description = 'Unauthorized' }) => {
    return res.fail({ description, status: responseCode.UNAUTHORIZED })
  }

  res.failForbidden = ({ description = 'Forbidden' }) => {
    return res.fail({ description, status: responseCode.FORBIDDEN })
  }

  res.failNotFound = ({ description = 'Not Found', errors = [] }) => {
    return res.fail({
      description,
      status: responseCode.RESOURCE_NOT_FOUND,
      errors
    })
  }

  res.failValidationError = ({ description = 'Bad Request', errors = [] }) => {
    return res.fail({ description, status: responseCode.INVALID_DATA, errors })
  }

  res.failServerError = ({ description = 'Internal Server Error', errors }) => {
    return res.fail({ description, status: responseCode.SERVER_ERROR, errors })
  }

  if (next !== null) {
    next()
  }
}

export { responseHelper, responseCode }
