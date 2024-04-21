import {Request} from 'express'
import path from 'path'
import sharp from 'sharp'
import {UPLOAD_IMAGE_DIR} from '~/constants/dir'
import {getNameFromFullname, handleUploadImage} from '~/utils/file'
import fs from 'fs'
import {envConfig} from '~/constants/config'
import {Media, MediaType} from '~/constants/enum'

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        await sharp(file.filepath).jpeg().toFile(newPath)
        fs.unlinkSync(file.filepath)
        return {
          url: `http://localhost:${envConfig.port}/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }
}

const mediasService = new MediasService()
export default mediasService
