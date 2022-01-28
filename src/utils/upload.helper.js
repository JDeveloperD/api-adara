// @ts-check
/**
 * @fileoverview upload.helper.js, helpers para la carga de archivos
 * @version     1.0
 * @author      David Sandoval <ing.david1993@gmail.com>
 *
 * History
 * v1.0     -   creación del archivo
 */

import fs from 'fs'
import path from 'path'
import multer from 'multer'
import { v4 as uuidV4 } from 'uuid'

const DIR_API = path.dirname(require.main.filename)
const DIR_UPLOAD_TEMP = path.join(DIR_API, 'temp')
const fsPromises = fs.promises

function fileStoreEngine () {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR_UPLOAD_TEMP)
    },
    filename: async (req, file, cb) => {
      const key = uuidV4()
      const nameFile = `${file.fieldname}-${key}${path.extname(file.originalname)}`
      cb(null, nameFile)
    }
  })
}

const uploadTemp = multer({
  storage: fileStoreEngine(),
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: (req, file, cb) => {
    const regex = /jpg|jpeg|png/
    if (isSupportedFile(regex, file)) {
      cb(null, true)
    } else {
      cb(new Error('No es una imagen permitida'))
    }
  }
})

/**
 * Función para validar la si un archivo es compatible de acuerdo al regex que se mande
 * @param {RegExp} regex
 * @param {*} file
 * @returns Boolean
 */
function isSupportedFile (regex, file) {
  const { mimetype } = file

  return regex.test(mimetype)
}

export { DIR_API, DIR_UPLOAD_TEMP, fsPromises, uploadTemp, isSupportedFile }
