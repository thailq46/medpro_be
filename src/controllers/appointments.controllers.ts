import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {APPOINTMENTS_MESSAGE} from '~/constants/messages'
import {
  CreateAppointmentsReqBody,
  DeleteAppointmentReqParams,
  GetAppointmentByDoctorIdReqParams,
  QueryAppointmentByDoctorId
} from '~/models/request/Appointment.request'
import appointmentService from '~/services/appointment.service'
import {responseMessage} from '~/utils/common'

export const createAppointmentsController = async (
  req: Request<ParamsDictionary, any, CreateAppointmentsReqBody>,
  res: Response
) => {
  await appointmentService.createAppointment(req.body)
  return res.json({message: APPOINTMENTS_MESSAGE.CREATE_SUCCESS})
}

export const deleteAppointmentsController = async (req: Request<DeleteAppointmentReqParams>, res: Response) => {
  const {id} = req.params
  await appointmentService.deleteAppointment(id)
  return res.json({message: APPOINTMENTS_MESSAGE.DELETE_SUCCESS})
}

export const getFullAppointmentsController = async (req: Request, res: Response) => {
  const result = await appointmentService.getFullAppointments()
  return res.json({
    message: APPOINTMENTS_MESSAGE.GET_SUCCESS,
    data: result
  })
}

export const getAppointmentByDoctorIdController = async (
  req: Request<GetAppointmentByDoctorIdReqParams, any, any, QueryAppointmentByDoctorId>,
  res: Response
) => {
  console.log(req.query)
  const {doctor_id} = req.params
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {search, date} = req.query
  const {appointments, totalItems} = await appointmentService.getAppointmentByDoctorId({
    doctor_id,
    limit,
    page,
    search,
    date
  })
  return res.json(
    responseMessage({
      message: APPOINTMENTS_MESSAGE.GET_SUCCESS,
      data: appointments,
      meta: {
        total_page: Math.ceil(totalItems / limit),
        limit,
        current_page: page,
        total_items: totalItems
      }
    })
  )
}
