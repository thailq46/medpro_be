import {Request} from 'express'
import path from 'path'
import sharp from 'sharp'
import {UPLOAD_IMAGE_DIR} from '~/constants/dir'
import {getNameFromFullname, handleUploadImage} from '~/utils/file'
import {envConfig} from '~/constants/config'
import {Media, MediaType} from '~/constants/enum'
import {google} from 'googleapis'
import fs from 'fs-extra'

const oauth2Client = new google.auth.OAuth2(
  envConfig.ggdriver_client_id,
  envConfig.ggdriver_client_secret,
  envConfig.ggdriver_redirec_uri
)
oauth2Client.setCredentials({refresh_token: envConfig.ggdriver_refresh_token})

const driver = google.drive({
  version: 'v3',
  auth: oauth2Client
})
class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        /** newPath
         * D:\NodeJS\Medpro_BE\uploads\images\017b0a957a387adf5ecfa6200.jpg
         */
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        await sharp(file.filepath).jpeg().toFile(newPath)

        fs.remove(file.filepath)
          .then(() => {
            console.log('success!')
            return
          })
          .catch((err) => {
            console.error(err)
          })

        return {
          url: `http://localhost:${envConfig.port}/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }
  // async uploadImageFirebase(req: Request) {
  //   const storageFB = getStorage()
  //   const files = await handleUploadImage(req)
  //   const result: Media[] = await Promise.all(
  //     files.map(async (file) => {
  //       const newName = getNameFromFullname(file.newFilename)
  //       const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
  //       // const fileBuffer = await sharp(file.filepath).jpeg().toBuffer()
  //       const storageRef = ref(storageFB, newName)
  //       const metadata: UploadMetadata = {
  //         contentType: file.mimetype as string
  //       }
  //       await sharp(file.filepath).jpeg().toFile(newPath)
  //       const fileBuffer = fs.readFileSync(file.filepath)
  //       const snapshot = await uploadBytesResumable(storageRef, fileBuffer, metadata)
  //       const downloadURL = await getDownloadURL(snapshot.ref)
  //       fs.unlinkSync(file.filepath)
  //       return {
  //         url: downloadURL,
  //         type: MediaType.Image
  //       }
  //     })
  //   )
  //   return result
  // }

  async uploadImageGoogleDriver(req: Request) {
    const files = await handleUploadImage(req)
    console.log('files', files)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        const [_, mimeType] = await Promise.all([
          await sharp(file.filepath).jpeg().toFile(newPath),
          (await sharp(newPath).jpeg().metadata()).format
        ])
        const createFile = await driver.files.create({
          requestBody: {
            name: newName,
            mimeType: 'image/jpg'
          },
          media: {
            mimeType: 'image/jpg',
            body: fs.createReadStream(newPath)
          }
        })
        const fileId = createFile.data.id as string
        await driver.permissions.create({
          fileId,
          requestBody: {
            role: 'reader',
            type: 'anyone'
          }
        })
        console.log(createFile.data)
        const getURL = await driver.files.get({
          fileId,
          fields: 'webViewLink, webContentLink'
        })
        // fs.unlinkSync(file.filepath)
        return {
          url: getURL.data.webViewLink as string,
          type: MediaType.Image
        }
      })
    )
    return result
  }

  async deleteImageGoogleDriver(fileId: string) {
    const deleteFile = await driver.files.delete({
      fileId
    })
    return deleteFile.data
  }
}

const mediasService = new MediasService()
export default mediasService
