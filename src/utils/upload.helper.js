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

const DIR_API = path.dirname(require.main.filename)
const DIR_UPLOAD_TEMP = path.join(DIR_API, 'temp')
const fsPromises = fs.promises

export {
  DIR_API,
  DIR_UPLOAD_TEMP,
  fsPromises
}
