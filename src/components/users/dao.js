// @ts-check
import { UserModel, encryptPassword } from './model'
import { single } from './dto'

/**
 * Obtener la lista de todos los usuarios
 * @param {number} limit
 * @param {number} page
 *
 * @returns {Promise<object> | Promise<any>}
 */
async function findAllUsers(limit, page) {
  const options = {
    page: page || 1,
    limit: limit || 10,
    sort: { createdAt: 'desc' }
  }

  return await UserModel.paginate({ isDeleted: false }, options)
}

/**
 * Obtener un usuario por su ID
 * @param {any} id
 *
 * @returns {Promise<import('./types').User>}
 */
async function findUserById(id) {
  const user = await UserModel.findOne({ _id: id, isDeleted: false })

  if (!user) {
    return null
  }

  return single(user)
}

/**
 * Crear un nuevo usuario
 * @param {import('./types').User} user
 *
 * @return {Promise<import('./types').User>}
 */
async function createUser(user) {
  let { nikname, email, password, avatar, profile } = user

  password = await encryptPassword(password)

  const newUser = new UserModel({
    nikname,
    email,
    password,
    avatar,
    profile
  })

  const userSaved = await newUser.save()

  return single(userSaved)
}

/**
 * Actualizar el usuario
 * @param {any} id
 * @param {import('./types').User} user
 *
 * @returns {Promise<import('./types').User>}
 */
async function updateUser(id, user) {
  const { nikname, password, avatar } = user

  const userUpdated = await UserModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      nikname,
      password: await encryptPassword(password),
      avatar
    },
    {
      new: true,
      runValidation: true
    }
  )

  console.log(userUpdated)

  if (!userUpdated) {
    return null
  }

  return single(userUpdated)
}

/**
 * Eliminar un usuario en mongoose
 * @param {any} id
 *
 * @returns {Promise<boolean>}
 */
async function removeUser(id) {
  const result = await UserModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    {
      rawResult: true // Return the raw result from the MongoDB driver
    }
  )

  return result.lastErrorObject.updatedExisting
}

/**
 * Verificar si existe un email registrado
 * @param {string} email
 *
 * @return {Promise<boolean>}
 */
async function emailExists(email) {
  return await UserModel.exists({ email })
}

export {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  removeUser,
  emailExists
}
