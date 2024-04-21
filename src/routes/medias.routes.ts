import {Router} from 'express'
import {uploadImageController} from '~/controllers/medias.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {wrapRequestHandler} from '~/utils/handlers'

const mediasRoutes = Router()

mediasRoutes.post('/upload-image', accessTokenValidator, wrapRequestHandler(uploadImageController))

export default mediasRoutes
