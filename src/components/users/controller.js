// @ts-check
import * as UserDao from './dao'
import { multiple, single } from './dto'
import { createFileAvatar } from './services'
import { validateUserCreate, validateUserUpdate, validateId } from './validations'

/**
 * Obtener todos los usuarios
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function index (req, res) {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)

  const users = await UserDao.findAllUsers(limit, page)
  const data = multiple(users, 'super-admin')

  return res.respond({ data })
}

/**
 * Obtenre usuario por Id
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function getById (req, res) {
  const { id } = req.params

  if (!validateId(id)) {
    return res.failNotFound('El id no es válido')
  }

  const user = await UserDao.findUserById(id)

  if (!user) {
    return res.failNotFound('No se encontró al usuario')
  }

  const data = single(user, 'admin')

  return res.respond({ data })
}

/**
 * Crear usuario
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function create (req, res) {
  /** @type {import('./types').User} */
  const userData = req.body
  const avatar = req.file

  const errors = await validateUserCreate(userData)

  if (errors.length > 0) {
    return res.failValidationError(errors)
  }

  if (avatar) {
    try {
      userData.avatar = await createFileAvatar(avatar)
    } catch (error) {
      console.log('error handler on controller', error)
    }
  }

  return res.respondCreated({ data: userData })

/*   const userCreated = await UserDao.createUser(userData)

  const data = single(userCreated, 'admin')

  return res.respondCreated({ data }) */
}

/**
 * Actualizar usuario
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function update (req, res) {
  const { id } = req.params

  /** @type {import('./types').User} */
  const updatedData = req.body

  if (!validateId(id)) {
    return res.failNotFound('El id no es válido')
  }

  const errors = validateUserUpdate(updatedData)

  if (errors.length > 0) {
    return res.failValidationError(errors)
  }

  const userUpdated = await UserDao.updateUser(id, updatedData)

  if (!userUpdated) {
    return res.failNotFound('No se encontró al usuario')
  }

  const data = single(userUpdated, 'admin')

  return res.respondUpdated({ data })
}

/**
 * Eliminar usuario
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function remove (req, res) {
  const { id } = req.params

  if (!validateId(id)) {
    return res.failNotFound('El id no es válido')
  }

  const userDeleted = await UserDao.removeUser(id)

  if (!userDeleted) {
    return res.failNotFound('Usuario no encontrado')
  }

  return res.respondDeleted({ message: 'Se eliminó el usuario' })
}

/**
 * Buscar usuario
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function search (req, res) {
  return res.respond({ data: [] })
}

/**
 * Ordenar usuarios usuario por
 * @param {import('express').Request} req
 * @param {import('./types').CustomResponse} res
 */
async function sortBy (req, res) {
  return res.respond({ data: [] })
}

export { index, getById, create, update, remove, search, sortBy }
