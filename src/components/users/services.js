import sharp from 'sharp'
import { DIR_USER_AVATAR, URLS, getFileName } from 'utils/upload.helper'

/**
 * @param {*} fileAvatar
 * @returns avoid
 */
async function createFileAvatar (fileAvatar) {
  const { buffer } = fileAvatar
  const fileName = getFileName(fileAvatar)
  const ref = `${fileName}.webp`

  const image = sharp(buffer, { failOnError: true })
  const metadata = await image.metadata()

  if (metadata.format !== 'jpg' || metadata.format !== 'png' || metadata.format !== 'jpeg' || metadata.format !== 'webp') {
    throw new Error('El formato es incorrecto, por favor ingrese una imagen .jpg|.jpeg|.png|.webp')
  }
  console.log(metadata)
  // sharp(buffer)
  //   .webp({ quality: 20 })
  //   .toFile(DIR_USER_AVATAR + ref)
  /*     .then(info => {
      console.log(info)
    })
    .catch((err) => {
      console.log('sharp error', err)
    }) */

  return URLS.AVATARS + ref
}

export { createFileAvatar }
