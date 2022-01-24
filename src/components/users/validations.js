// @ts-check
import * as UserDao from './dao'
import { Types } from 'mongoose'
import { PROFILES } from './model'

/**
 * Validar la creación del usuario
 * @param {import('./types').User} user
 *
 * @returns {Promise<Array<string>>}
 */
async function validateUserCreate(user) {
  const { email, password, profile } = user
  const errors = []

  const errorEmail = await validateEmail(email)
  const errorPassword = validatePassword(password)
  const errorProfile = validateProfile(profile)

  if (errorEmail) errors.push(errorEmail)
  if (errorPassword) errors.push(errorPassword)
  if (errorProfile) errors.push(errorProfile)

  return errors
}

/**
 * Validar la actualización del usuario
 * @param {import('./types').User} user
 *
 * @return {Array<string>}
 */
function validateUserUpdate(user) {
  const errors = []

  const errorPassword = validatePassword(user.password)

  if (errorPassword) errors.push(errorPassword)
  if (user.email) errors.push('El email no se puede ser actualizado')

  return errors
}

/**
 * Validar un Email
 * @param {string} email
 *
 * @return {Promise<string>}
 */
async function validateEmail(email) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email) {
    return 'El email es requerido'
  }

  if (!regexEmail.test(email)) {
    return 'No es un formato de email válido'
  }

  if (await UserDao.emailExists(email)) {
    return 'El email ya se encuentra registrado'
  }

  return null
}

/**
 * Validar una contraseña
 * @param {string} password
 *
 * @return {string}
 */
function validatePassword(password) {
  if (!password) {
    return 'La contraseña es requerida'
  }

  if (password.length < 8) {
    return 'La contraseña debe ser mayor o igual a 8 caracteres'
  }

  return null
}

/**
 * Validar si es usuario es de tipo ObjectId Mongoose
 * @param {string} id
 *
 * @return {boolean}
 */
function validateId(id) {
  return Types.ObjectId.isValid(id)
}

/**
 * Validar que el usuario ingresado es válido
 * @param {string} profile
 *
 * @return {string| null}
 */
function validateProfile(profile) {
  if (profile && !PROFILES.includes(profile)) {
    return 'El perfil para el usuario es incorrecto'
  }

  return null
}

export {
  validateUserCreate,
  validateUserUpdate,
  validateEmail,
  validatePassword,
  validateId,
  validateProfile
}
