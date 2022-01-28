// @ts-check
import { uploadTemp } from 'utils/upload.helper'
import multer from 'multer'
/**
 *
 * @param {import('express').Request} req
 * @param {import('../types').CustomResponse} res
 * @param {import('express').NextFunction} next
 */
function isSingleFileValid (req, res, next) {
  const upload = uploadTemp.single('avatar')

  upload(req, res, err => {
    // errores de multer
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.failValidationError(`La imagen ingresada en el campo ${err.field} excede el tamaño permitido de 2mb`)
      }
    }
    // errores personalizados
    if (err) {
      return res.failValidationError(err.message)
    }

    next()
  })
}

export { isSingleFileValid }
