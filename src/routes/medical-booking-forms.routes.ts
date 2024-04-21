import {Router} from 'express'
import {
  createMedicalBookingFormsController,
  updateMedicalBookingFormsController
} from '~/controllers/medical-booking-forms.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {filterMiddleware, isUserLoggedInValidator} from '~/middlewares/common.middlewares'
import {
  createMedicalBookingFormsValidator,
  updateMedicalBookingFormsValidator
} from '~/middlewares/medical-booking-forms.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
import {UpdateMedicalBookingFormsReqBody} from '~/models/request/MedicalBookingForms.request'
import {wrapRequestHandler} from '~/utils/handlers'

const medicalBookingFormsRouter = Router()

/**
 * Desscription: Create new medical booking forms
 * Path: /medical-booking-forms/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { name: string, image: string }
 */
medicalBookingFormsRouter.post(
  '/create',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  createMedicalBookingFormsValidator,
  wrapRequestHandler(createMedicalBookingFormsController)
)

/**
 * Desscription: Update medical booking forms
 * Path: /medical-booking-forms/update/:id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { name: string, image: string }
 */
medicalBookingFormsRouter.patch(
  '/update/:id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  updateMedicalBookingFormsValidator,
  filterMiddleware<UpdateMedicalBookingFormsReqBody>(['name', 'image']),
  wrapRequestHandler(updateMedicalBookingFormsController)
)
export default medicalBookingFormsRouter
