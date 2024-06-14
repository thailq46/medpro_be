import {Router} from 'express'
import {createAppointmentsController, getFullAppointmentsController} from '~/controllers/appointments.controllers'
import {createAppointmentsValidator} from '~/middlewares/appointments.middlewares'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
import {wrapRequestHandler} from '~/utils/handlers'

const appointmentsRouter = Router()

/**
 * Desscription: Create an appointment
 * Path: /appointments/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { AppointmentSchema }
 */
appointmentsRouter.post(
  '/create',
  accessTokenValidator,
  verifiedUserValidator,
  createAppointmentsValidator,
  wrapRequestHandler(createAppointmentsController)
)

appointmentsRouter.get('/', wrapRequestHandler(getFullAppointmentsController))
export default appointmentsRouter
