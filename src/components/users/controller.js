// @ts-check
import * as UserDao from './dao'
import {
  validateUserCreate,
  validateUserUpdate,
  validateId
} from './validations'

/**
 * Obtener todos los usuarios
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function index(req, res) {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)

  const users = await UserDao.findAllUsers(limit, page)

  return res.respond({ data: users })
}

/**
 * Obtenre usuario por Id
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function getById(req, res) {
  const { id } = req.params

  if (!validateId(id)) {
    return res.failNotFound({ errors: 'El id no es válido' })
  }

  const user = await UserDao.findUserById(id)

  if (!user) {
    return res.failNotFound({ errors: 'No se encontró al usuario' })
  }

  return res.respond({ data: user })
}

/**
 * Crear usuario
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function create(req, res) {
  /** @type {import('./types').User} */
  const data = req.body

  const errors = await validateUserCreate(data)

  if (errors.length > 0) {
    return res.failValidationError({ errors })
  }

  const userCreated = await UserDao.createUser(data)

  return res.respondCreated({ data: userCreated })
}

/**
 * Actualizar usuario
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function update(req, res) {
  const { id } = req.params

  /** @type {import('./types').User} */
  const data = req.body

  if (!validateId(id)) {
    return res.failNotFound({ errors: 'El id no es válido' })
  }

  const errors = validateUserUpdate(data)

  if (errors.length > 0) {
    return res.failValidationError({ errors })
  }

  const userUpdated = await UserDao.updateUser(id, data)

  if (!userUpdated) {
    return res.failNotFound({ errors: 'No se encontró al usuario' })
  }

  return res.respondUpdated({ data: userUpdated })
}

/**
 * Eliminar usuario
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function remove(req, res) {
  const { id } = req.params

  if (!validateId(id)) {
    return res.failNotFound({ errors: 'El id no es válido' })
  }

  const userDeleted = await UserDao.removeUser(id)

  if (!userDeleted) {
    return res.failNotFound({ errors: 'Usuario no encontrado' })
  }

  return res.respondDeleted({ message: 'Se eliminó el usuario' })
}

/**
 * Buscar usuario
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function search(req, res) {
  return res.respond({ data: [] })
}

/**
 * Ordenar usuarios usuario por
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function sortBy(req, res) {
  return res.respond({ data: [] })
}

export { index, getById, create, update, remove, search, sortBy }
