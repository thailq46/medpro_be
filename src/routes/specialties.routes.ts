import {Router} from 'express'
import {
  createSpecialtiesController,
  deleteSpecialtiesController,
  getFullSpecialtiesController,
  getSpecialtiesByIdController,
  updateSpecialtiesController
} from '~/controllers/specialties.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {filterMiddleware, isUserLoggedInValidator} from '~/middlewares/common.middlewares'
import {
  checkParamsSpecialtyID,
  createSpecialtiesValidator,
  updateSpecialtiesValidator
} from '~/middlewares/specialties.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
import {UpdateSpecialtiesReqBody} from '~/models/request/Specialty.request'
import {wrapRequestHandler} from '~/utils/handlers'

const specialtiesRouter = Router()

/**
 * Desscription: Create new specialties
 * Path: /specialties/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { SpecialtiesSchema }
 */
specialtiesRouter.post(
  '/create',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  createSpecialtiesValidator,
  wrapRequestHandler(createSpecialtiesController)
)

/**
 * Desscription: Update specialties
 * Path: /specialties/update/:id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { SpecialtiesSchema }
 * Params: { id: string }
 */
specialtiesRouter.patch(
  '/update/:id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  checkParamsSpecialtyID,
  updateSpecialtiesValidator,
  filterMiddleware<UpdateSpecialtiesReqBody>(['description', 'hostipal_id', 'name', 'slug']),
  wrapRequestHandler(updateSpecialtiesController)
)

/**
 * Desscription: Delete specialties by id
 * Path: /specialties/delete/:id
 * Method: DELETE
 * Params: { id: string }
 */
specialtiesRouter.delete('/delete/:id', checkParamsSpecialtyID, wrapRequestHandler(deleteSpecialtiesController))

/**
 * Desscription: Get specialties by id
 * Path: /specialties/:id
 * Method: GET
 * Params: { id: string }
 */
specialtiesRouter.get('/:id', checkParamsSpecialtyID, wrapRequestHandler(getSpecialtiesByIdController))

/**
 * Desscription: Get full specialties
 * Path: /specialties
 * Method: GET
 */
specialtiesRouter.get('/', wrapRequestHandler(getFullSpecialtiesController))
export default specialtiesRouter
