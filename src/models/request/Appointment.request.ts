import {ParamsDictionary, Query} from 'express-serve-static-core'
import {Pagination} from '~/models/request/Common.request'

export interface CreateAppointmentsReqBody {
  doctor_id: string | null
  patient_id: string
  service_id: string
  order_id: string | null
  address: string
  date: string
  time: string
  date_of_birth: string
  email: string
  fullname: string
  gender: number
  phone_number: string
  price: number
  reason: string
  status: boolean
  isPayment: boolean
}
export interface UpdateOrderIdAppointmentsReqBody {
  order_id: string
}
export interface DeleteAppointmentReqParams extends ParamsDictionary {
  id: string
}
export interface UpdateAppointment extends ParamsDictionary {
  id: string
}
export interface UpdateAppointmentByOrderId extends ParamsDictionary {
  order_id: string
}
export interface GetAppointmentByDoctorIdReqParams extends ParamsDictionary {
  doctor_id: string
}
export interface GetAppointmentByPatientIdReqParams extends ParamsDictionary {
  patient_id: string
}
export interface QueryAppointment extends Pagination, Query {}
export interface QueryAppointmentByDoctorId extends Pagination, Query {
  search?: string
  date?: string
}
