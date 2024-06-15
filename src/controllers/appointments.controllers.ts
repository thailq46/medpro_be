import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {APPOINTMENTS_MESSAGE} from '~/constants/messages'
import {
  CreateAppointmentsReqBody,
  DeleteAppointmentReqParams,
  GetAppointmentByDoctorIdReqParams,
  GetAppointmentByPatientIdReqParams,
  QueryAppointment,
  QueryAppointmentByDoctorId,
  UpdateAppointment
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

export const updateStatusAppointmentsController = async (req: Request<UpdateAppointment>, res: Response) => {
  const {id} = req.params
  await appointmentService.updateStatusAppointment(id)
  return res.json({message: APPOINTMENTS_MESSAGE.UPDATE_STATUS_SUCCESS})
}

export const getFullAppointmentsController = async (
  req: Request<ParamsDictionary, any, any, QueryAppointment>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {appointments, totalItems} = await appointmentService.getFullAppointments({limit, page})
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

export const getAppointmentByPatientIdController = async (
  req: Request<GetAppointmentByPatientIdReqParams>,
  res: Response
) => {
  const {patient_id} = req.params
  const result = await appointmentService.getAppointmentByPatientId(patient_id)
  return res.json({message: APPOINTMENTS_MESSAGE.GET_SUCCESS, data: result})
}
