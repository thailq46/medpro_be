import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {APPOINTMENTS_MESSAGE} from '~/constants/messages'
import {CreateAppointmentsReqBody} from '~/models/request/Appointment.request'

export const createAppointmentsController = async (
  req: Request<ParamsDictionary, any, CreateAppointmentsReqBody>,
  res: Response
) => {
  // await appointmentService.createAppointment(req.body)
  return res.json({message: APPOINTMENTS_MESSAGE.CREATE_SUCCESS})
}
