import {Request, Response} from 'express'
import {MEDIAS_MESSAGE} from '~/constants/messages'
import mediasService from '~/services/medias.service'

export const uploadImageController = async (req: Request, res: Response) => {
  const result = await mediasService.uploadImage(req)
  return res.json({
    message: MEDIAS_MESSAGE.UPLOAD_SUCCESS,
    data: result
  })
}
