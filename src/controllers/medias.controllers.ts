import {Request, Response} from 'express'
import path from 'path'
import {UPLOAD_IMAGE_DIR} from '~/constants/dir'
import {MEDIAS_MESSAGE, USERS_MESSAGE} from '~/constants/messages'
import mediasService from '~/services/medias.service'

export const uploadImageController = async (req: Request, res: Response) => {
  const result = await mediasService.uploadImageGoogleDriver(req)
  return res.json({
    message: MEDIAS_MESSAGE.UPLOAD_SUCCESS,
    data: result
  })
}
export const serveImageController = async (req: Request, res: Response) => {
  const {name} = req.params
  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
    if (err) {
      return res.status((err as any).status).json({
        message: USERS_MESSAGE.IMAGE_NOT_FOUND
      })
    }
  })
}
