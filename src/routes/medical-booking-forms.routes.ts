import {Router} from 'express'
import {createMedicalBookingFormsController} from '~/controllers/medical-booking-forms.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {isUserLoggedInValidator} from '~/middlewares/common.middlewares'
import {createMedicalBookingFormsValidator} from '~/middlewares/medical-booking-forms.middlewares'
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
  createMedicalBookingFormsValidator,
  wrapRequestHandler(createMedicalBookingFormsController)
)
export default medicalBookingFormsRouter
