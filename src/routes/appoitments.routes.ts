import {Router} from 'express'
import {
  createAppointmentsController,
  deleteAppointmentsController,
  getFullAppointmentsController
} from '~/controllers/appointments.controllers'
import {checkParamsAppointmentId, createAppointmentsValidator} from '~/middlewares/appointments.middlewares'
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

/**
 * Desscription: Delete an appointment
 * Path: /appointments/delete/id
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 */
appointmentsRouter.delete(
  '/delete/:id',
  accessTokenValidator,
  verifiedUserValidator,
  checkParamsAppointmentId,
  wrapRequestHandler(deleteAppointmentsController)
)

appointmentsRouter.get('/', wrapRequestHandler(getFullAppointmentsController))
export default appointmentsRouter
