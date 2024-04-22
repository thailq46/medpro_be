import {Router} from 'express'
import {
  createHospitalController,
  getFullHospitalsController,
  updateHospitalController
} from '~/controllers/hospitals.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {filterMiddleware, isUserLoggedInValidator} from '~/middlewares/common.middlewares'
import {createHospitalValidator, updateHospitalValidator} from '~/middlewares/hospitals.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
import {UpdateHospitalsReqBody} from '~/models/request/Hospital.request'
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

/**
 * Desscription: Update hospitals
 * Path: /hospitals/update/:id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 * Body: { HospitalsSchema }
 */
hospitalsRoutes.patch(
  '/update/:id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  updateHospitalValidator,
  filterMiddleware<UpdateHospitalsReqBody>([
    'avatar',
    'address',
    'banner',
    'categoryId',
    'description',
    'end_time',
    'hotline',
    'images',
    'name',
    'session',
    'slug',
    'start_time',
    'types'
  ]),
  wrapRequestHandler(updateHospitalController)
)

/**
 * Desscription: Get full list hospitals
 * Path: /hospitals
 * Method: GET
 */
hospitalsRoutes.get('/', wrapRequestHandler(getFullHospitalsController))

export default hospitalsRoutes
