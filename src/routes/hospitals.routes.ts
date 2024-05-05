import {Router} from 'express'
import {
  createHospitalController,
  deleteHospitalController,
  getFullHospitalsController,
  getHospitalsByIdController,
  updateHospitalController
} from '~/controllers/hospitals.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {filterMiddleware, isUserLoggedInValidator, paginationValidator} from '~/middlewares/common.middlewares'
import {
  createHospitalValidator,
  checkParamsHospitalValidator,
  updateHospitalValidator
} from '~/middlewares/hospitals.middlewares'
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
  checkParamsHospitalValidator,
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
    'types',
    'booking_forms'
  ]),
  wrapRequestHandler(updateHospitalController)
)

/**
 * Desscription: Delete hospitals
 * Path: /hospitals/delete/:id
 * Method: DELET
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 */
hospitalsRoutes.delete(
  '/delete/:id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  checkParamsHospitalValidator,
  wrapRequestHandler(deleteHospitalController)
)

/**
 * Desscription: Get hospitals by id
 * Path: /hospitals/:id
 * Method: GET
 * Params: { id: string }
 */
hospitalsRoutes.get('/:id', checkParamsHospitalValidator, wrapRequestHandler(getHospitalsByIdController))

/**
 * Desscription: Get full list hospitals
 * Path: /hospitals
 * Method: GET
 * Query: { limit: number, page: number }
 */
hospitalsRoutes.get('/', paginationValidator, wrapRequestHandler(getFullHospitalsController))

export default hospitalsRoutes
