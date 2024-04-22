import {Router} from 'express'
import {createHospitalController} from '~/controllers/hospitals.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {isUserLoggedInValidator} from '~/middlewares/common.middlewares'
import {createHospitalValidator} from '~/middlewares/hospitals.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
import {wrapRequestHandler} from '~/utils/handlers'

const hospitalsRoutes = Router()

/**
 * Desscription: Create hospitals
 * Path: /hospitals/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { HospitalsSchema }
 */
hospitalsRoutes.post(
  '/create',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  createHospitalValidator,
  wrapRequestHandler(createHospitalController)
)

export default hospitalsRoutes
