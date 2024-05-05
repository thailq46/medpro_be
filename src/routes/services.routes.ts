import {Router} from 'express'
import {
  createServicesController,
  deleteServicesController,
  getFullServicesController,
  getServicesByIdController,
  updateServicesController
} from '~/controllers/services.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {filterMiddleware, isUserLoggedInValidator, paginationValidator} from '~/middlewares/common.middlewares'
import {
  checkParamsServiceID,
  createServicesValidator,
  updateServicesValidator
} from '~/middlewares/services.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
import {UpdateServicesReqBody} from '~/models/request/Service.request'
import {wrapRequestHandler} from '~/utils/handlers'

const servicesRoutes = Router()

/**
 * Desscription: Create new services
 * Path: /services/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { ServicesSchema }
 */
servicesRoutes.post(
  '/create',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  createServicesValidator,
  wrapRequestHandler(createServicesController)
)

/**
 * Desscription: Update services by id
 * Path: /services/update/:id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { ServicesSchema }
 * Params: { id: string }
 */
servicesRoutes.patch(
  '/update/:id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  checkParamsServiceID,
  updateServicesValidator,
  filterMiddleware<UpdateServicesReqBody>([
    'description',
    'hospital_id',
    'name',
    'note',
    'price',
    'session',
    'specialty_id'
  ]),
  wrapRequestHandler(updateServicesController)
)

/**
 * Desscription: Delete services by id
 * Path: /services/delete/:id
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 */
servicesRoutes.delete(
  '/delete/:id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  checkParamsServiceID,
  wrapRequestHandler(deleteServicesController)
)

/**
 * Desscription: Get services by id
 * Path: /services/:id
 * Method: GET
 * Params: { id: string }
 */
servicesRoutes.get('/:id', checkParamsServiceID, wrapRequestHandler(getServicesByIdController))

/**
 * Desscription: Get full services
 * Path: /services
 * Method: GET
 */
servicesRoutes.get('/', paginationValidator, wrapRequestHandler(getFullServicesController))

export default servicesRoutes
