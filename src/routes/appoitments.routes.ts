import {Router} from 'express'
import {createAppointmentsController} from '~/controllers/appointments.controllers'
import {createAppointmentsValidator} from '~/middlewares/appointments.middlewares'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'

const appointmentsRouter = Router()

appointmentsRouter.post(
  '/create',
  accessTokenValidator,
  verifiedUserValidator,
  createAppointmentsValidator,
  createAppointmentsController
)

export default appointmentsRouter
