import {Router} from 'express'
import {
  createAppointmentsController,
  deleteAppointmentsController,
  getAppointmentByDoctorIdController,
  getFullAppointmentsController
} from '~/controllers/appointments.controllers'
import {
  checkParamsAppointmentByDoctorId,
  checkParamsAppointmentId,
  createAppointmentsValidator
} from '~/middlewares/appointments.middlewares'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {paginationValidator} from '~/middlewares/common.middlewares'
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
 * Path: /appointments/delete/:id
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
/**
 * Desscription: Get all appointments of a doctor
 * Path: /appointments/doctor/:doctor_id
 * Method: GET
 * Params: { doctor_id: string }
 */
appointmentsRouter.get(
  '/doctor/:doctor_id',
  paginationValidator,
  checkParamsAppointmentByDoctorId,
  wrapRequestHandler(getAppointmentByDoctorIdController)
)

/**
 * Desscription: Get all appointments
 * Path: /appointments
 * Method: GET
 */
appointmentsRouter.get('/', paginationValidator, wrapRequestHandler(getFullAppointmentsController))
export default appointmentsRouter
