import {ParamsDictionary, Query} from 'express-serve-static-core'
import {Pagination} from '~/models/request/Common.request'

export interface CreateAppointmentsReqBody {
  doctor_id: string
  patient_id: string
  service_id: string
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
export interface DeleteAppointmentReqParams extends ParamsDictionary {
  id: string
}
export interface GetAppointmentByDoctorIdReqParams extends ParamsDictionary {
  doctor_id: string
}
export interface QueryAppointmentByDoctorId extends Pagination, Query {
  search?: string
  date?: string
}
