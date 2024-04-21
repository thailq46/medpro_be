import path from 'path'
import fs from 'fs'
import {Request} from 'express'
import formidable, {File} from 'formidable'
import {UPLOAD_IMAGE_TEMP_DIR} from '~/constants/dir'

const MAX_FILES_IMAGE = 4
const MAX_FILE_SIZE_IMAGE = 3000 * 1024
const MAX_TOTAL_FILE_SIZE_IMAGE = MAX_FILE_SIZE_IMAGE * MAX_FILES_IMAGE

export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true})
    }
  })
}

export const getNameFromFullname = (fullname: string) => {
  // fullname: 98c5a6201de4a947269734501.png
  const ext = path.extname(fullname) // .png
  return path.basename(fullname, ext) // 98c5a6201de4a947269734501
}

export const handleUploadImage = (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    keepExtensions: true,
    maxFiles: MAX_FILES_IMAGE,
    filter: ({name, originalFilename, mimetype}) => {
      const valid = ['image', 'avatar', 'cover_photo'].includes(name as string) && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        return reject(new Error('Image is empty') as any)
      }
      resolve(files.image as File[])
    })
  })
}
