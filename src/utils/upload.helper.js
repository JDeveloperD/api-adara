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

const fsPromises = fs.promises

const DIR_API = path.dirname(require.main.filename)
const DIR_UPLOAD_TEMP = path.join(DIR_API, 'temp')
const DIR_UPLOAD = './public/uploads'
const DIR_USER_AVATAR = DIR_UPLOAD + '/avatars/'
const URLS = {
  AVATARS: '/uploads/avatars/'
}

function fileStoreEngine () {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR_UPLOAD_TEMP)
    },
    filename: async (req, file, cb) => {
      const nameFile = getFileName(file)
      cb(null, nameFile)
    }
  })
}

function getFileName (file) {
  const key = uuidV4()
  return `${file.fieldname}-${key}`
}

function fileStorageMemory () {
  return multer.memoryStorage()
}

/* const uploadTemp = multer({
  storage: fileStoreEngine(),
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: (req, file, cb) => {
    const regex = /jpg|jpeg|png|webp/
    if (isSupportedFile(regex, file)) {
      cb(null, true)
    } else {
      cb(new Error('No es una imagen permitida'))
    }
  }
}) */

const uploadTemp = multer({ storage: fileStorageMemory() })
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

export {
  DIR_API,
  DIR_UPLOAD_TEMP,
  DIR_UPLOAD,
  fsPromises,
  uploadTemp,
  isSupportedFile,
  getFileName,
  DIR_USER_AVATAR,
  URLS
}
